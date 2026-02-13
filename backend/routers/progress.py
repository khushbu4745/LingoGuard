import json
import threading
from datetime import datetime
from pathlib import Path
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parent.parent
PROGRESS_DIR = BASE_DIR / "data" / "progress"

# Single-process file lock (see limitations below)
file_lock = threading.Lock()


class ProgressUpdate(BaseModel):
    user_id: str
    module_id: str
    item_id: str
    action: str


def _empty_progress():
    return {
        "modules": {},
        "last_updated": None
    }


@router.get("/{user_id}/{module_id}")
def get_user_progress(user_id: str, module_id: str):
    file_path = PROGRESS_DIR / f"{user_id}.json"

    if not file_path.exists():
        return {
            "module_id": module_id,
            "completed_items": []
        }

    try:
        with file_path.open("r", encoding="utf-8") as f:
            data = json.load(f)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Corrupted progress file")

    module_data = data.get("modules", {}).get(module_id, [])

    return {
        "module_id": module_id,
        "completed_items": module_data
    }


@router.post("/save")
def save_progress(update: ProgressUpdate):
    file_path = PROGRESS_DIR / f"{update.user_id}.json"

    with file_lock:
        if file_path.exists():
            try:
                with file_path.open("r", encoding="utf-8") as f:
                    data = json.load(f)
            except json.JSONDecodeError:
                raise HTTPException(status_code=500, detail="Corrupted progress file")
        else:
            data = _empty_progress()

        modules = data.setdefault("modules", {})
        items = modules.setdefault(update.module_id, [])

        if update.item_id not in items:
            items.append(update.item_id)

        data["last_updated"] = datetime.utcnow().isoformat()

        try:
            with file_path.open("w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
        except IOError:
            raise HTTPException(status_code=500, detail="Failed to write progress")

    return {"status": "ok"}
