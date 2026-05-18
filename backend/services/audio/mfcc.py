import librosa
import numpy as np


def extract_mfcc(audio_path: str, n_mfcc: int = 13):
    """
    Extract MFCC features from audio.

    Parameters:
    - audio_path: path to audio file
    - n_mfcc: number of MFCC coefficients

    Returns:
    - MFCC matrix
    - shape metadata
    """

    # Load audio
    audio, sr = librosa.load(audio_path, sr=16000)

    # Extract MFCC features
    mfcc = librosa.feature.mfcc(
        y=audio,
        sr=sr,
        n_mfcc=n_mfcc
    )

    return {
        "mfcc": mfcc,
        "shape": mfcc.shape,
        "sample_rate": sr
    }