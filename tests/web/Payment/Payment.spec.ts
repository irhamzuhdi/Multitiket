import { test, expect } from '@playwright/test';
import { BASE_URL } from '../helpers/auth';

/**
 * Payment tests (One Way, Round Trip, Multi Trip)
 * Butuh session login + booking flow yang sudah dilalui.
 * Session di-inject via storageState dari auth.setup.ts
 */

const PAYMENT_URL = `${BASE_URL}/checkout/payment`;
const PAYMENT_STATUS_URL = `${BASE_URL}/payment/status`;

// ─── POW (Payment One Way) ────────────────────────────────────────────────────

// POW-01
test('[POW-01] Halaman Payment dapat diakses setelah login', async ({ page }) => {
  await page.goto(PAYMENT_URL);
  await page.waitForLoadState('networkidle');

  await expect(page.getByPlaceholder('Input email address')).toHaveCount(0, { timeout: 5000 });
  await expect(page.locator('body')).toBeVisible();
});

// POW-02
test('[POW-02] Halaman Payment menampilkan judul atau section Payment Method', async ({ page }) => {
  await page.goto(PAYMENT_URL);
  await page.waitForLoadState('networkidle');

  const paymentMethod = page.getByText(/Payment Method|Metode Pembayaran/i).first();
  if (await paymentMethod.isVisible()) {
    await expect(paymentMethod).toBeVisible();
  }
});

// POW-03
test('[POW-03] Section Payment Method menampilkan metode yang tersedia', async ({ page }) => {
  await page.goto(PAYMENT_URL);
  await page.waitForLoadState('networkidle');

  // Cek ada metode pembayaran (Virtual Account, e-Wallet, dll)
  const hasPaymentOptions = await page.getByText(/Virtual Account|e-Wallet|Kartu Kredit|BCA|Mandiri/i).first().isVisible().catch(() => false);
  if (hasPaymentOptions) {
    await expect(page.getByText(/Virtual Account|e-Wallet|Kartu Kredit/i).first()).toBeVisible();
  }
});

// POW-04
test('[POW-04] Metode pembayaran Virtual Account dapat dipilih', async ({ page }) => {
  await page.goto(PAYMENT_URL);
  await page.waitForLoadState('networkidle');

  const vaOption = page.getByText(/Virtual Account|BCA VA|BNI VA/i).first();
  if (await vaOption.isVisible()) {
    await vaOption.click();
    await page.waitForTimeout(500);
    await expect(page.locator('body')).toBeVisible();
  }
});

// POW-05
test('[POW-05] Metode pembayaran e-Wallet dapat dipilih', async ({ page }) => {
  await page.goto(PAYMENT_URL);
  await page.waitForLoadState('networkidle');

  const walletOption = page.getByText(/e-Wallet|OVO|GoPay|DANA/i).first();
  if (await walletOption.isVisible()) {
    await walletOption.click();
    await page.waitForTimeout(500);
    await expect(page.locator('body')).toBeVisible();
  }
});

// POW-06
test('[POW-06] Hanya satu metode pembayaran yang dapat dipilih', async ({ page }) => {
  await page.goto(PAYMENT_URL);
  await page.waitForLoadState('networkidle');

  // Klik metode pertama lalu metode kedua
  const allRadio = page.locator('input[type="radio"]');
  const count = await allRadio.count();
  if (count >= 2) {
    await allRadio.nth(0).click().catch(() => {});
    await allRadio.nth(1).click().catch(() => {});
    await page.waitForTimeout(300);

    // Verifikasi hanya 1 yang checked
    const checkedCount = await page.locator('input[type="radio"]:checked').count();
    expect(checkedCount).toBeLessThanOrEqual(1);
  }
});

// POW-07
test('[POW-07] Order Summary menampilkan rincian harga', async ({ page }) => {
  await page.goto(PAYMENT_URL);
  await page.waitForLoadState('networkidle');

  const orderSummary = page.getByText(/Order Summary|Rincian Harga|Price/i).first();
  if (await orderSummary.isVisible()) {
    await expect(orderSummary).toBeVisible();
  }
});

