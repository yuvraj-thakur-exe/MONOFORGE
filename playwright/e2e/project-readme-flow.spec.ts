import fs from 'node:fs';
import { test, expect } from '@playwright/test';

test.describe('MonoForge Project README Studio Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try {
        sessionStorage.setItem('monoforge_startup_viewed', 'true');
        localStorage.removeItem('monoforge-project-readme-storage');
      } catch {
        // Ignore storage errors
      }
    });
  });

  test('loads cleanly with zero runtime errors and zero horizontal overflow on desktop and mobile', async ({
    page,
  }) => {
    const pageErrors: string[] = [];
    const consoleErrors: string[] = [];

    page.on('pageerror', (err) => {
      pageErrors.push(err.message);
    });
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    for (const vp of [
      { label: 'desktop', width: 1440, height: 900 },
      { label: 'mobile', width: 375, height: 812 },
    ]) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/en/project-readme');

      await expect(page.getByRole('heading', { name: 'README STUDIO' })).toBeVisible();
      await expect(page.getByTestId('readme-markdown-renderer')).toBeVisible();

      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      expect(
        overflow.scrollWidth,
        `Horizontal overflow detected on ${vp.label} (${vp.width}px)`
      ).toBeLessThanOrEqual(overflow.innerWidth);
    }

    expect(pageErrors, `Uncaught page errors: ${pageErrors.join('; ')}`).toEqual([]);
    expect(consoleErrors, `Console errors: ${consoleErrors.join('; ')}`).toEqual([]);
  });

  test('switches presets and updates live ReadmeMarkdownRenderer across all 9 structured tabs', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en/project-readme');

    const renderer = page.getByTestId('readme-markdown-renderer');
    await expect(renderer).toBeVisible();
    await expect(renderer).toContainText('MonoForge');

    // Preset switching: AI / LLM Agent -> SaaS Platform -> Developer Tool
    await page.getByRole('button', { name: 'AI / LLM Agent' }).click();
    await expect(renderer).toContainText('AetherAgent');

    await page.getByRole('button', { name: 'SaaS Platform' }).click();
    await expect(renderer).toContainText('CloudPulse');

    await page.getByRole('button', { name: 'Developer Tool' }).click();
    await expect(renderer).toContainText('MonoForge');

    // 1. Meta tab
    await page.getByRole('tab', { name: 'Meta' }).click();
    await page.getByLabel('Project Name').fill('OrbitEngine');
    await page.getByLabel('Table of Contents').check();
    await expect(renderer).toContainText('OrbitEngine');
    await expect(renderer).toContainText('Table of Contents');

    // 2. Badges tab
    await page.getByRole('tab', { name: 'Badges' }).click();
    await page.getByLabel('Badge label').fill('Coverage');
    await page.getByLabel('Badge text').fill('99%');
    await page.getByRole('button', { name: 'Add Badge' }).click();
    await expect(page.getByRole('button', { name: 'Toggle Coverage badge' })).toBeVisible();
    await expect(renderer.locator('img[alt="Coverage"]')).toBeAttached();

    // 3. Features tab
    await page.getByRole('tab', { name: 'Features' }).click();
    await page.getByLabel('Feature title').fill('Zero-Copy IPC');
    await page.getByLabel('Feature description').fill('Sub-microsecond message passing across workers.');
    await page.getByRole('button', { name: 'Append Feature' }).click();
    await expect(renderer).toContainText('Zero-Copy IPC');

    // 4. Architecture tab
    await page.getByRole('tab', { name: 'Architecture' }).click();
    await page.getByRole('button', { name: 'Microservices' }).click();
    await expect(renderer).toContainText('API Gateway');

    // 5. Stack tab
    await page.getByRole('tab', { name: 'Stack' }).click();
    await page.getByLabel('Technology name').fill('ClickHouse');
    await page.getByLabel('Technology category').selectOption('Database');
    await page.getByRole('button', { name: 'Add Tech Stack Item' }).click();
    await expect(renderer).toContainText('ClickHouse');

    // 6. Install tab
    await page.getByRole('tab', { name: 'Install' }).click();
    await page.getByLabel('Step title').fill('Run Migrations');
    await page.getByLabel('Step command').fill('pnpm db:migrate');
    await page.getByRole('button', { name: 'Add Install Step' }).click();
    await expect(renderer).toContainText('pnpm db:migrate');

    // 7. Env Vars tab
    await page.getByRole('tab', { name: 'Env Vars' }).click();
    await page.getByLabel('Env variable key').fill('REDIS_URL');
    await page.getByLabel('Env variable description').fill('Redis cache endpoint');
    await page.getByLabel('Env default value').fill('redis://localhost:6379');
    await page.getByRole('button', { name: 'Add Env Variable' }).click();
    await expect(renderer).toContainText('REDIS_URL');

    // 8. Roadmap tab
    await page.getByRole('tab', { name: 'Roadmap' }).click();
    await page.getByLabel('Roadmap milestone task').fill('Launch v2.0 Plugin SDK');
    await page.getByRole('button', { name: 'Add Milestone' }).click();
    await expect(renderer).toContainText('Launch v2.0 Plugin SDK');

    // 9. Sections tab
    await page.getByRole('tab', { name: 'Sections' }).click();
    await page.getByLabel('New section title').fill('Benchmarks');
    await page.getByLabel('New section content').fill('Sustains 1.2M ops/sec on a single node.');
    await page.getByRole('button', { name: 'Add Custom Section' }).click();
    await expect(renderer).toContainText('Benchmarks');
    await expect(renderer).toContainText('Sustains 1.2M ops/sec on a single node.');
  });

  test('toggles Rendered/Raw tabs, supports raw override + reset, viewport/theme toggles, and exports README.md', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en/project-readme');

    const viewportFrame = page.getByTestId('readme-viewport-frame');
    await expect(viewportFrame).toHaveAttribute('data-viewport', 'desktop');
    await expect(viewportFrame).toHaveAttribute('data-theme', 'dark');

    // Viewport & theme toggles
    await page.getByRole('button', { name: 'Tablet Viewport' }).click();
    await expect(viewportFrame).toHaveAttribute('data-viewport', 'tablet');

    await page.getByRole('button', { name: 'Mobile Viewport' }).click();
    await expect(viewportFrame).toHaveAttribute('data-viewport', 'mobile');

    await page.getByRole('button', { name: 'Desktop Viewport' }).click();
    await expect(viewportFrame).toHaveAttribute('data-viewport', 'desktop');

    await page.getByRole('button', { name: /Switch preview to light theme/i }).click();
    await expect(viewportFrame).toHaveAttribute('data-theme', 'light');

    await page.getByRole('button', { name: /Switch preview to dark theme/i }).click();
    await expect(viewportFrame).toHaveAttribute('data-theme', 'dark');

    // Toggle to Raw Markdown, edit, verify Rendered README reflects override, then Reset to Structured
    await page.getByRole('tab', { name: 'Raw Markdown' }).click();
    const rawEditor = page.getByLabel('Raw Markdown Editor');
    await expect(rawEditor).toBeVisible();
    const structuredMarkdown = await rawEditor.inputValue();
    expect(structuredMarkdown).toContain('MonoForge');

    const customOverride = '# Custom Override Heading\n\nEdited manually in Raw Markdown.';
    await rawEditor.fill(customOverride);
    await expect(page.getByText('Manual Override Active')).toBeVisible();

    await page.getByRole('tab', { name: 'Rendered README' }).click();
    await expect(page.getByTestId('readme-markdown-renderer')).toContainText(
      'Custom Override Heading'
    );

    await page.getByRole('button', { name: /Reset to Structured/i }).click();
    await expect(page.getByTestId('readme-markdown-renderer')).toContainText('MonoForge');

    // Export .md download matches Raw Markdown
    await page.getByRole('tab', { name: 'Raw Markdown' }).click();
    const finalRawMarkdown = await rawEditor.inputValue();

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: /EXPORT \.MD/i }).click(),
    ]);
    expect(download.suggestedFilename()).toBe('README.md');
    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
    const downloadedContent = fs.readFileSync(downloadPath!, 'utf8');
    expect(downloadedContent.replace(/\r\n/g, '\n')).toBe(finalRawMarkdown.replace(/\r\n/g, '\n'));
  });

  test('POST /api/project-readme/inspect rejects invalid and non-GitHub URLs with 400', async ({
    request,
  }) => {
    const invalidUrls = [
      '',
      'not-a-repo',
      'https://evil.com/foo/bar',
      'https://evil.com/owner/repo',
      'http://169.254.169.254/latest/meta-data',
      'https://github.com/../etc/passwd',
      'javascript:alert(1)',
    ];

    for (const url of invalidUrls) {
      const response = await request.post('/api/project-readme/inspect', {
        data: { url },
      });
      expect(response.status(), `Expected 400 for invalid URL "${url}"`).toBe(400);
      const body = await response.json();
      expect(body.source).toBe('error');
      expect(typeof body.error).toBe('string');
    }
  });
});
