import chromadb

# Initialize a persistent ChromaDB client. The "path" determines where the vector store is saved on disk.
client = chromadb.PersistentClient(path="./chroma_db")

# Retrieve an existing collection named "research_papers" or create it if it doesn't exist.
collection = client.get_or_create_collection(name="research_papers")

# The `collection` object can now be used to add, query, and manage embeddings.
# Example usage (outside of this module):
#   from app.embeddings.embedder import generate_embedding
#   vec = generate_embedding("some text")
#   collection.add(ids=["doc1"], documents=["some text"], embeddings=[vec])
