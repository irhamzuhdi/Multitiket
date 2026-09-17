import { test as setup, expect } from '@playwright/test';
import path from 'path';

export const AUTH_FILE = path.join(__dirname, '../../.auth/user.json');

const BASE_URL = 'http://103.196.155.10/multiket/web';
const VALID_EMAIL = 'irhamzuhdi@gmail.com';
const VALID_PASSWORD = 'A@dmin12345';

setup('authenticate', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  // Klik Login di navbar
  await page.getByRole('button', { name: 'Login' }).first().click();
  await expect(page.getByPlaceholder('Input email address')).toBeVisible({ timeout: 10000 });

  // Isi credentials
  await page.getByPlaceholder('Input email address').fill(VALID_EMAIL);
  await page.getByPlaceholder('Input Password').fill(VALID_PASSWORD);
  await page.locator('form').getByRole('button', { name: 'Login' }).click();

  // Tunggu OTP modal muncul
  await expect(page.getByText('Verifikasi Akun')).toBeVisible({ timeout: 15000 });

  console.log('\n========================================');
  console.log('⏳  Silakan input OTP yang dikirim ke email:');
  console.log(`    ${VALID_EMAIL}`);
  console.log('    Setelah input OTP, klik tombol "Verification"');
  console.log('========================================\n');

  // Pause — kamu input OTP manual di browser yang terbuka
  await page.pause();

  // Setelah OTP berhasil, tunggu redirect ke home
  await expect(page.getByRole('button', { name: 'My Flight Booking' })).toBeVisible({ timeout: 30000 });

  console.log('✅  Login berhasil! Session disimpan.\n');

  // Simpan session (cookies + localStorage)
  await page.context().storageState({ path: AUTH_FILE });
});
