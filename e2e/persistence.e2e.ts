import { test, expect } from '@playwright/test'

const KEY = 'wyze-bundle-builder:v1'

test('explicit Save persists the config and it survives a reload', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('heading', { name: 'Your security system' }).waitFor()
  await page.evaluate((k) => localStorage.removeItem(k), KEY)
  await page.reload()
  await page.getByRole('heading', { name: 'Your security system' }).waitFor()

  // Seeded total is present; nothing saved yet.
  await expect(page.getByText('$187.89').first()).toBeVisible()
  expect(await page.evaluate((k) => localStorage.getItem(k), KEY)).toBeNull()

  // Change a quantity → total moves off the seed value.
  await page.getByRole('button', { name: 'Increase quantity' }).first().click()
  await expect(page.getByText('$187.89')).toHaveCount(0)

  // Save → confirmation + localStorage written.
  await page.locator('a:has-text("Save my system for later"):visible').click()
  await expect(page.locator('a:has-text("Saved!"):visible')).toBeVisible()
  const saved = await page.evaluate((k) => localStorage.getItem(k), KEY)
  expect(saved).toBeTruthy()
  expect(saved!).toContain('"quantities"')

  // Reload → state is hydrated from storage (still NOT the seed total).
  await page.reload()
  await page.getByRole('heading', { name: 'Your security system' }).waitFor()
  expect(await page.evaluate((k) => localStorage.getItem(k), KEY)).toBe(saved)
  await expect(page.getByText('$187.89')).toHaveCount(0)
})

test('without Save, changes are discarded on reload (explicit-save model)', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('heading', { name: 'Your security system' }).waitFor()
  await page.evaluate((k) => localStorage.removeItem(k), KEY)
  await page.reload()
  await page.getByRole('heading', { name: 'Your security system' }).waitFor()

  await page.getByRole('button', { name: 'Increase quantity' }).first().click()
  await expect(page.getByText('$187.89')).toHaveCount(0)

  // Do NOT save; reload → back to the seed.
  await page.reload()
  await page.getByRole('heading', { name: 'Your security system' }).waitFor()
  await expect(page.getByText('$187.89').first()).toBeVisible()
})
