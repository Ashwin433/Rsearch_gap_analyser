from langchain_ollama import ChatOllama

llm = ChatOllama(
    model="qwen3:8b"
)

def detect_research_gaps(texts):
    """
    Detect research gaps across a collection of paper abstracts.

    Args:
        texts (list[str]): List of abstract strings.
    Returns:
        str: LLM‑generated analysis containing common themes, unexplored areas, gaps, and opportunities.
    """
    combined_text = "\n\n".join(texts)

    prompt = f"""
    Analyze the following collection
    of research paper abstracts.

    Identify:

    1. Common themes
    2. Unexplored areas
    3. Research gaps
    4. Future opportunities

    Papers:

    {combined_text}
    """

    response = llm.invoke(prompt)
    return response.content
