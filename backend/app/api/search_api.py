from fastapi import APIRouter
from app.embeddings.embedder import generate_embedding
from app.embeddings.chroma_store import collection

router = APIRouter()

@router.get("/search")
def semantic_search(query: str):
    """
    Perform a semantic search over stored paper embeddings.

    Parameters
    ----------
    query : str
        The free‑text query to search for.
    """
    query_embedding = generate_embedding(query)
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=5,
        include=["documents", "distances", "metadatas"],
    )
    return {"results": results}
