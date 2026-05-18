import os
from uuid import uuid4
from services.audio.preprocess import preprocess_audio
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse


router = APIRouter(
    prefix="/pronunciation",
    tags=["Pronunciation"]
)

# Upload directory
UPLOAD_DIR = "uploads"

# Create uploads folder if it doesn't exist
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.get("/health")
async def pronunciation_health():
    return {
        "status": "success",
        "message": "Pronunciation route working"
    }


@router.post("/evaluate-pronunciation")
async def evaluate_pronunciation(audio: UploadFile = File(...)):

    allowed_types = [
        "audio/wav",
        "audio/x-wav",
        "audio/mpeg",
        "audio/mp3",
        "audio/webm",
        "audio/ogg"
    ]

    if audio.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Unsupported audio format"
        )

    try:
        # Generate unique filename
        file_extension = audio.filename.split(".")[-1]
        unique_filename = f"{uuid4()}.{file_extension}"

        file_path = os.path.join(UPLOAD_DIR, unique_filename)

        # Save uploaded audio
        with open(file_path, "wb") as buffer:
            buffer.write(await audio.read())

        return JSONResponse(
            status_code=200,
            content={
                "status": "success",
                "message": "Audio uploaded successfully",
                "filename": unique_filename,
                "saved_path": file_path
            }
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Server error: {str(e)}"
        )
