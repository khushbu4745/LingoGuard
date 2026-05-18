def generate_pronunciation_feedback(score: float, level: str):
    """
    Generate user-friendly pronunciation feedback.
    """

    if level == "Excellent":
        feedback = (
            "Excellent pronunciation. "
            "Your speech closely matches the reference audio."
        )

    elif level == "Good":
        feedback = (
            "Good pronunciation overall. "
            "Try improving clarity and consistency."
        )

    elif level == "Fair":
        feedback = (
            "Fair attempt. "
            "Focus on speaking more clearly and steadily."
        )

    else:
        feedback = (
            "Pronunciation needs improvement. "
            "Try slowing down and emphasizing syllable clarity."
        )

    return {
        "feedback": feedback
    }