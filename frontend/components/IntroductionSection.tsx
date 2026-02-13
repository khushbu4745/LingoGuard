"use client";

import { useState } from "react";

type Item = {
  id: string;
  text: string;
  image_tag?: string;
};

export default function IntroductionSection({
  title,
  items,
}: {
  title: string;
  items: Item[];
}) {
  const [index, setIndex] = useState(0);
  const item = items[index];

  return (
    <section className="max-w-3xl">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      {/* Sentence */}
      <div className="border rounded-lg p-6 mb-6">
        <p className="text-sm text-gray-500 mb-1">Sentence</p>
        <p className="text-2xl font-medium">{item.text}</p>
      </div>

      {/* Image */}
      {item.image_tag && (
        <div className="mb-6 flex justify-center">
          <img
            src={`/images/introduction/${item.image_tag}.png`}
            alt={item.text}
            className="max-h-56 object-contain"
          />
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setIndex(index - 1)}
          disabled={index === 0}
          className="px-4 py-2 rounded border disabled:opacity-40"
        >
          ← Previous
        </button>

        <span className="text-sm text-gray-500">
          {index + 1} / {items.length}
        </span>

        <button
          onClick={() => setIndex(index + 1)}
          disabled={index === items.length - 1}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-40"
        >
          Next →
        </button>
      </div>
    </section>
  );
}
