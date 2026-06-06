from langchain_ollama import OllamaEmbeddings

# Initialize the embeddings model – ensure Ollama server is running and the model is available
embeddings_model = OllamaEmbeddings(model="nomic-embed-text")

def generate_embedding(text: str):
    """Return the embedding vector for a given text string.

    Args:
        text: The text to embed.
    Returns:
        A list (or numpy array) representing the embedding.
    """
    return embeddings_model.embed_query(text)
