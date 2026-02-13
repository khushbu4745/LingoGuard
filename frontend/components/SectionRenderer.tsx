"use client";

import VocabularySection from "./VocabularySection";
import PhraseSection from "./PhraseSection";
import IntroductionSection from "./IntroductionSection";

export default function SectionRenderer({
  section,
  moduleId,
}: {
  section: {
    section_id: string;
    moduleId: string;
    type: string;
    title: string;
    items: any[];
  };
}) {
  switch (section.type) {
    case "vocabulary":
      return (
        <VocabularySection
          title={section.title}
          items={section.items}
          sectionType={section.type}
          moduleId={moduleId}
        />
      );

    case "phrases":
      return (
        <PhraseSection
          title={section.title}
          items={section.items}
          sectionType={section.type}
          moduleId={moduleId}
        />
      );

    case "introduction":
      return (
        <IntroductionSection
          title={section.title}
          items={section.items}
          sectionType={section.type}
          moduleId={moduleId}
        />
      );

    default:
      return null;
  }
}
