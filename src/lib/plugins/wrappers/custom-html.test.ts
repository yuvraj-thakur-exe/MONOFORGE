import { describe, it, expect } from 'vitest';
import { customHtmlPlugin } from './custom-html';
import { UserSettings } from '../types';

describe('customHtmlPlugin', () => {
  const dummySettings: UserSettings = {
    user: { github: 'alice', name: 'Alice' },
    theme: 'dark',
    accentColor: '#ffe600',
    badgeStyle: 'for-the-badge',
    align: 'left',
  };

  it('renders standard markdown or html cleanly', () => {
    const output = customHtmlPlugin.renderMarkdown(
      { content: '### Custom Title\nHello world!' },
      dummySettings
    );
    expect(output).toContain('### Custom Title');
    expect(output).toContain('Hello world!');
  });

  it('sanitizes dangerous script tags and event handlers', () => {
    const malicious = '<script>alert("xss")</script><img src="x" onerror="alert(1)" />Safe text';
    const output = customHtmlPlugin.renderMarkdown(
      { content: malicious },
      dummySettings
    );
    expect(output).not.toContain('<script>');
    expect(output).not.toContain('onerror=');
    expect(output).toContain('Safe text');
  });

  it('wraps content in aligned div when alignment is center', () => {
    const output = customHtmlPlugin.renderMarkdown(
      { content: 'Hello Centered', align: 'center' },
      dummySettings
    );
    expect(output).toContain('<div align="center">');
    expect(output).toContain('Hello Centered');
  });
});
