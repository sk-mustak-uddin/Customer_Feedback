const { GoogleGenAI } = require("@google/genai");

let ai = null;
if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

exports.analyzeSentiment = async (feedbackText) => {
  if (!ai) {
    console.warn("Gemini API client not initialized. Check your GEMINI_API_KEY.");
    return "Neutral"; // Fallback safe response
  }

  try {
    const prompt = `Classify the sentiment of this feedback as Positive, Neutral, or Negative. Only return one word (Positive, Neutral, or Negative).\n\nFeedback: "${feedbackText}"`;
    
    // We use gemini-2.5-flash as the default lightweight model
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    let sentiment = response.text.trim();
    
    // Clean up output just in case it added punctuation
    sentiment = sentiment.replace(/[^a-zA-Z]/g, '');

    const validSentiments = ["Positive", "Neutral", "Negative"];
    if (validSentiments.includes(sentiment)) {
        return sentiment;
    }
    
    return "Neutral"; // Fallback default
  } catch (error) {
    console.error("Error analyzing sentiment with Gemini:", error);
    return "Neutral"; // Fallback safely
  }
};
