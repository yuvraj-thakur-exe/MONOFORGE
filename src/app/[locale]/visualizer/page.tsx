import { Metadata } from 'next';
import { VisualizationStudio } from '#/components/visualizer/VisualizationStudio';
import { TopNav } from '#/components/navigation/TopNav';

export const metadata: Metadata = {
  title: 'Developer Identity & Visualization Studio | MonoForge 3.0',
  description:
    'Transform real GitHub contribution and telemetry data into 9 signature 60fps visual experiences: Commit City, Commit River, Year Clock, Coding Pulse, Terminal, Snake, and Galaxy. Dual output for Portfolio Canvas and Camo-safe README SVGs.',
  keywords: [
    'GitHub contribution graph',
    '3D isometric commit city',
    'developer identity studio',
    'camo safe svg',
    'git visualization',
    'developer portfolio canvas',
    'monoforge visualizer',
  ],
};

export default function VisualizerPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col">
      <TopNav />
      <VisualizationStudio />
    </div>
  );
}

