export const SECTION_ORDER = [
  "vocabulary",
  "phrases",
  "introduction",
];

export function getNextSection(current: string) {
  const index = SECTION_ORDER.indexOf(current);
  return SECTION_ORDER[index + 1] ?? null;
}
