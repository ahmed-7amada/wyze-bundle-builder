import { defineConfig, devices } from '@playwright/test'

// ──────────────────────────────────────────────────────────────────────────
// Responsive / visual-regression harness. Fully self-contained under e2e/.
// Uses the *.e2e.ts extension so it never collides with the Vitest unit tests.
// ──────────────────────────────────────────────────────────────────────────
export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.e2e.ts',
  outputDir: 'e2e/test-results',
  reporter: [['html', { outputFolder: 'e2e/report', open: 'never' }]],
  use: {
    baseURL: 'http://localhost:5173',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 120_000,
  },
})
