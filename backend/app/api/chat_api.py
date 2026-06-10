from fastapi import APIRouter
from app.rag.rag_pipeline import ask_question

router = APIRouter()

@router.get("/chat")
def chat(question: str):
    """
    Interact with the RAG chatbot by asking a question.
    """
    answer = ask_question(question)
    return {
        "answer": answer
    }
