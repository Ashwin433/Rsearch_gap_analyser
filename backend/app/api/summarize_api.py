from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.summarizer import generate_summary

router = APIRouter()

class SummarizeRequest(BaseModel):
    abstract: str

@router.post("/summarize")
def summarize(req: SummarizeRequest):
    """
    Return a 5‑bullet‑point summary of a research‑paper abstract.
    """
    try:
        summary = generate_summary(req.abstract)
        return {"summary": summary}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
