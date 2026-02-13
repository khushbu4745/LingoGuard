"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getNextSection } from "@/lib/sections";

type PhraseItem = {
  id: string;
  text: string;        // German phrase
  en?: string;         // English translation
  image_tag?: string;
  register?: string;
};

export default function PhraseSection({
  title,
  items,
  moduleId,
  sectionType,
}: {
  title: string;
  items: PhraseItem[];
  moduleId: string;
  sectionType: string;
}) {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const item = items[index];

  // Detect if showing register badges makes sense
  const hasMultipleRegisters = items.some(
    (i) => i.register !== items[0]?.register
  );

  function handleNext() {
    // Case 1: still phrases left → next phrase
    if (index < items.length - 1) {
      setIndex(index + 1);
      return;
    }

    // Case 2: last phrase → jump to next section
    const nextSection = getNextSection(sectionType);
    if (nextSection) {
      router.push(`/module/${moduleId}?section=${nextSection}`);
    }
  }

  function handlePrevious() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  function saveProgress(itemId: string) {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/progress/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "user_123",
        module_id: moduleId,
        item_id: itemId,
        action: "completed",
      }),
    });
  }

  return (
    <section className="max-w-3xl">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      {/* Phrase card */}
      <div className="border rounded-lg p-6 mb-6">
        <p className="text-sm text-gray-500 mb-1">Phrase (German)</p>
        <p className="text-2xl font-medium mb-4">{item.text}</p>

        {/* English translation */}
        {item.en && (
          <>
            <p className="text-sm text-gray-500 mb-1">English</p>
            <p className="text-lg text-gray-800 italic">{item.en}</p>
          </>
        )}

        {/* Register badge (only if meaningful) */}
        {hasMultipleRegisters && item.register && (
          <span className="inline-block mt-4 text-xs bg-gray-200 px-2 py-1 rounded">
            {item.register}
          </span>
        )}
      </div>

      {/* Image */}
      {item.image_tag && (
        <div className="mb-6 flex justify-center">
          <img
            src={`/images/phrases/${item.image_tag}.png`}
            alt={item.text}
            className="max-h-56 object-contain"
          />
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={index === 0}
          className="px-4 py-2 rounded border disabled:opacity-40"
        >
          ← Previous
        </button>

        <span className="text-sm text-gray-500">
          {index + 1} / {items.length}
        </span>

        <button
          onClick={() => {
            saveProgress(item.id);
            handleNext();
          }}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          {index === items.length - 1 ? "Next Section →" : "Next →"}
        </button>
      </div>
    </section>
  );
}
