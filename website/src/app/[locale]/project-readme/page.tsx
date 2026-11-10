import { Metadata } from 'next';
import { ProjectReadmeStudio } from '#/components/project-readme/ProjectReadmeStudio';
import { TopNav } from '#/components/navigation/TopNav';

export const metadata: Metadata = {
  title: 'Project README Studio | MonoForge 3.0',
  description:
    'Turn ordinary software repositories into professional, high-impact project READMEs. Auto-detect repository architecture, configure Shields.io badges, render Mermaid diagrams, and export production-grade GitHub Flavored Markdown.',
  keywords: [
    'Project README generator',
    'GitHub README builder',
    'Repository documentation',
    'Mermaid architecture diagrams',
    'Shields.io badges',
    'Developer tool documentation',
    'MonoForge',
  ],
};

export default function ProjectReadmePage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <TopNav />
      <ProjectReadmeStudio />
    </div>
  );
}

