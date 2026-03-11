import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChromaClient } from "chromadb";
import {resume} from "./resume.js";

// -----------------------------
// CONFIG
// -----------------------------

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chroma = new ChromaClient({
  ssl: true,
  host: "api.trychroma.com",
  headers: {
    "Authorization": `Bearer ${process.env.CHROMA_API_KEY}`,
    "X-Chroma-Token": process.env.CHROMA_API_KEY
  },
  tenant: process.env.CHROMA_TENANT,
  database: process.env.CHROMA_DATABASE
});

// -----------------------------
// RESUME TEXT
// -----------------------------

const resumeText = resume;
// -----------------------------
// SIMPLE CHUNKING FUNCTION
// -----------------------------

function chunkText(text, chunkSize = 500) {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    chunks.push(text.slice(start, start + chunkSize));
    start += chunkSize;
  }

  return chunks;
}

// -----------------------------
// GENERATE EMBEDDING
// -----------------------------

async function getEmbedding(text) {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: {
        parts: [{
          text: text
        }]
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Embedding API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.embedding.values;
}

// -----------------------------
// MAIN INGESTION FUNCTION
// -----------------------------

async function ingestResume() {
  try {

    const chunks = chunkText(resumeText);

    console.log(`Total chunks: ${chunks.length}`);

    const collection = await chroma.getOrCreateCollection({
      name: "portfolio",
      embeddingFunction: null
    });

    const embeddings = [];

    for (const chunk of chunks) {
      const embedding = await getEmbedding(chunk);
      embeddings.push(embedding);
    }

    const ids = chunks.map((_, i) => `resume_chunk_${i}`);

    await collection.add({
      ids: ids,
      documents: chunks,
      embeddings: embeddings
    });

    console.log("Resume successfully stored in ChromaDB!");

  } catch (error) {
    console.error(error);
  }
}

ingestResume();