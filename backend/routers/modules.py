import json
from pathlib import Path
from fastapi import APIRouter, HTTPException

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parent.parent
MODULES_DIR = BASE_DIR / "data" / "modules"


@router.get("/{module_id}")
def get_module(module_id: str):
    file_path = MODULES_DIR / f"{module_id}.json"

    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Module not found")

    try:
        with file_path.open("r", encoding="utf-8") as f:
            return json.load(f)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid module JSON")
