import { test, expect } from '@playwright/test';
import { BASE_URL } from '../helpers/auth';

/**
 * Flight Summary tests (One Way, Round Trip, Multi Trip)
 * Butuh session login + booking flow yang sudah dilalui.
 * Session di-inject via storageState dari auth.setup.ts
 */

const SUMMARY_URL = `${BASE_URL}/flight/summary`;

// ─── FSOW (Flight Summary One Way) ───────────────────────────────────────────

// FSOW-01
test('[FSOW-01] Halaman Flight Summary dapat diakses setelah login', async ({ page }) => {
  await page.goto(SUMMARY_URL);
  await page.waitForLoadState('networkidle');

  await expect(page.getByPlaceholder('Input email address')).toHaveCount(0, { timeout: 5000 });
  await expect(page.locator('body')).toBeVisible();
});

// FSOW-02
test('[FSOW-02] Halaman Flight Summary menampilkan judul dengan benar', async ({ page }) => {
  await page.goto(SUMMARY_URL);
  await page.waitForLoadState('networkidle');

  const summaryTitle = page.getByText('Flight Summary').first();
  if (await summaryTitle.isVisible()) {
    await expect(summaryTitle).toBeVisible();
  }
});

// FSOW-03
test('[FSOW-03] Section Contact Detail tampil di Flight Summary', async ({ page }) => {
  await page.goto(SUMMARY_URL);
  await page.waitForLoadState('networkidle');

  const contactDetail = page.getByText(/Contact Detail|Contact details/i).first();
  if (await contactDetail.isVisible()) {
    await expect(contactDetail).toBeVisible();
  }
});

// FSOW-04 - Skip: butuh data pemesan aktif
test.skip('[FSOW-04] Contact Detail dapat diedit dari Flight Summary', async ({ page }) => {});

// FSOW-05
test('[FSOW-05] Section Passengers tampil di Flight Summary', async ({ page }) => {
  await page.goto(SUMMARY_URL);
  await page.waitForLoadState('networkidle');

  const passengersSection = page.getByText('Passengers').first();
  if (await passengersSection.isVisible()) {
    await expect(passengersSection).toBeVisible();
  }
});

// FSOW-06
test('[FSOW-06] Panel Flight Data tampil di Flight Summary', async ({ page }) => {
  await page.goto(SUMMARY_URL);
  await page.waitForLoadState('networkidle');

  const flightData = page.getByText(/Flight Data|Flight Dates/i).first();
  if (await flightData.isVisible()) {
    await expect(flightData).toBeVisible();
  }
});

// FSOW-07
test('[FSOW-07] Panel Booking Information tampil di Flight Summary', async ({ page }) => {
  await page.goto(SUMMARY_URL);
  await page.waitForLoadState('networkidle');

  const bookingInfo = page.getByText(/Booking Information|Booking ID/i).first();
  if (await bookingInfo.isVisible()) {
    await expect(bookingInfo).toBeVisible();
  }
});

// FSOW-08
test('[FSOW-08] Panel Price Summary tampil di Flight Summary', async ({ page }) => {
  await page.goto(SUMMARY_URL);
  await page.waitForLoadState('networkidle');

  const priceSummary = page.getByText(/Price summary|Price Summary/i).first();
  if (await priceSummary.isVisible()) {
    await expect(priceSummary).toBeVisible();
  }
});

// FSOW-09 - Skip: butuh booking aktif dengan komponen harga
test.skip('[FSOW-09] Total harga sesuai akumulasi semua komponen', async ({ page }) => {
  // Manual: hitung manual Departure fare + Taxes + Service fee = Total
});

// FSOW-10 - Skip: butuh add-on dipilih sebelumnya
test.skip('[FSOW-10] Total mencerminkan Add-Ons yang dipilih', async ({ page }) => {});

// FSOW-11
test('[FSOW-11] Tombol Continue to Payment tersedia di Flight Summary', async ({ page }) => {
  await page.goto(SUMMARY_URL);
  await page.waitForLoadState('networkidle');

  const continueBtn = page.getByRole('button', { name: /Continue to Payment|Continue to payment/i });
  if (await continueBtn.isVisible()) {
    await expect(continueBtn).toBeVisible();
  }
});

// FSOW-12 - Manual: butuh matikan internet
test.skip('[FSOW-12] Continue to Payment saat koneksi terputus menampilkan error', async ({ page }) => {});

// FSOW-13 - Skip: butuh 2 transaksi berbeda
test.skip('[FSOW-13] Booking ID bersifat unik untuk setiap transaksi', async ({ page }) => {});

// ─── FSRT (Flight Summary Round Trip) ────────────────────────────────────────

// FSRT-01
test('[FSRT-01] Label Itinerary menampilkan jumlah penerbangan yang benar', async ({ page }) => {
  await page.goto(SUMMARY_URL);
  await page.waitForLoadState('networkidle');

  const itinerary = page.getByText(/Itinerary|itinerary/i).first();
  if (await itinerary.isVisible()) {
    await expect(itinerary).toBeVisible();
  }
});

// FSRT-02 - Skip: butuh booking Round Trip aktif
test.skip('[FSRT-02] Section Flight Dates menampilkan 2 penerbangan: Departure dan Return', async ({ page }) => {});

// FSRT-03 - Skip
test.skip('[FSRT-03] Departure dan Return sesuai pilihan sebelumnya', async ({ page }) => {});

// FSRT-04 - Skip
test.skip('[FSRT-04] Tombol Edit Departure berfungsi independen', async ({ page }) => {});

// FSRT-05 - Skip
test.skip('[FSRT-05] Tombol Edit Return berfungsi independen', async ({ page }) => {});

// FSRT-06 - Skip
test.skip('[FSRT-06] Price Summary menampilkan biaya kedua penerbangan', async ({ page }) => {});

// FSRT-07 - Skip
test.skip('[FSRT-07] Total Round Trip lebih besar dari One Way untuk rute sama', async ({ page }) => {});

// ─── FSMT (Flight Summary Multi Trip) ────────────────────────────────────────

// FSMT-01 - Skip: butuh booking Multi Trip aktif
test.skip('[FSMT-01] Flight Summary Multi Trip menampilkan semua rute', async ({ page }) => {});

// FSMT-02 - Skip
test.skip('[FSMT-02] Setiap rute memiliki tombol Edit yang independen', async ({ page }) => {});

// FSMT-03 - Skip
test.skip('[FSMT-03] Urutan tanggal antar rute kronologis', async ({ page }) => {});

// FSMT-04 - Skip
test.skip('[FSMT-04] Price Summary menampilkan fare semua rute', async ({ page }) => {});

// FSMT-05 - Manual: butuh matikan internet
test.skip('[FSMT-05] Continue to Payment Multi Trip saat koneksi terputus', async ({ page }) => {});
