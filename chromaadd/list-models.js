import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    const models = await genAI.listModels();
    console.log("Available models:");
    for (const model of models) {
      console.log(`- ${model.name}`);
      if (model.supportedGenerationMethods && model.supportedGenerationMethods.includes('embedContent')) {
        console.log("  ✓ Supports embedContent");
      }
    }
  } catch (error) {
    console.error("Error listing models:", error.message);
  }
}

listModels();
