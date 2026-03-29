const supabaseService = require("../services/supabaseService");
const geminiService = require("../services/geminiService");
const emailService = require("../services/emailService");

exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, product, feedback } = req.body;

    // 1. Validate input data
    if (!name || !email || !product || !feedback) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Email basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address format" });
    }

    // 2. Analyze sentiment using Gemini API
    const sentiment = await geminiService.analyzeSentiment(feedback);

    // 3. Store data in Supabase
    const savedFeedback = await supabaseService.saveFeedback({
      name,
      email,
      product,
      feedback,
      sentiment
    });

    if (!savedFeedback) {
        throw new Error("Failed to save feedback to database");
    }

    // 4. Automatically send a personalized email response using Brevo
    await emailService.sendFeedbackEmail({
      name,
      email,
      product,
      feedback,
      sentiment
    });

    res.status(201).json({
      message: "Feedback submitted successfully!",
      sentiment: sentiment,
      data: savedFeedback
    });

  } catch (error) {
    console.error("Error in submitFeedback controller:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};
