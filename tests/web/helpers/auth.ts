/**
 * Helper untuk navigasi yang butuh auth.
 * Session sudah di-inject via storageState dari auth.setup.ts,
 * jadi tidak perlu login ulang di setiap test.
 */

export const BASE_URL = 'http://103.196.155.10/multiket/web';
export const VALID_EMAIL = 'irhamzuhdi@gmail.com';
export const VALID_PASSWORD = 'A@dmin12345';

/**
 * Buka halaman dan tunggu hingga navbar authenticated tampil.
 * Gunakan ini di test yang butuh login.
 */
export async function gotoAuthenticated(page: any, path = '') {
  await page.goto(`${BASE_URL}/${path}`);
  await page.waitForLoadState('networkidle');
  // Verifikasi session aktif — navbar user icon atau tidak ada tombol Login
  // Jika masih ada tombol Login, berarti session belum valid
}

/**
 * Verifikasi user sudah login dengan cek tidak ada tombol "Login" di navbar
 * atau ada elemen yang hanya muncul saat authenticated.
 */
export async function expectAuthenticated(page: any) {
  const { expect } = await import('@playwright/test');
  // Setelah login, navbar menampilkan ikon user / profile, bukan tombol Login
  await expect(page.getByRole('button', { name: 'Login' })).toHaveCount(0, { timeout: 10000 });
}
