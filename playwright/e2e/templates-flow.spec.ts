import fs from 'node:fs';
import { test, expect } from '@playwright/test';

const FORBIDDEN_FICTIONAL_METRICS = [
  '2,847 commits',
  '2,840+',
  '42-day streak',
  'Top 1% global rank',
  'TS 58%',
];

test.describe('MonoForge Templates, Preview Studio, Visualizer & InfoHub Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try {
        sessionStorage.setItem('monoforge_startup_viewed', 'true');
      } catch {
        // Ignore storage errors
      }
    });
  });

  test('Test A: renders genuinely distinct actual README previews & matching raw markdown for Minimalist, AI, Cyberpunk, and Terminal archetypes', async ({
    page,
  }) => {
    await page.goto('/en/templates');
    await expect(
      page.getByRole('heading', { name: /CURATED STARTER ARCHETYPES/i })
    ).toBeVisible();

    const targets = [
      {
        name: 'Minimal Professional',
        expectedHeading: "Hi there, I'm Alex Morgan",
        expectedRaw: "# Hi there, I'm Alex Morgan",
      },
      {
        name: 'AI & Machine Learning',
        expectedHeading: "Hi there, I'm Aari Thorne",
        expectedRaw: "# Hi there, I'm Aari Thorne",
      },
      {
        name: 'Neon Cyberpunk',
        expectedHeading: "Hi there, I'm Kai_",
        expectedRaw: "# Hi there, I'm Kai_",
      },
      {
        name: 'Retro Terminal',
        expectedHeading: "Hi there, I'm Terminal 1984",
        expectedRaw: "# Hi there, I'm Terminal 1984",
      },
    ];

    const renderedSnapshots: string[] = [];
    const rawSnapshots: string[] = [];

    for (const target of targets) {
      const previewBtn = page.getByRole('button', {
        name: `Preview archetype ${target.name}`,
        exact: true,
      });
      await previewBtn.scrollIntoViewIfNeeded();
      await expect(previewBtn).toBeVisible();

      // Verify card itself renders an actual README preview matching the template persona
      const card = previewBtn.locator('xpath=ancestor::div[contains(@class,"rounded-2xl")][1]');
      const cardRenderer = card.locator('[data-testid="readme-markdown-renderer"]');
      await expect(cardRenderer).toBeVisible();
      await expect(cardRenderer).toContainText(target.expectedHeading);

      // Open Full README Studio Modal
      await previewBtn.click();
      const dialog = page.getByRole('dialog', {
        name: `${target.name} README Studio`,
      });
      await expect(dialog).toBeVisible();

      // Rendered README tab
      const fullViewport = dialog.locator('[data-testid="template-readme-full-viewport"]');
      await expect(fullViewport).toBeVisible();
      await expect(fullViewport).toContainText(target.expectedHeading);
      const renderedText = (await fullViewport.innerText()).trim();
      expect(renderedText.length).toBeGreaterThan(20);
      renderedSnapshots.push(renderedText);

      // Switch to Raw Markdown tab and verify headings match Rendered README
      await dialog.getByRole('button', { name: /Raw Markdown/i }).click();
      const rawPre = dialog.locator('pre').first();
      await expect(rawPre).toBeVisible();
      const rawText = (await rawPre.innerText()).trim();
      expect(rawText).toContain(target.expectedRaw);
      rawSnapshots.push(rawText);

      await dialog.getByRole('button', { name: 'Close README studio modal' }).click();
      await expect(dialog).toBeHidden();
    }

    // All 4 templates must produce genuinely distinct rendered & raw markdown outputs
    expect(new Set(renderedSnapshots).size).toBe(4);
    expect(new Set(rawSnapshots).size).toBe(4);
  });

  test('Test B: eliminates all fictional hardcoded metrics across gallery cards and full preview modal', async ({
    page,
  }) => {
    await page.goto('/en/templates');
    await expect(
      page.getByRole('heading', { name: /CURATED STARTER ARCHETYPES/i })
    ).toBeVisible();

    const galleryText = await page.locator('main').innerText();
    for (const metric of FORBIDDEN_FICTIONAL_METRICS) {
      expect(galleryText).not.toContain(metric);
    }

    // Also inspect inside full modal across multiple archetypes
    for (const templateName of ['Minimal Professional', 'Neon Cyberpunk', 'Bento Dashboard']) {
      const previewBtn = page.getByRole('button', {
        name: `Preview archetype ${templateName}`,
        exact: true,
      });
      await previewBtn.scrollIntoViewIfNeeded();
      await previewBtn.click();

      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();

      const modalRenderedText = await dialog.innerText();
      for (const metric of FORBIDDEN_FICTIONAL_METRICS) {
        expect(modalRenderedText).not.toContain(metric);
      }

      await dialog.getByRole('button', { name: /Raw Markdown/i }).click();
      const modalRawText = await dialog.innerText();
      for (const metric of FORBIDDEN_FICTIONAL_METRICS) {
        expect(modalRawText).not.toContain(metric);
      }

      await dialog.getByRole('button', { name: 'Close README studio modal' }).click();
      await expect(dialog).toBeHidden();
    }
  });

  test('Test C: renders responsively with zero horizontal overflow across desktop, tablet, and mobile viewports', async ({
    page,
  }) => {
    const viewports = [
      { label: 'desktop', width: 1440, height: 900, deviceBtn: 'Desktop Viewport' },
      { label: 'tablet', width: 768, height: 1024, deviceBtn: 'Tablet Viewport' },
      { label: 'mobile', width: 375, height: 812, deviceBtn: 'Mobile Viewport' },
    ] as const;

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/en/templates');
      await expect(
        page.getByRole('heading', { name: /CURATED STARTER ARCHETYPES/i })
      ).toBeVisible();

      // Gallery page zero horizontal overflow
      const pageOverflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      expect(
        pageOverflow.scrollWidth,
        `Gallery horizontal overflow at ${vp.label} (${vp.width}px)`
      ).toBeLessThanOrEqual(pageOverflow.innerWidth);

      // First card preview should be readable & fit viewport
      const firstPreview = page.locator('[data-testid="template-readme-preview"]').first();
      await expect(firstPreview).toBeVisible();
      const previewBox = await firstPreview.boundingBox();
      expect(previewBox).not.toBeNull();
      expect(previewBox!.width).toBeGreaterThan(220);
      expect(previewBox!.width).toBeLessThanOrEqual(vp.width);

      // Open modal and check modal responsiveness + zero overflow
      await page
        .getByRole('button', { name: 'Preview archetype Minimal Professional', exact: true })
        .click();

      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();

      const deviceToggle = dialog.getByRole('button', { name: vp.deviceBtn });
      await deviceToggle.click();

      const fullPreview = dialog.locator('[data-testid="template-readme-full-viewport"]');
      await expect(fullPreview).toBeVisible();
      const fullBox = await fullPreview.boundingBox();
      expect(fullBox).not.toBeNull();
      expect(fullBox!.width).toBeGreaterThan(220);
      expect(fullBox!.width).toBeLessThanOrEqual(vp.width);

      const modalCheck = await page.evaluate(() => {
        const dlg = document.querySelector('[role="dialog"]');
        const dlgPanel = dlg?.firstElementChild as HTMLElement | null;
        return {
          docScrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          modalScrollWidth: dlgPanel ? dlgPanel.scrollWidth : 0,
          modalClientWidth: dlgPanel ? dlgPanel.clientWidth : 0,
        };
      });
      expect(
        modalCheck.docScrollWidth,
        `Document overflow with modal open at ${vp.label}`
      ).toBeLessThanOrEqual(modalCheck.innerWidth);
      expect(
        modalCheck.modalScrollWidth,
        `Modal panel internal horizontal overflow at ${vp.label}`
      ).toBeLessThanOrEqual(modalCheck.modalClientWidth + 1);

      await dialog.getByRole('button', { name: 'Close README studio modal' }).click();
      await expect(dialog).toBeHidden();
    }
  });

  test('Test D: keeps Rendered README, Raw Markdown, Copy Markdown, and downloaded README.md 100% consistent', async ({
    page,
    context,
  }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/en/templates');

    await page
      .getByRole('button', { name: 'Preview archetype Neon Cyberpunk', exact: true })
      .click();

    const dialog = page.getByRole('dialog', { name: 'Neon Cyberpunk README Studio' });
    await expect(dialog).toBeVisible();

    // Rendered tab check
    await expect(dialog.locator('[data-testid="template-readme-full-viewport"]')).toContainText(
      "Hi there, I'm Kai_"
    );

    // Switch to Raw Markdown tab
    await dialog.getByRole('button', { name: /Raw Markdown/i }).click();
    const rawPre = dialog.locator('pre').first();
    await expect(rawPre).toBeVisible();
    const rawMarkdown = await rawPre.innerText();
    expect(rawMarkdown).toContain("# Hi there, I'm Kai_");

    // Switch back to Rendered and back to Raw to verify tab round-trip stability
    await dialog.getByRole('button', { name: /Rendered README/i }).click();
    await expect(dialog.locator('[data-testid="template-readme-full-viewport"]')).toBeVisible();
    await dialog.getByRole('button', { name: /Raw Markdown/i }).click();

    // Trigger Copy Markdown and verify clipboard matches Raw Markdown tab
    await dialog.getByTitle('Copy Rendered Markdown').click();
    await expect(dialog.getByText('COPIED', { exact: true })).toBeVisible();
    const copiedText = await page.evaluate(() => navigator.clipboard.readText());
    expect(copiedText.replace(/\r\n/g, '\n')).toBe(rawMarkdown.replace(/\r\n/g, '\n'));

    // Trigger Download README.md and assert downloaded file content matches Raw Markdown tab
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      dialog.getByTitle('Download README.md').click(),
    ]);
    expect(download.suggestedFilename()).toMatch(/README\.md$/i);
    const downloadedPath = await download.path();
    expect(downloadedPath).toBeTruthy();
    const downloadedContent = fs.readFileSync(downloadedPath!, 'utf8');
    expect(downloadedContent.replace(/\r\n/g, '\n')).toBe(rawMarkdown.replace(/\r\n/g, '\n'));
  });

  test('Test E: Apply Template navigates to /developer and renders the applied template in editor & live preview', async ({
    page,
  }) => {
    await page.goto('/en/templates');

    await page
      .getByRole('button', { name: 'Preview archetype Neon Cyberpunk', exact: true })
      .click();

    const dialog = page.getByRole('dialog', { name: 'Neon Cyberpunk README Studio' });
    await expect(dialog).toBeVisible();

    await dialog.getByRole('button', { name: /APPLY TEMPLATE/i }).click();

    await page.waitForURL(/\/developer/, { timeout: 20_000 });
    await expect(page.locator('header').getByText('MonoForge')).toBeVisible();
    await expect(page.locator('header').getByText('/developer')).toBeVisible();

    // Live Preview renders the applied template
    const livePreview = page.locator('[data-testid="readme-markdown-renderer"]');
    await expect(livePreview).toBeVisible();
    await expect(livePreview).toContainText("Hi there, I'm Kai_");

    // Raw MD tab in /developer matches applied template
    await page.getByRole('button', { name: /RAW MD/i }).click();
    await expect(page.locator('pre').filter({ hasText: "Hi there, I'm Kai_" })).toBeVisible();
  });

  test('Test F: Visualizer defaults honestly to SAMPLE DATA and InfoHub displays Interactive CLI Simulator, absolute install.sh URL, and cd MONOFORGE', async ({
    page,
  }) => {
    // 1. Visualizer initial state check
    await page.goto('/en/visualizer');
    const statusBadge = page.getByTestId('studio-data-status-badge');
    await expect(statusBadge).toBeVisible();
    await expect(statusBadge).toHaveText(/Sample data/i);
    await expect(statusBadge).not.toHaveText(/Live GitHub data|REAL DATA/i);
    await expect(page.getByText(/SAMPLE DATA/i).first()).toBeVisible();

    // 2. InfoHub integrity check
    await page.goto('/en/info');
    await expect(page.getByText('Interactive CLI Simulator', { exact: true })).toBeVisible();
    await expect(page.getByText('Simulated Output')).toBeVisible();
    await expect(
      page.getByText('https://raw.githubusercontent.com/yuvraj-thakur-exe/MONOFORGE/main/install.sh')
    ).toBeVisible();

    // Switch to pnpm setup tab to verify clone directory casing (`cd MONOFORGE`)
    await page.getByRole('button', { name: /^pnpm$/i }).click();
    await expect(
      page.getByText(/git clone https:\/\/github\.com\/yuvraj-thakur-exe\/MONOFORGE\.git MONOFORGE/)
    ).toBeVisible();
    await expect(page.getByText(/cd MONOFORGE/)).toBeVisible();
  });
});
