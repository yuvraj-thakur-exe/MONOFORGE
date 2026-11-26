import fs from 'node:fs';
import path from 'node:path';
import { test, expect } from '@playwright/test';

const SCREENSHOT_DIR =
  'C:\\Users\\YUVRAJ\\.gemini\\antigravity\\brain\\cd3dad19-65b7-4217-a4ea-4e174b36e637\\scratch\\screenshots';

function saveScreenshotIfLocal(filename: string): string | null {
  if (process.env.CI || process.platform !== 'win32') return null;
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  return path.join(SCREENSHOT_DIR, filename);
}

test.describe('MonoForge /en/visualizer Studio Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try {
        sessionStorage.setItem('monoforge_startup_viewed', 'true');
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

    // Desktop 1440x900
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en/visualizer');

    await expect(page.getByTestId('studio-data-status-badge')).toBeVisible();
    await expect(page.getByTestId('studio-status-banner')).toBeVisible();
    await expect(page.locator('canvas').first()).toBeVisible();

    const desktopOverflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(
      desktopOverflow.scrollWidth,
      `Horizontal overflow detected on desktop (${desktopOverflow.scrollWidth} > ${desktopOverflow.innerWidth})`
    ).toBeLessThanOrEqual(desktopOverflow.innerWidth);

    const desktopShot = saveScreenshotIfLocal('visualizer-desktop.png');
    if (desktopShot) {
      await page.waitForTimeout(600);
      await page.screenshot({ path: desktopShot, fullPage: false });
    }

    // Mobile 375x812
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/en/visualizer');

    await expect(page.getByTestId('studio-data-status-badge')).toBeVisible();
    await expect(page.getByTestId('studio-status-banner')).toBeVisible();

    const mobileOverflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(
      mobileOverflow.scrollWidth,
      `Horizontal overflow detected on mobile (${mobileOverflow.scrollWidth} > ${mobileOverflow.innerWidth})`
    ).toBeLessThanOrEqual(mobileOverflow.innerWidth);

    const mobileShot = saveScreenshotIfLocal('visualizer-mobile.png');
    if (mobileShot) {
      await page.screenshot({ path: mobileShot, fullPage: false });
    }

    expect(pageErrors, `Uncaught page errors: ${pageErrors.join('; ')}`).toEqual([]);
    expect(consoleErrors, `Console errors: ${consoleErrors.join('; ')}`).toEqual([]);
  });

  test('hydrates deep-link params and displays honest Sample data status badge', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en/visualizer?user=octocat&viz=commit-city&theme=monoforge');

    const badge = page.getByTestId('studio-data-status-badge');
    await expect(badge).toBeVisible();
    await expect(badge).toContainText('Sample data');

    const banner = page.getByTestId('studio-status-banner');
    await expect(banner).toBeVisible();
    await expect(banner).toContainText('SAMPLE DATA');
    await expect(banner).toContainText('@octocat');

    await expect(page.getByText(/Commit City\s*•\s*Architecture Specification/i)).toBeVisible();
  });

  test('switches preview modes, selects another visualization and theme, and downloads SVG', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en/visualizer');

    // Select another visualization and theme
    await page.getByRole('button', { name: /Developer Year Clock/i }).click();
    await page.getByRole('button', { name: /Cyberpunk Neon/i }).click();

    await expect(
      page.getByText(/plugin=yearclock&user=octocat&theme=cyberpunk&mode=sample/i)
    ).toBeVisible();

    // Switch to Live SVG Embed
    const svgTab = page.getByRole('tab', { name: /Live SVG Embed/i });
    await svgTab.click();
    await expect(svgTab).toHaveAttribute('aria-selected', 'true');

    const svgImg = page.getByRole('img', { name: /Developer Year Clock Live SVG Embed/i });
    const svgFallback = page.getByTestId('svg-fallback-preview');
    await expect(svgImg.or(svgFallback)).toBeVisible();
    if (await svgImg.isVisible()) {
      await expect(svgImg).toHaveAttribute(
        'src',
        '/api/telemetry/svg?plugin=yearclock&user=octocat&theme=cyberpunk&mode=sample'
      );
    }

    const svgShot = saveScreenshotIfLocal('visualizer-svg-mode.png');
    if (svgShot) {
      await page.waitForTimeout(600);
      await page.screenshot({ path: svgShot, fullPage: false });
    }

    // Switch to README Preview
    const readmeTab = page.getByRole('tab', { name: /README Preview/i });
    await readmeTab.click();
    await expect(readmeTab).toHaveAttribute('aria-selected', 'true');
    const readmeContainer = page.getByTestId('readme-preview-container');
    await expect(readmeContainer).toBeVisible();
    await expect(readmeContainer).toContainText('Developer Year Clock');

    // Switch back to Interactive Canvas
    const canvasTab = page.getByRole('tab', { name: /Interactive Canvas/i });
    await canvasTab.click();
    await expect(canvasTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('canvas').first()).toBeVisible();

    // Verify Download SVG triggers a file download
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: /Download SVG/i }).click(),
    ]);
    expect(download.suggestedFilename()).toBe('monoforge-year-clock-octocat-cyberpunk.svg');
  });
});
