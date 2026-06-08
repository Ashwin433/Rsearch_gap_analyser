from langchain_ollama import ChatOllama

# Initialize the Ollama LLM (ensure Ollama server is running and model is available)
llm = ChatOllama(
    model="qwen3:8b"
)

def extract_future_work(text: str) -> str:
    """Extract future work, limitations, and research gaps from a paper abstract.

    Args:
        text: The abstract or any text to analyze.
    Returns:
        The LLM‑generated analysis as a string.
    """
    prompt = f"""
    Analyze this research paper abstract
    and identify possible future work,
    limitations and research gaps.

    Text:
    {text}
    """
    response = llm.invoke(prompt)
    # Ensure we always return a string (handle both plain and BaseMessage objects)
    result = response if isinstance(response, str) else getattr(response, "content", str(response))
    return str(result)
