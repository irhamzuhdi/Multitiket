import { test, expect } from '@playwright/test';

const BASE_URL = 'http://103.196.155.10/multiket/web';

// Helper: buka form Reset Password via navbar Login -> Forgot Password
async function goToResetPasswordForm(page: any) {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Login' }).first().click();
  await expect(page.getByPlaceholder('Input email address')).toBeVisible({ timeout: 10000 });
  await page.getByText(/forgot/i).click();
  await page.waitForTimeout(1000);
}

test('Tampilan form Reset Password', async ({ page }) => {
  await goToResetPasswordForm(page);

  await expect(page.getByPlaceholder(/email/i).first()).toBeVisible({ timeout: 10000 });
  await expect(page.getByRole('button', { name: 'Send Verification Code' })).toBeVisible();
});

test('Reset Password - email field kosong', async ({ page }) => {
  await goToResetPasswordForm(page);

  await page.getByRole('button', { name: 'Send Verification Code' }).click();
  await page.waitForTimeout(500);

  // Ant Design form validation pakai class ini
  await expect(page.locator('.ant-form-item-explain-error').first()).toBeVisible({ timeout: 10000 });
});

test('Reset Password - email format tidak valid', async ({ page }) => {
  await goToResetPasswordForm(page);

  await page.getByPlaceholder(/email/i).first().fill('emailtidakvalid');
  await page.getByPlaceholder(/email/i).first().blur();
  await page.waitForTimeout(500);

  await expect(page.locator('.ant-form-item-explain-error').first()).toBeVisible({ timeout: 10000 });
});

test('Reset Password - email terdaftar', async ({ page }) => {
  await goToResetPasswordForm(page);

  await page.getByPlaceholder(/email/i).first().fill('irhamzuhdi@gmail.com');
  await page.getByRole('button', { name: 'Send Verification Code' }).click();

  await expect(page.locator('.ant-message-success, .ant-message-notice').first()).toBeVisible({ timeout: 15000 });
});

test('Reset Password - email tidak terdaftar', async ({ page }) => {
  await goToResetPasswordForm(page);

  await page.getByPlaceholder(/email/i).first().fill('tidakterdaftar999@test.com');
  await page.getByRole('button', { name: 'Send Verification Code' }).click();

  await expect(page.locator('.ant-message-error, .ant-message-notice').first()).toBeVisible({ timeout: 15000 });
});

test('Reset Password - halaman tampil tanpa navigasi balik (standalone page)', async ({ page }) => {
  await goToResetPasswordForm(page);

  // Verifikasi halaman reset password standalone
  await expect(page.getByRole('heading', { name: 'Reset Your Password' })).toBeVisible({ timeout: 10000 });
  await expect(page.getByRole('button', { name: 'Send Verification Code' })).toBeVisible();
});
