from fastapi import APIRouter
from pydantic import BaseModel
from services.openai_client import ask_ai

router = APIRouter(prefix="/ai", tags=["AI Help"])

class AIHelpRequest(BaseModel):
    question: str
    lesson_id: str | None = None
    context: str | None = None

@router.post("/help")
def get_ai_help(data: AIHelpRequest):
    prompt = f"""
Student question:
{data.question}

Lesson context:
{data.context or "General German learning"}
"""

    answer = ask_ai(prompt)
    return {"answer": answer}
