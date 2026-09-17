import { test, expect } from '@playwright/test';
import { BASE_URL } from '../helpers/auth';

// Session sudah di-inject via storageState dari auth.setup.ts

test('Profile - navbar tidak menampilkan tombol Login', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('button', { name: 'Login' })).toHaveCount(0, { timeout: 10000 });
});

test('Profile Individual - halaman tampil setelah login', async ({ page }) => {
  await page.goto(`${BASE_URL}/#/individual`);
  await page.waitForLoadState('networkidle');

  await expect(page.getByPlaceholder('Input email address')).toHaveCount(0, { timeout: 5000 });
  await expect(page.locator('body')).toBeVisible();
});

test('Profile Company - halaman tampil setelah login', async ({ page }) => {
  await page.goto(`${BASE_URL}/#/company`);
  await page.waitForLoadState('networkidle');

  await expect(page.getByPlaceholder('Input email address')).toHaveCount(0, { timeout: 5000 });
  await expect(page.locator('body')).toBeVisible();
});

test('Passenger - halaman tampil setelah login', async ({ page }) => {
  await page.goto(`${BASE_URL}/#/passenger`);
  await page.waitForLoadState('networkidle');

  await expect(page.getByPlaceholder('Input email address')).toHaveCount(0, { timeout: 5000 });
  await expect(page.locator('body')).toBeVisible();
});

test('Guest - halaman tampil setelah login', async ({ page }) => {
  await page.goto(`${BASE_URL}/#/guest`);
  await page.waitForLoadState('networkidle');

  await expect(page.getByPlaceholder('Input email address')).toHaveCount(0, { timeout: 5000 });
  await expect(page.locator('body')).toBeVisible();
});

test('Change Password - halaman tampil setelah login', async ({ page }) => {
  await page.goto(`${BASE_URL}/#/change-password`);
  await page.waitForLoadState('networkidle');

  await expect(page.getByPlaceholder('Input email address')).toHaveCount(0, { timeout: 5000 });
  await expect(page.locator('body')).toBeVisible();
});

test('Push Notification - halaman tampil setelah login', async ({ page }) => {
  await page.goto(`${BASE_URL}/#/push-notification`);
  await page.waitForLoadState('networkidle');

  await expect(page.getByPlaceholder('Input email address')).toHaveCount(0, { timeout: 5000 });
  await expect(page.locator('body')).toBeVisible();
});

test('Notification - halaman tampil setelah login', async ({ page }) => {
  await page.goto(`${BASE_URL}/#/notification`);
  await page.waitForLoadState('networkidle');

  await expect(page.getByPlaceholder('Input email address')).toHaveCount(0, { timeout: 5000 });
  await expect(page.locator('body')).toBeVisible();
});

test('Edit Profile - halaman tampil setelah login', async ({ page }) => {
  await page.goto(`${BASE_URL}/#/profile`);
  await page.waitForLoadState('networkidle');

  await expect(page.getByPlaceholder('Input email address')).toHaveCount(0, { timeout: 5000 });
  await expect(page.locator('body')).toBeVisible();
});

test('Refund - halaman tampil setelah login', async ({ page }) => {
  await page.goto(`${BASE_URL}/#/refund`);
  await page.waitForLoadState('networkidle');

  await expect(page.getByPlaceholder('Input email address')).toHaveCount(0, { timeout: 5000 });
  await expect(page.locator('body')).toBeVisible();
});

test('Rating - halaman tampil setelah login', async ({ page }) => {
  await page.goto(`${BASE_URL}/#/rating`);
  await page.waitForLoadState('networkidle');

  await expect(page.getByPlaceholder('Input email address')).toHaveCount(0, { timeout: 5000 });
  await expect(page.locator('body')).toBeVisible();
});
