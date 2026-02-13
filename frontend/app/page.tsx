import Link from "next/link";

export default function HomePage() {
  return (
    <main className="w-full px-8 py-20 space-y-20">

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">
          AI-assisted Business German
        </h1>

        <p className="text-lg text-gray-600 mb-10">
          Learn professional German for workplace communication with
          AI-supported feedback and real-world scenarios.
        </p>

        <Link
          href="/module/module_01"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded text-lg"
        >
          Start Learning →
        </Link>
      </section>

      {/* AI Example */}
      <section className="max-w-3xl mx-auto border rounded-xl p-8 bg-gray-50">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Example AI Feedback
        </h2>

        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-medium">You:</span> I will send you the mail tomorrow.
          </p>

          <p>
            <span className="font-medium">AI:</span>{" "}
            <span className="italic">
              Ich sende Ihnen die E-Mail bis morgen.
            </span>
          </p>

          <p className="text-sm text-gray-500 text-center">
            Formal register and clear deadline expression.
          </p>
        </div>
      </section>

      {/* Supporting Points */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto text-center">
        <div>
          <h3 className="font-semibold mb-2">Practical Workplace Focus</h3>
          <p className="text-gray-600">
            Learn German as used in real professional environments.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">AI-guided Corrections</h3>
          <p className="text-gray-600">
            Understand not just what is wrong, but why.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Structured Learning</h3>
          <p className="text-gray-600">
            Clear modules designed for international students.
          </p>
        </div>
      </section>

    </main>
  );
}
