import { describe, it, expect } from 'vitest';
import {
  getAllDocs,
  getDocBySlug,
  getDocsNavigation,
  searchDocs,
} from './docs-data';

describe('Documentation Data Engine', () => {
  it('returns all documentation items', () => {
    const docs = getAllDocs();
    expect(docs.length).toBeGreaterThanOrEqual(18);
    for (const doc of docs) {
      expect(doc.slug).toBeDefined();
      expect(doc.title).toBeDefined();
      expect(doc.content).toBeDefined();
      expect(doc.headings.length).toBeGreaterThan(0);
    }
  });

  it('retrieves specific doc by slug array', () => {
    const introDoc = getDocBySlug(['getting-started', 'introduction']);
    expect(introDoc).toBeDefined();
    expect(introDoc?.title).toContain('Introduction to MonoForge');

    const cliDoc = getDocBySlug(['reference', 'cli']);
    expect(cliDoc).toBeDefined();
    expect(cliDoc?.title).toContain('CLI');

    const notFound = getDocBySlug(['non-existent', 'slug']);
    expect(notFound).toBeUndefined();
  });

  it('generates structured navigation categories', () => {
    const nav = getDocsNavigation();
    expect(nav.length).toBeGreaterThanOrEqual(5);

    const categoryNames = nav.map((c) => c.name);
    expect(categoryNames).toContain('Getting Started');
    expect(categoryNames).toContain('Installation & Setup');
    expect(categoryNames).toContain('Usage Guides');
    expect(categoryNames).toContain('Product Reference');
    expect(categoryNames).toContain('Contributing & Help');
  });

  it('searches docs effectively by query', () => {
    const pnpmResults = searchDocs('pnpm');
    expect(pnpmResults.length).toBeGreaterThan(0);
    expect(pnpmResults.some((d) => d.slug.includes('installation') || d.slug.includes('quickstart'))).toBe(true);

    const camoResults = searchDocs('camo');
    expect(camoResults.length).toBeGreaterThan(0);
    expect(camoResults.some((d) => d.slug.includes('camo-rules'))).toBe(true);

    const emptyResults = searchDocs('');
    expect(emptyResults).toEqual([]);
  });
});
