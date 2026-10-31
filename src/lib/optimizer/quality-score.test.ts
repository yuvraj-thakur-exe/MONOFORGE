import { describe, it, expect } from 'vitest';
import { calculateProfileQualityScore } from './quality-score';
import { ReadmeConfig } from '#/lib/plugins/types';

describe('calculateProfileQualityScore', () => {
  it('evaluates an empty config with low score and improvement suggestions', () => {
    const emptyConfig: ReadmeConfig = {
      version: '1.0.0',
      title: 'Empty',
      settings: {
        user: { github: '' },
        theme: 'dark',
        accentColor: '#8b5cf6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [],
    };

    const report = calculateProfileQualityScore(emptyConfig);
    expect(report.overallScore).toBeLessThan(50);
    expect(report.actionableImprovements.length).toBeGreaterThan(0);
    expect(report.camoCompliant).toBe(true);
  });

  it('evaluates a complete rich profile with S-tier score', () => {
    const richConfig: ReadmeConfig = {
      version: '1.0.0',
      title: 'Rich Profile',
      settings: {
        user: {
          github: 'alexdev',
          name: 'Alex Johnson',
          role: 'Staff Systems Architect',
          bio: 'Building hyper-scalable distributed engines and open source vector graphics.',
        },
        theme: 'dark',
        accentColor: '#ffe600',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: '1',
          type: 'techs',
          props: {
            content: { icons: ['typescript', 'react', 'nextjs', 'rust', 'go', 'docker', 'k8s', 'aws'] },
            styles: {},
            state: 'default',
          },
        },
        {
          id: '2',
          type: 'telemetry-isocalendar',
          props: { content: { username: 'alexdev' }, styles: {}, state: 'default' },
        },
        {
          id: '3',
          type: 'github-readme-stats',
          props: { content: { username: 'alexdev' }, styles: {}, state: 'default' },
        },
        {
          id: '4',
          type: 'github-profile-trophy',
          props: { content: { username: 'alexdev' }, styles: {}, state: 'default' },
        },
        {
          id: '5',
          type: 'socials',
          props: {
            content: { github: 'alexdev', twitter: 'alexdev', linkedin: 'alexdev' },
            styles: {},
            state: 'default',
          },
        },
      ],
    };

    const report = calculateProfileQualityScore(richConfig);
    expect(report.overallScore).toBeGreaterThanOrEqual(90);
    expect(report.grade).toBe('S-TIER');
    expect(report.camoCompliant).toBe(true);
  });

  it('detects insecure http URLs and penalizes score', () => {
    const insecureConfig: ReadmeConfig = {
      version: '1.0.0',
      title: 'Insecure',
      settings: {
        user: { github: 'testuser' },
        theme: 'dark',
        accentColor: '#8b5cf6',
        badgeStyle: 'for-the-badge',
        align: 'left',
      },
      sections: [
        {
          id: '1',
          type: 'custom',
          props: {
            content: { banner: 'http://insecure-image.com/pic.png' },
            styles: {},
            state: 'default',
          },
        },
      ],
    };

    const report = calculateProfileQualityScore(insecureConfig);
    expect(report.camoCompliant).toBe(false);
    expect(report.actionableImprovements).toContain(
      'Replace insecure http:// image or badge URLs with secure https://'
    );
  });
});
