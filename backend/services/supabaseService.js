const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Throw error early if environment variables are missing but don't crash at startup if handled later
let supabase = null;
if (supabaseUrl && supabaseUrl.startsWith('http') && supabaseKey) {
   supabase = createClient(supabaseUrl, supabaseKey);
}

exports.saveFeedback = async (feedbackData) => {
  if (!supabase) {
      console.warn("Supabase client not initialized. Check your environment variables.");
      // Return mocked data to prevent entire failure during dev if keys are not set
      return { id: 999, ...feedbackData, created_at: new Date() }; 
  }

  const { data, error } = await supabase
    .from("feedbacks")
    .insert([
      {
        name: feedbackData.name,
        email: feedbackData.email,
        product: feedbackData.product,
        feedback: feedbackData.feedback,
        sentiment: feedbackData.sentiment
      }
    ])
    .select();

  if (error) {
    console.error("Supabase Error:", error);
    throw error;
  }

  return data[0];
};
