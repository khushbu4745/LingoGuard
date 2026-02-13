"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getNextSection } from "@/lib/sections";


type VocabularyItem = {
  id: string;
  de: string;
  en: string;
  image_tag?: string;
};

export default function VocabularySection({
  title,
  items,
  moduleId,
  sectionType,
}: {
  title: string;
  items: VocabularyItem[];
  moduleId: string;
  sectionType: string;
}) {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const item = items[index];

  function handleNext() {
    // Case 1: still items left → next item
    if (index < items.length - 1) {
      setIndex(index + 1);
      return;
    }

    // Case 2: last item → jump to next section
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

  // ✅ RETURN IS NOW CLEARLY INSIDE THE FUNCTION
  return (
    <section className="max-w-3xl">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      <div className="border rounded-lg p-6 mb-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">German</p>
            <p className="text-2xl font-medium">{item.de}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">English</p>
            <p className="text-2xl font-medium">{item.en}</p>
          </div>
        </div>
      </div>

      {item.image_tag && (
        <div className="mb-6 flex justify-center">
          <img
            src={`/images/vocab/${item.image_tag}.png`}
            alt={item.en}
            className="max-h-56 object-contain"
          />
        </div>
      )}

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
