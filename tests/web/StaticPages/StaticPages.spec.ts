import { test, expect } from '@playwright/test';

const BASE_URL = 'http://103.196.155.10/multiket/web';

test('Footer - Help Center link tampil', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('link', { name: 'Help Center' })).toBeVisible({ timeout: 10000 });
});

test('Footer - Contact link tampil', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible({ timeout: 10000 });
});

test('Footer - FAQ link tampil', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('link', { name: 'FAQ' })).toBeVisible({ timeout: 10000 });
});

test('Footer - Terms link tampil', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('link', { name: 'Terms' })).toBeVisible({ timeout: 10000 });
});

test('Footer - Privacy link tampil', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('link', { name: 'Privacy' })).toBeVisible({ timeout: 10000 });
});

test('Articles - section tampil di home', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  await expect(page.getByText(/Articles/i).first()).toBeVisible({ timeout: 10000 });
  await expect(page.getByText(/View All Articles/i)).toBeVisible();
});

test('Articles - View All Articles bisa diklik', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  await page.getByText(/View All Articles/i).click();
  await page.waitForLoadState('networkidle');

  await expect(page.locator('body')).toBeVisible({ timeout: 5000 });
});
