# Supabase Edge Functions Setup Guide

This guide will help you set up and run the Supabase Edge Functions for your portfolio project.

## Installation

### 1. Install Supabase CLI

**macOS:**
```bash
brew install supabase/tap/supabase
```

**Other platforms:**
Visit [Supabase CLI docs](https://supabase.com/docs/guides/cli)

### 2. Login to Supabase

```bash
supabase login
```

### 3. Link to Your Project

```bash
supabase link --project-ref kodnlecgztfqhkflwcfx
```

## Setting Up ChromaDB

### Option 1: Local Development with Docker

Run ChromaDB locally:
```bash
docker run -p 8000:8000 chromadb/chroma
```

### Option 2: Cloud ChromaDB

Use a hosted ChromaDB service and update the `CHROMA_DB_URL` accordingly.

## Environment Configuration

1. Copy the example environment file:
```bash
cp supabase/functions/.env.example supabase/functions/.env
```

2. Update the values in `supabase/functions/.env`:
```env
CHROMA_DB_URL=http://localhost:8000
GEMINI_API_KEY=your-actual-gemini-api-key
SUPABASE_URL=https://kodnlecgztfqhkflwcfx.supabase.co
SUPABASE_ANON_KEY=your-actual-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key
```

## Running Locally

### Start Supabase Local Development

```bash
supabase start
```

This will start:
- Local database
- API server
- Studio dashboard (http://localhost:54323)
- Edge Functions runtime

### Serve the Resume RAG Function

```bash
supabase functions serve resume-rag --env-file supabase/functions/.env --no-verify-jwt
```

The function will be available at:
```
http://localhost:54321/functions/v1/resume-rag
```

### Test the Function

```bash
curl -i --location --request POST 'http://localhost:54321/functions/v1/resume-rag' \
  --header 'Content-Type: application/json' \
  --data '{
    "query": "What programming languages does the candidate know?",
    "n_results": 5
  }'
```

## Deploying to Production

### 1. Set Environment Secrets

```bash
supabase secrets set CHROMA_DB_URL=your-production-chromadb-url
supabase secrets set GEMINI_API_KEY=your-gemini-api-key
```

### 2. Deploy the Function

```bash
supabase functions deploy resume-rag
```

### 3. Test Production Endpoint

```bash
curl -i --location --request POST 'https://kodnlecgztfqhkflwcfx.supabase.co/functions/v1/resume-rag' \
  --header 'Authorization: Bearer YOUR_SUPABASE_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "query": "What is the candidate'\''s experience?",
    "n_results": 5
  }'
```

## Monitoring and Logs

### View Function Logs (Local)

Logs will appear in the terminal where you ran `supabase functions serve`.

### View Function Logs (Production)

```bash
supabase functions logs resume-rag
```

Or view them in the Supabase Dashboard:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to Edge Functions
4. Click on "resume-rag"
5. View the Logs tab

## Populating the Vector Database

Note: This setup only includes the query backend. To populate ChromaDB with your resume data, you'll need to:

1. Create a separate script to:
   - Parse your resume (PDF, JSON, or other format)
   - Chunk the content into meaningful segments
   - Generate embeddings (using Google Gemini, OpenAI, Cohere, or other embedding models)
   - Store in ChromaDB collection named `resume_embeddings`

2. Example embedding generation (to be implemented separately):
   - Use Google's `text-embedding-004` model
   - Use OpenAI's `text-embedding-3-small` or `text-embedding-ada-002`
   - Or use open-source models like Sentence Transformers

## Troubleshooting

### ChromaDB Connection Issues

- Ensure ChromaDB is running and accessible at the configured URL
- Check firewall/network settings if using remote ChromaDB
- Verify the collection name matches exactly: `resume_embeddings`

### CORS Errors

The edge function includes CORS headers. If you still face issues:
- Verify the request includes proper headers
- Check browser console for specific CORS errors

### Import Errors

If you see npm package import errors:
- Deno automatically handles npm: imports
- Ensure you have internet connection for first-time package downloads

### Function Timeout

- Default timeout is 60 seconds
- For large queries, consider optimizing the number of results
- Check ChromaDB performance and indexing

## Next Steps

1. **Create a data ingestion script** to populate ChromaDB with your resume
2. **Integrate with frontend**: Add API calls from your React components
3. **Add authentication**: Implement row-level security if needed
4. **Monitor usage**: Set up alerts for function invocations and errors
5. **Optimize**: Fine-tune embedding models and chunk sizes for better results

## Resources

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [ChromaDB Documentation](https://docs.trychroma.com/)
- [Deno Deploy](https://deno.com/deploy/docs)
