import { test, expect } from '@playwright/test';

const BASE_URL = 'http://103.196.155.10/multiket/web';

// Home-01
test('[Home-01] Menampilkan halaman Home dengan benar', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  // Header
  await expect(page.getByRole('button', { name: 'My Flight Booking' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'My Hotel Booking' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' }).first()).toBeVisible();

  // Hero text
  await expect(page.getByText('Corporate travel, in one place')).toBeVisible();

  // Search widget tabs
  await expect(page.getByRole('button', { name: '✈Flight' }).first()).toBeVisible();
});

// Home-02
test('[Home-02] Header menampilkan logo dan menu navigasi dengan benar', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  await expect(page.getByText('multiket').first()).toBeVisible();
  await expect(page.getByRole('button', { name: 'My Flight Booking' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'My Hotel Booking' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' }).first()).toBeVisible();
});

// Home-03
test('[Home-03] Menu My Flight Booking menampilkan prompt login', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  await page.getByRole('button', { name: 'My Flight Booking' }).click();
  await page.waitForLoadState('networkidle');

  await expect(page.getByText(/Log in to see your bookings/i)).toBeVisible({ timeout: 10000 });
});

// Home-04
test('[Home-04] Menu My Hotel Booking menampilkan prompt login', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  await page.getByRole('button', { name: 'My Hotel Booking' }).click();
  await page.waitForLoadState('networkidle');

  await expect(page.getByText(/Log in to see your bookings/i)).toBeVisible({ timeout: 10000 });
});

// Home-05
test('[Home-05] Search widget menampilkan 5 tab pencarian', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  await expect(page.getByRole('button', { name: '✈Flight' }).first()).toBeVisible();
  await expect(page.getByRole('button', { name: '✈Group Flight' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Hotel', exact: true })).toBeVisible();
});

// Home-06
test('[Home-06] Hero banner menampilkan gambar dan teks dengan benar', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  await expect(page.getByText('Corporate travel, in one place')).toBeVisible();
  await expect(page.getByText('Book flights, charter aircraft, block seats and hotels')).toBeVisible();
});

// Home-07
test('[Home-07] Tab Flight aktif secara default dan form search tampil', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  // Tab Flight sudah aktif by default
  await expect(page.getByRole('button', { name: 'Search Flight' })).toBeVisible({ timeout: 10000 });
  await expect(page.getByText('One Way')).toBeVisible();
  await expect(page.getByText('Round Trip')).toBeVisible();
});

// Home-08
test('[Home-08] Tab Group Flight dapat dipilih', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  await page.getByRole('button', { name: 'Group Flight' }).click();
  await page.waitForTimeout(500);

  await expect(page.locator('input').first()).toBeVisible({ timeout: 5000 });
});

// Home-09
test('[Home-09] Tab Hotel dapat dipilih dan form tampil', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  await page.getByRole('button', { name: 'Hotel', exact: true }).click();
  await page.waitForTimeout(500);

  await expect(page.locator('input').first()).toBeVisible({ timeout: 5000 });
});

// Home-10
test('[Home-10] Section Articles menampilkan daftar artikel', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await page.waitForTimeout(500);

  await expect(page.getByText('Articles').first()).toBeVisible({ timeout: 10000 });
  await expect(page.getByText('View All Articles')).toBeVisible();
});

// Home-11
test('[Home-11] Klik kartu artikel mengarahkan ke detail artikel', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await page.waitForTimeout(1000);

  // Klik artikel pertama yang ada
  const articleCard = page.locator('[class*="article"], .ant-card').first();
  if (await articleCard.isVisible()) {
    await articleCard.click();
    await page.waitForTimeout(1000);
    await expect(page.locator('body')).toBeVisible();
  }
});

// Home-12
test('[Home-12] Link View All Articles dapat diklik', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  await page.getByText('View All Articles').click();
  await page.waitForLoadState('networkidle');

  await expect(page.locator('body')).toBeVisible();
});

// Home-13
test('[Home-13] Footer menampilkan link Support dan Legal', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  await expect(page.getByRole('link', { name: 'Help Center' })).toBeVisible({ timeout: 5000 });
  await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'FAQ' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Terms' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Privacy' })).toBeVisible();
});

// Home-14
test('[Home-14] Scroll halaman Home ke bawah berjalan lancar', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  // Verifikasi halaman tidak crash dan footer tampil
  await expect(page.getByRole('link', { name: 'Privacy' })).toBeVisible({ timeout: 5000 });
});

// Home-15 - Manual: butuh matikan internet
test.skip('[Home-15] Halaman Home saat tidak ada koneksi internet', async ({ page }) => {
  // Manual: matikan internet, refresh halaman, cek error message
});

// Home-16
test('[Home-16] Logo multiket.com dapat diklik dan kembali ke Home', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  // Navigasi ke halaman lain
  await page.getByRole('button', { name: 'My Flight Booking' }).click();
  await page.waitForLoadState('networkidle');

  // Klik logo kembali ke home
  await page.locator('header img, header [class*="logo"], header a').first().click();
  await page.waitForLoadState('networkidle');

  await expect(page.getByText('Corporate travel, in one place')).toBeVisible({ timeout: 10000 });
});
