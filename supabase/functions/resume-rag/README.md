# Resume RAG Edge Function

A Supabase Edge Function that implements a Retrieval-Augmented Generation (RAG) pipeline for querying resume information using ChromaDB as the vector database.

## Features

- **Vector Search**: Uses ChromaDB to perform semantic search on resume content
- **RAG Pipeline**: Retrieves relevant context and generates answers using Google Gemini 2.5 Flash
- **CORS Support**: Handles cross-origin requests for frontend integration
- **Fallback Mechanism**: Returns context-based responses even without Gemini API key

## Prerequisites

1. **ChromaDB Instance**: You need a running ChromaDB instance
   - Local: Run `docker run -p 8000:8000 chromadb/chroma`
   - Cloud: Use a hosted ChromaDB service

2. **Resume Data**: The vector database should be populated with resume embeddings in a collection named `resume_embeddings`

3. **Environment Variables**:
   - `CHROMA_DB_URL`: URL of your ChromaDB instance (default: http://localhost:8000)
   - `GEMINI_API_KEY`: Optional - for LLM-based answer generation with Google Gemini 2.5 Flash

## API Usage

### Endpoint

```
POST https://your-project.supabase.co/functions/v1/resume-rag
```

### Request Body

```json
{
  "query": "What are the candidate's main skills?",
  "n_results": 5
}
```

### Parameters

- `query` (required): The question or search query about the resume
- `n_results` (optional): Number of similar documents to retrieve (default: 5)

### Response

```json
{
  "success": true,
  "results": [
    {
      "id": "chunk_1",
      "content": "Experienced full-stack developer with expertise in React, TypeScript, and Node.js...",
      "metadata": {
        "section": "skills",
        "type": "technical"
      },
      "similarity": 0.85
    }
  ],
  "answer": "The candidate's main skills include full-stack development with React, TypeScript, and Node.js..."
}
```

## Local Development

### Setup

1. Install Supabase CLI:
```bash
brew install supabase/tap/supabase
```

2. Initialize Supabase (if not already done):
```bash
supabase init
```

3. Start local Supabase:
```bash
supabase start
```

4. Set up environment variables:
```bash
cp supabase/functions/.env.example supabase/functions/.env
# Edit .env with your actual values
```

### Running Locally

Serve the function locally:
```bash
supabase functions serve resume-rag --env-file supabase/functions/.env
```

Test the function:
```bash
curl -i --location --request POST 'http://localhost:54321/functions/v1/resume-rag' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"query":"What are the main skills?"}'
```

## Deployment

Deploy to Supabase:

```bash
# Set environment secrets
supabase secrets set CHROMA_DB_URL=your-chromadb-url
supabase secrets set GEMINI_API_KEY=your-gemini-api-key

# Deploy the function
supabase functions deploy resume-rag
```

## ChromaDB Collection Schema

The function expects a ChromaDB collection named `resume_embeddings` with the following structure:

- **Documents**: Text chunks from the resume
- **Metadata**: Optional metadata (sections, categories, etc.)
- **Embeddings**: Vector embeddings of the text chunks

## Example Frontend Integration

```typescript
const queryResume = async (question: string) => {
  const response = await fetch(
    'https://your-project.supabase.co/functions/v1/resume-rag',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        query: question,
        n_results: 5,
      }),
    }
  );

  const data = await response.json();
  return data;
};
```

## Error Handling

The function returns appropriate error messages for:
- Missing or invalid query parameter
- ChromaDB connection issues
- Collection not found (database not populated)
- Google Gemini API errors (falls back to context-only responses)

## Performance Considerations

- **Vector Search**: ChromaDB uses HNSW algorithm for fast approximate nearest neighbor search
- **Response Time**: Typically 200-500ms depending on collection size and network latency
- **Rate Limiting**: Consider implementing rate limiting for production use

## Security

- Edge function uses CORS headers to allow cross-origin requests
- API keys should be stored as Supabase secrets, not in code
- Consider implementing authentication for production endpoints

## Troubleshooting

### Collection Not Found Error
Ensure your ChromaDB instance has a collection named `resume_embeddings` populated with data.

### Connection Timeout
Check that your CHROMA_DB_URL is accessible from the Supabase Edge Function runtime.

### Empty Results
Verify that embeddings are properly generated and stored in ChromaDB.
