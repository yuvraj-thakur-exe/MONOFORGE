import { describe, it, expect } from 'vitest';
import {
  BEST_README_TECH_SHIELDS,
  buildBestReadmeMarkdown,
  BEST_README_TEMPLATES,
} from './best-readme';

describe('Best-README Suite & Generator Engine', () => {
  it('contains comprehensive tech shields dictionary', () => {
    expect(Object.keys(BEST_README_TECH_SHIELDS).length).toBeGreaterThan(20);
    expect(BEST_README_TECH_SHIELDS.nextjs).toBeDefined();
    expect(BEST_README_TECH_SHIELDS.react).toBeDefined();
    expect(BEST_README_TECH_SHIELDS.rust).toBeDefined();
    expect(BEST_README_TECH_SHIELDS.docker).toBeDefined();
  });

  it('generates complete reference-style Best-README markdown', () => {
    const md = buildBestReadmeMarkdown({
      user: {
        github: 'yuvraj-thakur-exe',
        repo: 'MONOFORGE',
        projectTitle: 'MONOFORGE Studio',
        tagline: 'Forge a GitHub profile that gets noticed.',
        description: 'Visual wizard + developer raw-mode editor with 60fps Camo-safe telemetry.',
        authorName: 'Yuvraj Thakur',
        twitter: 'yuvrajthakur',
        email: 'yuvraj@example.com',
        license: 'MIT',
      },
      technologies: ['nextjs', 'react', 'typescript', 'tailwind', 'rust', 'docker'],
      includeTelemetry: true,
    });

    // Check essential Best-README sections
    expect(md).toContain('<a id="readme-top"></a>');
    expect(md).toContain('[contributors-shield]');
    expect(md).toContain('[forks-shield]');
    expect(md).toContain('[stars-shield]');
    expect(md).toContain('[issues-shield]');
    expect(md).toContain('[license-shield]');
    expect(md).toContain('<summary><strong>Table of Contents</strong>');
    expect(md).toContain('## About The Project');
    expect(md).toContain('### Built With');
    expect(md).toContain('## Getting Started');
    expect(md).toContain('### Installation');
    expect(md).toContain('## Usage');
    expect(md).toContain('## Roadmap');
    expect(md).toContain('## Contributing');
    expect(md).toContain('contrib.rocks/image?repo=yuvraj-thakur-exe/MONOFORGE');
    expect(md).toContain('## License');
    expect(md).toContain('## Contact');
    expect(md).toContain('## Acknowledgments');
    expect(md).toContain('https://github.com/othneildrew/Best-README-Template');
    expect(md).toContain('<!-- MARKDOWN REFERENCE LINKS & IMAGES -->');
    expect(md).toContain('Real-Time Contributor Telemetry');
  });

  it('validates pre-configured Best-README templates', () => {
    expect(BEST_README_TEMPLATES.length).toBe(4);
    const flagship = BEST_README_TEMPLATES.find(t => t.id === 'best-readme-flagship');
    expect(flagship).toBeDefined();
    expect(flagship?.category).toBe('Best-README');
    expect(flagship?.config.sections.length).toBeGreaterThan(0);

    for (const t of BEST_README_TEMPLATES) {
      expect(t.id).toBeDefined();
      expect(t.name).toBeDefined();
      expect(t.description).toBeDefined();
      expect(t.config.settings.user).toBeDefined();
      expect(t.config.version).toBe('1.0.0');
    }
  });
});
