from app.embeddings.embedder import generate_embedding
from app.embeddings.chroma_store import collection


def recommend_papers(query: str):
    """Recommend similar papers based on a free‑text query.

    Uses the embedding model to vectorize the query, then performs
    a nearest‑neighbour search in ChromaDB to find the top 10 matches.

    Args:
        query: The search string (e.g. a topic, abstract, or question).

    Returns:
        dict: ChromaDB query results containing ids, documents,
              metadatas, and distances.
    """
    embedding = generate_embedding(query)

    results = collection.query(
        query_embeddings=[embedding],
        n_results=10,
        include=["documents", "distances", "metadatas"],
    )

    return results
