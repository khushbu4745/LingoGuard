import SectionRenderer from "@/components/SectionRenderer";

type Section = {
  section_id: string;
  type: string;
  title: string;
  items: any[];
};

type ModuleResponse = {
  module_id: string;
  title: string;
  description: string;
  sections: Section[];
};

async function getModule(moduleId: string): Promise<ModuleResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/modules/${moduleId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to load module");
  }

  return res.json();
}

export default async function ModulePage({
  params,
  searchParams,
}: {
  params: Promise<{ moduleId: string }>;
  searchParams: Promise<{ section?: string }>;
}) {
  const { moduleId } = await params;
  const { section } = await searchParams;

  const module = await getModule(moduleId);

  const activeSectionType = section ?? "vocabulary";

  const activeSection = module.sections.find(
    (s) => s.type === activeSectionType
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
      <p className="text-gray-600 mb-8">{module.description}</p>

      {activeSection ? (
        <SectionRenderer
        section={activeSection}
        moduleId={moduleId}
/>
      ) : (
        <p className="text-gray-500">Section not found.</p>
      )}
    </div>
  );
}
