def calculate_pronunciation_score(distance_score: float):
    """
    Convert DTW distance into
    human-readable pronunciation score.
    """

    # Normalize score
    normalized_score = max(0, 100 - (distance_score / 200))

    normalized_score = round(normalized_score, 2)

    # Performance level
    if normalized_score >= 85:
        level = "Excellent"

    elif normalized_score >= 70:
        level = "Good"

    elif normalized_score >= 50:
        level = "Fair"

    else:
        level = "Needs Improvement"

    return {
        "score": normalized_score,
        "level": level
    }