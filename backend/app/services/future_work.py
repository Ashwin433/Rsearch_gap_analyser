from langchain_ollama import ChatOllama

llm = ChatOllama(
    model="qwen3:8b"
)

def extract_future_work(text: str) -> str:
    """Extract Future Work, Limitations, and Open Challenges from full paper text.

    Args:
        text (str): The full paper text or subset.

    Returns:
        str: The LLM-extracted future work analysis.
    """
    prompt = f"""
    Extract:

    1. Future Work
    2. Limitations
    3. Open Challenges

    Paper:
    {text}
    """
    response = llm.invoke(prompt)
    result = response if isinstance(response, str) else getattr(response, "content", str(response))
    return str(result)
