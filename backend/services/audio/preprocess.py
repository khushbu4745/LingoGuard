import librosa
import soundfile as sf
import numpy as np


TARGET_SAMPLE_RATE = 16000


def preprocess_audio(input_path: str, output_path: str):
    """
    Preprocess audio for pronunciation evaluation.

    Steps:
    - Load audio
    - Convert to mono
    - Resample to 16kHz
    - Trim silence
    - Normalize amplitude
    - Save cleaned audio
    """

    # Load audio
    audio, sr = librosa.load(
        input_path,
        sr=TARGET_SAMPLE_RATE,
        mono=True
    )

    # Trim silence
    audio, _ = librosa.effects.trim(audio)

    # Normalize volume
    max_amplitude = np.max(np.abs(audio))

    if max_amplitude > 0:
        audio = audio / max_amplitude

    # Save cleaned audio
    sf.write(output_path, audio, TARGET_SAMPLE_RATE)

    return {
        "status": "success",
        "sample_rate": TARGET_SAMPLE_RATE,
        "duration_seconds": round(len(audio) / TARGET_SAMPLE_RATE, 2),
        "output_path": output_path
    }
