import { test, expect } from '@playwright/test'

// Key breakpoints: mobile → large phone → tablet → small desktop → side-by-side
// threshold → primary desktop → ultrawide.
const VIEWPORTS = [375, 414, 768, 1024, 1280, 1440, 1920]

for (const width of VIEWPORTS) {
  test(`@${width}px — no overflow + snapshot`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('/')

    // Wait for the review panel to render so the layout is settled.
    await page.getByRole('heading', { name: 'Your security system' }).waitFor()

    // 1) Human-viewable full-page screenshot first, so we always get images
    //    even if an assertion below fails.
    await page.screenshot({ path: `e2e/screenshots/${width}.png`, fullPage: true })

    // 2) Regression guard: no horizontal overflow (nothing pushed off-screen).
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }))
    expect(
      scrollWidth,
      `horizontal overflow at ${width}px (scrollWidth ${scrollWidth} > clientWidth ${clientWidth})`,
    ).toBeLessThanOrEqual(clientWidth + 1)

    // 3) Visual-regression baseline/diff. First run creates the baseline;
    //    later runs fail if anything shifts. Update baselines with --update-snapshots.
    await expect(page).toHaveScreenshot(`page-${width}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    })
  })
}
