import { CohereClient } from "cohere-ai";

// Log the environment variable temporarily for debugging
console.log("API Key from process.env:", process.env.COHERE_API_KEY);

const cohereClient = new CohereClient({
  token: process.env.COHERE_API_KEY, // Ensure this matches the key in your .env.local
});

export async function generateAnswer(question) {
  if (!question || typeof question !== "string") {
    throw new Error("Invalid question. Please provide a non-empty string.");
  }

  try {
    const response = await cohereClient.generate({
      model: "command-xlarge-nightly",
      prompt: `Answer the question asked by the user in 2 sentences:\n${question}`,
      maxTokens: 1500,
      temperature: 0.7,
    });

    if (!response || !response.generations || response.generations.length === 0) {
      throw new Error("No response from Cohere API.");
    }
    return response.generations[0].text.trim();
  } catch (error) {
    console.error("Error calling Cohere API:", error.message || error);
    throw new Error("An error occurred while generating the answer.");
  }
}
