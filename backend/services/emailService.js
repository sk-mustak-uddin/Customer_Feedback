const axios = require("axios");

const brevoApiKey = process.env.BREVO_API_KEY;
const senderEmail = process.env.SENDER_EMAIL || "noreply@feedbacksystem.com";
const senderName = process.env.SENDER_NAME || "Customer Support";

exports.sendFeedbackEmail = async ({ name, email, product, feedback, sentiment }) => {
    if (!brevoApiKey) {
        console.warn("Brevo API key not found. Skipping email sending. Simulated email sent below:");
        console.log(`To: ${email}, Subject: Feedback on ${product}, Sentiment: ${sentiment}`);
        return false;
    }

    let subject = "";
    let htmlContent = "";

    // Template Logic based on sentiment
    if (sentiment === "Positive") {
        subject = `Thank you for your feedback on ${product}!`;
        htmlContent = `<p>Hi ${name},</p>
                       <p>Thank you for your valuable feedback! We're glad you enjoyed our service for <strong>${product}</strong>.</p>
                       <p>Your feedback:<br/><em>"${feedback}"</em></p>
                       <p>Best regards,<br/>The Team</p>`;
    } else if (sentiment === "Negative") {
        subject = `We're sorry about your experience with ${product}`;
        htmlContent = `<p>Hi ${name},</p>
                       <p>We sincerely apologize for your experience. Your feedback is important, and we will work to improve <strong>${product}</strong>.</p>
                       <p>If you need further assistance, please reply to this email, and our team will get in touch to make things right.</p>
                       <p>Your feedback:<br/><em>"${feedback}"</em></p>
                       <p>Best regards,<br/>The Customer Support Team</p>`;
    } else {
        // Neutral
        subject = `We received your feedback on ${product}`;
        htmlContent = `<p>Hi ${name},</p>
                       <p>Thank you for sharing your thoughts. We appreciate your feedback on <strong>${product}</strong>.</p>
                       <p>Your feedback:<br/><em>"${feedback}"</em></p>
                       <p>Best regards,<br/>The Team</p>`;
    }

    try {
        const response = await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            {
                sender: { name: senderName, email: senderEmail },
                to: [{ email: email, name: name }],
                subject: subject,
                htmlContent: htmlContent
            },
            {
                headers: {
                    'accept': 'application/json',
                    'api-key': brevoApiKey,
                    'content-type': 'application/json'
                }
            }
        );

        console.log(`Email successfully sent to ${email} (MessageId: ${response.data.messageId})`);
        return true;
    } catch (error) {
        console.error("Error sending email via Brevo:", error.response?.data || error.message);
        return false; // Fail gracefully instead of crashing
    }
};
