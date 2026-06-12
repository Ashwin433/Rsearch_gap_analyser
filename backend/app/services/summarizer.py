from langchain_ollama import ChatOllama

# Initialize the Ollama LLM (ensure Ollama server is running and the model is available)
llm = ChatOllama(
    model="qwen3:8b"
)

def generate_summary(text: str) -> str:
    """Generate a concise 5‑bullet‑point summary of a research‑paper abstract.

    Args:
        text: The abstract text to be summarized.

    Returns:
        The LLM‑generated summary as a plain string.
    """
    prompt = f"""
    Summarize the following research paper abstract in 5 concise bullet points.

    Abstract:
    {text}
    """
    response = llm.invoke(prompt)
    # ``response`` is a LangChain ``BaseMessage``; we return the content string.
    # Ensure we always return a string
    result = response if isinstance(response, str) else getattr(response, "content", str(response))
    return str(result)


def summarize(text: str) -> str:
    """Summarize a full paper text into: Objective, Methodology, Results, and Contributions.

    Args:
        text (str): The full text of the paper.

    Returns:
        str: The LLM-generated structured summary.
    """
    prompt = f"""
    Summarize this paper in:
    
    1. Objective
    2. Methodology
    3. Results
    4. Contributions
    
    Paper:
    {text[:5000]}
    """
    response = llm.invoke(prompt)
    result = response if isinstance(response, str) else getattr(response, "content", str(response))
    return str(result)

