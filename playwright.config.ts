import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export const AUTH_FILE = path.join(__dirname, '.auth/user.json');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    trace: 'on-first-retry',
  },

  projects: [
    // ── Setup project: login sekali, simpan session ──────────────────
    {
      name: 'setup',
      testMatch: '**/auth.setup.ts',
      use: { ...devices['Desktop Chrome'], channel: 'chrome', headless: false },
    },

    // ── CMS tests (tidak perlu web auth) ────────────────────────────
    {
      name: 'CMS',
      testMatch: '**/tests/CMS/**/*.spec.ts',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },

    // ── Web tests: Login / Register / Reset tidak butuh auth ─────────
    {
      name: 'web-no-auth',
      testMatch: [
        '**/tests/web/Login/**/*.spec.ts',
        '**/tests/web/Register/**/*.spec.ts',
        '**/tests/web/ResetPassword/**/*.spec.ts',
        '**/tests/web/Home/**/*.spec.ts',
        '**/tests/web/StaticPages/**/*.spec.ts',
        '**/tests/web/FlightSearch/**/*.spec.ts',
      ],
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },

    // ── Web tests yang butuh login ───────────────────────────────────
    {
      name: 'web-auth',
      testMatch: [
        '**/tests/web/MyFlightBooking/**/*.spec.ts',
        '**/tests/web/MyHotelBooking/**/*.spec.ts',
        '**/tests/web/Profile/**/*.spec.ts',
        '**/tests/web/HasilPencarian/**/*.spec.ts',
        '**/tests/web/ReviewFlight/**/*.spec.ts',
        '**/tests/web/DataPemesan/**/*.spec.ts',
        '**/tests/web/FlightSummary/**/*.spec.ts',
        '**/tests/web/Payment/**/*.spec.ts',
      ],
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        storageState: AUTH_FILE,
      },
      dependencies: ['setup'],
    },
  ],
});
