from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse

router = APIRouter(
    prefix="/pronunciation",
    tags=["Pronunciation"]
)


@router.get("/health")
async def pronunciation_health():
    """
    Health check endpoint for pronunciation service.
    """
    return {
        "status": "success",
        "message": "Pronunciation route working"
    }


@router.post("/evaluate-pronunciation")
async def evaluate_pronunciation(audio: UploadFile = File(...)):
    """
    Dummy pronunciation evaluation endpoint.

    This endpoint currently:
    - accepts an audio file
    - validates the file type
    - returns a placeholder response

    Future pipeline:
    upload -> preprocess -> MFCC -> DTW -> scoring -> GPT feedback
    """

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
        file_info = {
            "filename": audio.filename,
            "content_type": audio.content_type
        }

        return JSONResponse(
            status_code=200,
            content={
                "status": "success",
                "message": "Pronunciation endpoint ready",
                "file": file_info,
                "next_step": "Audio preprocessing pipeline will be integrated here"
            }
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Server error: {str(e)}"
        )
