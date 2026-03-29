const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// Routes
const feedbackRoutes = require("./routes/feedback");
app.use("/api/feedback", feedbackRoutes);

app.get("/", (req, res) => {
  res.send("Customer Feedback Analysis API is running.");
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
