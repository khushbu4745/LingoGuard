"use client";

import { useSearchParams, useParams } from "next/navigation";
import { useState } from "react";

export default function AIHelpPanel() {
  const searchParams = useSearchParams();
  const params = useParams();

  const moduleId = params?.moduleId as string;
  const section = searchParams.get("section") || "overview";

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function askAI() {
    if (!question.trim()) return;

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ai/help`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question,
            lesson_id: moduleId,
            context: `Module: ${moduleId}, Section: ${section}`,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setError("AI service is unavailable. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside className="w-[320px] border-l bg-gray-50 p-4 flex flex-col">
      <h3 className="font-semibold text-lg mb-2">AI Help</h3>

      <p className="text-sm text-gray-600 mb-3">
        Need help with this section?
      </p>
{/* 
      <div className="text-xs text-gray-500 mb-3">
        <div>
          <strong>Module:</strong> {moduleId}
        </div>
        <div>
          <strong>Section:</strong> {section}
        </div>
      </div> */}

      <textarea
        className="border rounded p-2 text-sm mb-2 resize-none"
        rows={4}
        placeholder="Ask a question about this lesson..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={askAI}
        disabled={loading}
        className="bg-blue-600 text-white rounded px-3 py-2 text-sm disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      <div className="mt-4 flex-1 overflow-auto">
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {answer && (
          <div className="text-sm bg-white border rounded p-3 whitespace-pre-wrap">
            {answer}
          </div>
        )}
      </div>
    </aside>
  );
}
