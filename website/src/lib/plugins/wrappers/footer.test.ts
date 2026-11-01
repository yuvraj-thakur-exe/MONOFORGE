import { describe, it, expect } from 'vitest';
import { footerPlugin } from './footer';
import { UserSettings } from '../types';

describe('footerPlugin', () => {
  const dummySettings: UserSettings = {
    user: { github: 'bob', name: 'Bob' },
    theme: 'dark',
    accentColor: '#ffe600',
    badgeStyle: 'for-the-badge',
    align: 'center',
  };

  it('renders closing tagline and back to top anchor', () => {
    const output = footerPlugin.renderMarkdown(
      { tagline: 'Let us connect on LinkedIn!', showBackToTop: true },
      dummySettings
    );
    expect(output).toContain('Let us connect on LinkedIn!');
    expect(output).toContain('[↑ Back to Top]');
    expect(output).toContain('align="center"');
  });

  it('omits back to top anchor when disabled', () => {
    const output = footerPlugin.renderMarkdown(
      { tagline: 'Bye!', showBackToTop: false, showAttribution: false },
      dummySettings
    );
    expect(output).toContain('Bye!');
    expect(output).not.toContain('[↑ Back to Top]');
    expect(output).not.toContain('MonoForge');
  });
});
