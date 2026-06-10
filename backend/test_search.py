from app.embeddings.embedder import generate_embedding
from app.embeddings.chroma_store import collection

query = "Deep Learning in Healthcare"

embedding = generate_embedding(query)

results = collection.query(
    query_embeddings=[embedding],
    n_results=5
)

print(results)
