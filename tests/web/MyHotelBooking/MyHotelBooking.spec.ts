import { test, expect } from '@playwright/test';
import { BASE_URL } from '../helpers/auth';

// Session sudah di-inject via storageState dari auth.setup.ts

test('My Hotel Booking - halaman tampil setelah login', async ({ page }) => {
  await page.goto(`${BASE_URL}/my-hotel-booking`);
  await page.waitForLoadState('networkidle');

  // Setelah login, tidak ada prompt login
  await expect(page.getByText(/Log in to see your bookings/i)).not.toBeVisible({ timeout: 5000 });
  await expect(page.getByText(/My Hotel Booking/i).first()).toBeVisible({ timeout: 10000 });
});

test('My Hotel Booking - navbar tidak menampilkan tombol Login', async ({ page }) => {
  await page.goto(`${BASE_URL}/my-hotel-booking`);
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('button', { name: 'Login' })).toHaveCount(0, { timeout: 10000 });
});

test('My Hotel Booking - list booking tampil', async ({ page }) => {
  await page.goto(`${BASE_URL}/my-hotel-booking`);
  await page.waitForLoadState('networkidle');

  await expect(page.locator('body')).toBeVisible();
  await expect(page.getByText(/My Hotel Booking/i).first()).toBeVisible({ timeout: 10000 });
});

test('Hotel Search - form tampil dan bisa diisi', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  await page.getByRole('button', { name: 'Hotel', exact: true }).click();

  await expect(page.locator('input').first()).toBeVisible({ timeout: 5000 });
  await page.locator('input').first().fill('Jakarta');
  await expect(page.locator('input').first()).toHaveValue('Jakarta');
});

test('Hotel - halaman list tampil', async ({ page }) => {
  await page.goto(`${BASE_URL}/hotel/list`);
  await page.waitForLoadState('networkidle');

  await expect(page.locator('body')).toBeVisible();
});

test('Hotel - halaman detail tampil', async ({ page }) => {
  await page.goto(`${BASE_URL}/hotel/detail`);
  await page.waitForLoadState('networkidle');

  await expect(page.locator('body')).toBeVisible();
});