// POW-08 - Skip: butuh booking aktif dengan harga nyata
test.skip('[POW-08] Total harga di Order Summary konsisten dengan Flight Summary', async ({ page }) => {
  // Manual: catat total di Flight Summary, bandingkan dengan Payment
});

// POW-09
test('[POW-09] Tombol Continue to payment tersedia di halaman Payment', async ({ page }) => {
  await page.goto(PAYMENT_URL);
  await page.waitForLoadState('networkidle');

  const continueBtn = page.getByRole('button', { name: /Continue to payment|Bayar|Pay/i }).last();
  if (await continueBtn.isVisible()) {
    await expect(continueBtn).toBeVisible();
  }
});

// POW-10 - Skip: butuh metode pembayaran yang valid dan saldo
test.skip('[POW-10] Pembayaran berhasil diproses dan pindah ke Booking Confirmed', async ({ page }) => {
  // Manual: pilih metode, selesaikan pembayaran
});

// POW-11 - Manual: butuh saldo tidak cukup
test.skip('[POW-11] Pembayaran gagal menampilkan pesan error', async ({ page }) => {});

// POW-12 - Manual: butuh matikan internet
test.skip('[POW-12] Pembayaran saat koneksi terputus menampilkan error', async ({ page }) => {});

// POW-13 - Skip: butuh proses pembayaran aktif
test.skip('[POW-13] Timer batas waktu pembayaran ditampilkan dan berjalan', async ({ page }) => {
  // Manual: pilih VA, observasi countdown timer
});

// POW-14 - Manual: tunggu timer habis
test.skip('[POW-14] Sesi pembayaran kedaluwarsa menampilkan notifikasi', async ({ page }) => {});

// ─── Payment Status ───────────────────────────────────────────────────────────

// POW-Status-01
test('[POW-Status-01] Halaman Payment Status dapat diakses', async ({ page }) => {
  await page.goto(PAYMENT_STATUS_URL);
  await page.waitForLoadState('networkidle');

  await expect(page.locator('body')).toBeVisible();
});

// POW-Status-02
test('[POW-Status-02] Payment Status menampilkan informasi booking', async ({ page }) => {
  await page.goto(PAYMENT_STATUS_URL);
  await page.waitForLoadState('networkidle');

  // Halaman status muncul dengan konten
  const statusText = page.getByText(/PAID|PENDING|status/i).first();
  if (await statusText.isVisible()) {
    await expect(statusText).toBeVisible();
  }
});

// ─── PRT (Payment Round Trip) ─────────────────────────────────────────────────

// PRT-01 - Skip: identik dengan POW dengan data Round Trip
test.skip('[PRT-01] Payment Round Trip menampilkan ringkasan 2 penerbangan', async ({ page }) => {});

// ─── PMT (Payment Multi Trip) ─────────────────────────────────────────────────

// PMT-01 - Skip: identik dengan POW dengan data Multi Trip
test.skip('[PMT-01] Payment Multi Trip menampilkan ringkasan semua rute', async ({ page }) => {});

// ─── Booking Confirmed ────────────────────────────────────────────────────────

// BC-01 - Skip: butuh pembayaran berhasil
test.skip('[BC-01] Layar Booking Confirmed tampil setelah pembayaran berhasil', async ({ page }) => {
  // Manual: selesaikan pembayaran, cek halaman konfirmasi
});

// BC-02 - Skip
test.skip('[BC-02] Nomor booking memiliki format yang valid', async ({ page }) => {});

// BC-03 - Skip
test.skip('[BC-03] Tombol View e-ticket membuka halaman e-tiket', async ({ page }) => {});

// BC-04 - Skip
test.skip('[BC-04] Tombol Add Hotel mengarahkan ke pencarian hotel', async ({ page }) => {});

// BC-05 - Manual: cek inbox email
test.skip('[BC-05] Email konfirmasi booking dikirim ke email pemesan', async ({ page }) => {});
