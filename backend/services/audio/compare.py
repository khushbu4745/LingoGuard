import numpy as np
from librosa.sequence import dtw

from services.audio.mfcc import extract_mfcc


def compare_pronunciation(
    reference_audio_path: str,
    user_audio_path: str
):
    """
    Compare pronunciation using DTW on MFCC features.
    """

    # Extract MFCC features
    ref_result = extract_mfcc(reference_audio_path)
    user_result = extract_mfcc(user_audio_path)

    ref_mfcc = ref_result["mfcc"]
    user_mfcc = user_result["mfcc"]

    # DTW comparison
    distance_matrix, _ = dtw(
        X=ref_mfcc,
        Y=user_mfcc,
        metric="euclidean"
    )

    # Final DTW distance
    distance_score = float(distance_matrix[-1, -1])

    return {
        "distance_score": round(distance_score, 2),
        "reference_shape": ref_mfcc.shape,
        "user_shape": user_mfcc.shape
    }