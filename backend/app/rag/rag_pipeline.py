from langchain_ollama import ChatOllama
from app.embeddings.embedder import generate_embedding
from app.embeddings.chroma_store import collection

llm = ChatOllama(
    model="qwen3:8b"
)


def ask_question(question: str) -> str:
    """Answer a question using retrieved research papers as context (RAG).

    1. Embeds the question.
    2. Retrieves the top‑5 most relevant abstracts from ChromaDB.
    3. Passes them as context to the LLM along with the question.

    Args:
        question: The user's natural‑language question.

    Returns:
        The LLM‑generated answer grounded in retrieved papers.
    """
    query_embedding = generate_embedding(question)

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=5,
    )

    docs = results["documents"]
    context = "\n".join(docs[0]) if docs else ""

    prompt = f"""
    Answer the question using only
    the provided research papers.

    Context:

    {context}

    Question:
    {question}
    """

    response = llm.invoke(prompt)

    result = response if isinstance(response, str) else getattr(response, "content", str(response))
    return str(result)
