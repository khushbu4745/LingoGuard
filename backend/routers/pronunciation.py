import os
from uuid import uuid4
from services.audio.preprocess import preprocess_audio
from services.audio.mfcc import extract_mfcc
from services.audio.compare import compare_pronunciation
from services.audio.scoring import calculate_pronunciation_score
from services.gpt_feedback import generate_pronunciation_feedback
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
async def evaluate_pronunciation(
    word: str,
    recording_no: int,
    audio: UploadFile = File(...)
):

    allowed_extensions = ["wav", "mp3", "webm", "ogg"]

    file_extension = audio.filename.split(".")[-1].lower()

    if file_extension not in allowed_extensions:
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

        # Preprocessed output file
        cleaned_filename = f"cleaned_{unique_filename}"
        cleaned_path = os.path.join(UPLOAD_DIR, cleaned_filename)

        # Run preprocessing
        preprocess_result = preprocess_audio(
            input_path=file_path,
            output_path=cleaned_path
        )

        # Extract MFCC features
        mfcc_result = extract_mfcc(cleaned_path)

        # Reference pronunciation file
        reference_audio_path = (
        f"reference_audio/{word}/recording{recording_no}.mp3")

        # Compare pronunciation
        comparison_result = compare_pronunciation(
            reference_audio_path=reference_audio_path,
            user_audio_path=cleaned_path
        )

        # Generate pronunciation score
        score_result = calculate_pronunciation_score(
            comparison_result["distance_score"]
        )
        # Generate feedback
        feedback_result = generate_pronunciation_feedback(
            score=score_result["score"],
            level=score_result["level"]
        )

        return JSONResponse(
            status_code=200,
            content={
                "status": "success",
                "message": "Audio processed successfully",

                "original_file": unique_filename,
                "cleaned_file": cleaned_filename,

                "preprocessing": preprocess_result,

                "mfcc": {
                    "shape": list(mfcc_result["shape"]),
                    "sample_rate": mfcc_result["sample_rate"]
                },
                "comparison": comparison_result,
                "pronunciation_score": score_result,
                "feedback": feedback_result
            }
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Server error: {str(e)}"
        )
