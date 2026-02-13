import ModuleSidebar from "@/components/ModuleSidebar";
import AIHelpPanel from "@/components/AIHelpPanel";

export default function ModuleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left: Module navigation */}
      <ModuleSidebar />

      {/* Center: Main learning content */}
      <main className="flex-1 p-8">{children}</main>

      {/* Right: AI Help panel */}
      <AIHelpPanel />
    </div>
  );
}
