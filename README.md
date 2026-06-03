# Research Gap Analyzer

A dual-agent RAG system designed to ingest, process, and map academic literature to discover open research questions, structural blindspots, and methodology gaps in scientific domains.

## Project Structure

```text
research-gap-analyzer/
│
├── backend/
│   ├── app/
│   │   ├── api/          # FastAPI routers and endpoints
│   │   ├── services/     # Core logic, literature parsing, clustering
│   │   ├── models/       # Pydantic schemas and database models
│   │   ├── database/     # Database client configs (ChromaDB / PostgreSQL)
│   │   ├── rag/          # Retrival-Augmented Generation query pipelines
│   │   ├── scraping/     # arXiv, Semantic Scholar, and web scrapers
│   │   ├── embeddings/   # Dense/Sparse vector embeddings generator
│   │   └── main.py       # FastAPI application entrypoint
│   │
│   ├── requirements.txt  # Python package dependencies
│   └── .env              # Server and LLM configurations
│
├── frontend/
│   ├── src/              # React components and custom styling
│   │   ├── main.jsx      # React entrypoint
│   │   ├── App.jsx       # Interactive dashboard UI
│   │   └── index.css     # Premium Vanilla CSS design system
│   ├── index.html        # Main HTML file
│   └── package.json      # Node.js dependencies and run scripts
│
└── README.md             # Project documentation (this file)
```

## Getting Started

### Backend Setup

1. **Navigate to backend:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the FastAPI server:**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

### Frontend Setup

1. **Navigate to frontend:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## Architecture Design

### 1. Ingestion & Scraping
The `scraping/` module connects to academic APIs (arXiv, PubMed, Semantic Scholar) using asynchronous HTTP requests. It extracts title, abstracts, author details, references, and full text (where available).

### 2. Embeddings & Clustering
The `embeddings/` module encodes paper abstracts and metadata using state-of-the-art sentence transformers. Clusters are generated using HDBSCAN or KMeans, grouping similar publications. 

### 3. Gap Identification (RAG)
By identifying clusters with low citation density, high discrepancy in methodology, or explicitly stated limitations, the `rag/` module prompts a Large Language Model (e.g., Gemini, GPT-4) with literature contexts to identify specific research directions.