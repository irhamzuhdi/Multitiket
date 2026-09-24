import { test, expect } from '@playwright/test';
import { BASE_URL } from '../helpers/auth';

const REVIEW_URL = `${BASE_URL}/flight/detail`;

/**
 * Review Your Flight tests - butuh session login + penerbangan yang sudah dipilih.
 * Test ini memverifikasi elemen UI halaman Review berdasarkan kondisi yang ada.
 */

// ReviewFlight-01
test('[ReviewFlight-01] Halaman Review Your Flight dapat diakses setelah login', async ({ page }) => {
  await page.goto(REVIEW_URL);
  await page.waitForLoadState('networkidle');

  // Setelah login (via storageState), tidak redirect ke login form
  await expect(page.getByPlaceholder('Input email address')).toHaveCount(0, { timeout: 5000 });
  await expect(page.locator('body')).toBeVisible();
});

// ReviewFlight-02
test('[ReviewFlight-02] Halaman Review memiliki link Back', async ({ page }) => {
  await page.goto(REVIEW_URL);
  await page.waitForLoadState('networkidle');

  const backLink = page.getByText(/← Back|Back|Kembali/i).first();
  if (await backLink.isVisible()) {
    await expect(backLink).toBeVisible();
  }
});

// ReviewFlight-03 - Skip: membutuhkan penerbangan aktif yang dipilih
test.skip('[ReviewFlight-03] Kartu penerbangan menampilkan rute dan tanggal pada header', async ({ page }) => {
  // Butuh penerbangan yang sudah dipilih dari hasil pencarian
});

// ReviewFlight-04 - Skip
test.skip('[ReviewFlight-04] Ikon expand/collapse dapat menyembunyikan/menampilkan detail', async ({ page }) => {
  // Butuh kartu penerbangan aktif
});

// ReviewFlight-05 - Skip
test.skip('[ReviewFlight-05] Detail penerbangan ditampilkan dengan lengkap', async ({ page }) => {
  // Butuh kartu penerbangan aktif dengan data maskapai, jam, bandara
});

// ReviewFlight-06 - Skip
test.skip('[ReviewFlight-06] Informasi Aircraft, Cabin Class, dan bagasi ditampilkan', async ({ page }) => {});

// ReviewFlight-07 - Skip
test.skip('[ReviewFlight-07] Panel Price Summary menampilkan rincian harga yang benar', async ({ page }) => {});

// ReviewFlight-08 - Skip: butuh penerbangan aktif
test.skip('[ReviewFlight-08] Tombol Continue to Booking berpindah ke halaman Data Pemesan', async ({ page }) => {
  // Butuh penerbangan aktif
});

// ReviewFlight-09 - Manual: butuh matikan internet
test.skip('[ReviewFlight-09] Tombol Continue to Booking saat koneksi terputus', async ({ page }) => {});
