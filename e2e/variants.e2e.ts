import { test, expect } from '@playwright/test'

// The task's headline behavior: each variant has its own count, the card stepper
// is bound to the active variant, and the review keeps every count>0 as its own line.
test('per-variant quantities + card stepper bound to active variant', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('heading', { name: 'Your security system' }).waitFor()
  await page.evaluate(() => localStorage.clear())
  await page.reload()
  await page.getByRole('heading', { name: 'Your security system' }).waitFor()

  // Scope to the Wyze Cam v4 product card (multi-variant: White / Grey / Black).
  const card = page
    .locator('div.relative')
    .filter({ has: page.getByRole('heading', { name: 'Wyze Cam v4' }) })
    .first()

  // White is the seeded active variant at qty 1 → bump it to 2.
  await card.getByRole('button', { name: 'Increase quantity' }).click()
  await expect(card.getByText('2', { exact: true })).toBeVisible()

  // Switch the active variant to Black.
  await card.getByRole('button', { name: 'Select Black' }).click()

  // The card stepper now reflects BLACK's count (0), not White's 2.
  await expect(card.getByText('0', { exact: true })).toBeVisible()

  // White ×2 is untouched and still shows as its own line in the review panel.
  await expect(page.getByText('Wyze Cam v4 — White').first()).toBeVisible()

  // Black has no review line yet (count is 0).
  await expect(page.getByText('Wyze Cam v4 — Black')).toHaveCount(0)
})
