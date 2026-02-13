"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    id: "vocabulary",
    label: "Professional Vocabulary",
  },
  {
    id: "phrases",
    label: "Useful Workplace Phrases",
  },
  {
    id: "WritingEmails",
    label: "Writing Emails",
  },
  {
    id: "introduction",
    label: "Formal Self-Introduction",
  },
  {
    id: "exercises",
    label: "Exercises",
  },
];

export default function ModuleSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r px-6 py-8">
      <h2 className="text-lg font-semibold mb-6">
        Module 1
      </h2>

      <nav className="space-y-2 text-sm">
        {sections.map((section) => {
          const href = `/module/module_01?section=${section.id}`;
          const isActive = pathname.includes(section.id);

          return (
            <Link
              key={section.id}
              href={href}
              className={`block px-3 py-2 rounded ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {section.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
