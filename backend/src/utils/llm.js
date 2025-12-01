const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateHint({ assignment, userQuery }) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash", // or gemini-2.0-pro if available
  });

  const prompt = `
You are a SQL tutor. Provide a helpful hint for the student's SQL problem.
❗ DO NOT give the full SQL answer.
❗ DO NOT reveal exact query.
❗ Only give a conceptual hint.

Assignment: ${assignment.title}
User Query: ${userQuery || "No query yet"}
`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text(); // important: text() is a function
}

module.exports = { generateHint };
