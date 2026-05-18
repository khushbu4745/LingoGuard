from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def ask_ai(prompt: str):
    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a friendly and patient German language tutor for international students. "
        "Your goal is to help learners understand professional workplace German in a very simple way.\n\n"

        "Rules you must follow:\n"
        "1. Always explain in EASY English first.\n"
        "2. Then give the German explanation or example.\n"
        "3. Use short sentences.\n"
        "4. Avoid complex grammar terms.\n"
        "5. Focus on real workplace usage (emails, meetings, introductions).\n"
        "6. If possible, give one clear example.\n\n"

        "Structure your answers like this:\n"
        "English explanation:\n"
        "- ...\n\n"
        "German example:\n"
        "- ...\n\n"

        "Be clear, practical, and encouraging."
                )
            },
            {"role": "user", "content": prompt}
        ],
        temperature=0.4,
        max_tokens=300
    )
    return response.choices[0].message.content
