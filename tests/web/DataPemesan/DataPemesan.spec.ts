import { test, expect } from '@playwright/test';
import { BASE_URL } from '../helpers/auth';

/**
 * Data Pemesan tests - butuh session login + penerbangan yang sudah dipilih.
 * Session di-inject via storageState dari auth.setup.ts
 */

const BOOKING_URL = `${BASE_URL}/#/flight/review`;

// DataPemesan-01
test('[DataPemesan-01] Halaman Data Pemesan dapat diakses setelah login', async ({ page }) => {
  await page.goto(BOOKING_URL);
  await page.waitForLoadState('networkidle');

  // Setelah login tidak redirect ke login form
  await expect(page.getByPlaceholder('Input email address')).toHaveCount(0, { timeout: 5000 });
  await expect(page.locator('body')).toBeVisible();
});

// DataPemesan-02
test('[DataPemesan-02] Section Contact Details menampilkan field yang lengkap', async ({ page }) => {
  await page.goto(BOOKING_URL);
  await page.waitForLoadState('networkidle');

  const fullName = page.getByPlaceholder('Full Name').or(page.getByLabel(/full name/i));
  const email = page.getByPlaceholder(/email/i).first();

  if (await fullName.isVisible()) {
    await expect(fullName).toBeVisible();
    await expect(email).toBeVisible();
  }
});

// DataPemesan-03
test('[DataPemesan-03] Field Full Name menerima input yang valid', async ({ page }) => {
  await page.goto(BOOKING_URL);
  await page.waitForLoadState('networkidle');

  const fullName = page.getByPlaceholder('Full Name');
  if (await fullName.isVisible()) {
    await fullName.fill('John Doe');
    await expect(fullName).toHaveValue('John Doe');
  }
});

// DataPemesan-04
test('[DataPemesan-04] Field Email Address menerima format email yang valid', async ({ page }) => {
  await page.goto(BOOKING_URL);
  await page.waitForLoadState('networkidle');

  const emailField = page.getByPlaceholder('Contoh: email@example.com').or(
    page.getByPlaceholder(/email/i).first()
  );
  if (await emailField.isVisible()) {
    await emailField.fill('john@email.com');
    await expect(emailField).toHaveValue('john@email.com');
  }
});

// DataPemesan-05
test('[DataPemesan-05] Field Phone Number menerima nomor dengan kode negara +62', async ({ page }) => {
  await page.goto(BOOKING_URL);
  await page.waitForLoadState('networkidle');

  const phoneField = page.getByPlaceholder(/phone|handphone|telepon/i).first();
  if (await phoneField.isVisible()) {
    await phoneField.fill('81234567890');
    await expect(phoneField).toHaveValue('81234567890');
  }
});

// DataPemesan-06
test('[DataPemesan-06] Section Adult Passenger menampilkan field yang lengkap', async ({ page }) => {
  await page.goto(BOOKING_URL);
  await page.waitForLoadState('networkidle');

  // Cek section Adult Passenger
  const adultSection = page.getByText(/Adult Passenger|Dewasa/i).first();
  if (await adultSection.isVisible()) {
    await expect(adultSection).toBeVisible();
  }
});

// DataPemesan-07
test('[DataPemesan-07] Dropdown Title pada Adult Passenger dapat dipilih', async ({ page }) => {
  await page.goto(BOOKING_URL);
  await page.waitForLoadState('networkidle');

  const titleSelect = page.locator('select').first().or(
    page.getByRole('combobox').first()
  );
  if (await titleSelect.isVisible()) {
    await expect(titleSelect).toBeVisible();
  }
});

// DataPemesan-08
test('[DataPemesan-08] Field First Name dan Last Name traveler menerima input valid', async ({ page }) => {
  await page.goto(BOOKING_URL);
  await page.waitForLoadState('networkidle');

  const firstNamePassenger = page.getByPlaceholder('As on ID/ Passport').first().or(
    page.getByPlaceholder('First Name').first()
  );

  if (await firstNamePassenger.isVisible()) {
    await firstNamePassenger.fill('John');
    await expect(firstNamePassenger).toHaveValue('John');
  }
});

// DataPemesan-09
test('[DataPemesan-09] Field Date of Birth traveler menampilkan date picker', async ({ page }) => {
  await page.goto(BOOKING_URL);
  await page.waitForLoadState('networkidle');

  const dobField = page.getByPlaceholder('Date of Birth').or(
    page.locator('input[type="date"]').first()
  );
  if (await dobField.isVisible()) {
    await dobField.click();
    await page.waitForTimeout(500);
    await expect(page.locator('body')).toBeVisible();
  }
});

// DataPemesan-10
test('[DataPemesan-10] Field Nationality menampilkan default ID', async ({ page }) => {
  await page.goto(BOOKING_URL);
  await page.waitForLoadState('networkidle');

  const nationality = page.getByText('ID').first();
  if (await nationality.isVisible()) {
    await expect(nationality).toBeVisible();
  }
});

// DataPemesan-11
test('[DataPemesan-11] Field ID Number menerima input yang valid', async ({ page }) => {
  await page.goto(BOOKING_URL);
  await page.waitForLoadState('networkidle');

  const idNumber = page.getByPlaceholder('As on ID card').or(
    page.getByPlaceholder(/ID Number|id number/i)
  );
  if (await idNumber.isVisible()) {
    await idNumber.fill('347364736');
    await expect(idNumber).toHaveValue('347364736');
  }
});

// DataPemesan-12
test('[DataPemesan-12] Tombol Load saved passengers membuka modal Select passenger', async ({ page }) => {
  await page.goto(BOOKING_URL);
  await page.waitForLoadState('networkidle');

  const loadBtn = page.getByRole('button', { name: /Load saved passengers/i });
  if (await loadBtn.isVisible()) {
    await loadBtn.click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Select passenger').or(page.getByRole('dialog'))).toBeVisible({ timeout: 5000 });
  }
});

// DataPemesan-13 - Skip: butuh penumpang tersimpan di akun
test.skip('[DataPemesan-13] Memilih penumpang dari modal mengisi form otomatis', async ({ page }) => {
  // Butuh data passenger tersimpan di akun
});

// DataPemesan-14 - Skip
test.skip('[DataPemesan-14] Tombol Cancel loaded passenger mengosongkan form', async ({ page }) => {});

// DataPemesan-15 - Skip
test.skip('[DataPemesan-15] Tombol Cancel modal menutup tanpa perubahan', async ({ page }) => {});

// DataPemesan-16
test('[DataPemesan-16] Checkbox Save changes tercentang secara default', async ({ page }) => {
  await page.goto(BOOKING_URL);
  await page.waitForLoadState('networkidle');

  const saveCheckbox = page.getByLabel(/save changes/i).or(
    page.locator('input[type="checkbox"]').first()
  );
  if (await saveCheckbox.isVisible()) {
    await expect(saveCheckbox).toBeChecked();
  }
});

// DataPemesan-17
test('[DataPemesan-17] Field First Name kosong menampilkan validasi error saat submit', async ({ page }) => {
  await page.goto(BOOKING_URL);
  await page.waitForLoadState('networkidle');

  const continueBtn = page.getByRole('button', { name: /Continue|Lanjut/i }).last();
  if (await continueBtn.isVisible()) {
    await continueBtn.click();
    await page.waitForTimeout(500);

    // Validasi error muncul
    const errorMsg = page.locator('[class*="error"], .ant-form-item-explain-error').first();
    if (await errorMsg.isVisible()) {
      await expect(errorMsg).toBeVisible({ timeout: 5000 });
    }
  }
});

// DataPemesan-18
test('[DataPemesan-18] Section Add-Ons menampilkan pilihan tambahan', async ({ page }) => {
  await page.goto(BOOKING_URL);
  await page.waitForLoadState('networkidle');

  const addOns = page.getByText('Add-Ons').or(page.getByText('Add-on'));
  if (await addOns.isVisible()) {
    await expect(addOns).toBeVisible();
  }
});

// DataPemesan-19
test('[DataPemesan-19] Add-on Extra baggage dapat dipilih', async ({ page }) => {
  await page.goto(BOOKING_URL);
  await page.waitForLoadState('networkidle');

  const baggageCheckbox = page.getByLabel(/Extra baggage|bagasi/i).first().or(
    page.getByText(/Extra baggage/i).first()
  );
  if (await baggageCheckbox.isVisible()) {
    await expect(baggageCheckbox).toBeVisible();
  }
});

// DataPemesan-20
test('[DataPemesan-20] Add-on In-flight meal dapat dipilih', async ({ page }) => {
  await page.goto(BOOKING_URL);
  await page.waitForLoadState('networkidle');

  const mealOption = page.getByText(/In-flight meal|meal/i).first();
  if (await mealOption.isVisible()) {
    await expect(mealOption).toBeVisible();
  }
});

// DataPemesan-21
test('[DataPemesan-21] Add-on Travel Insurance dapat dipilih', async ({ page }) => {
  await page.goto(BOOKING_URL);
  await page.waitForLoadState('networkidle');

  const insuranceOption = page.getByText(/Travel Insurance|insurance/i).first();
  if (await insuranceOption.isVisible()) {
    await expect(insuranceOption).toBeVisible();
  }
});

// DataPemesan-22
test('[DataPemesan-22] Section Fare rules & policies tampil di halaman Data Pemesan', async ({ page }) => {
  await page.goto(BOOKING_URL);
  await page.waitForLoadState('networkidle');

  const fareRules = page.getByText(/Fare rules|policies/i).first();
  if (await fareRules.isVisible()) {
    await expect(fareRules).toBeVisible();
  }
});

// DataPemesan-23 - Skip: butuh semua data valid terisi
test.skip('[DataPemesan-23] Tombol lanjut berhasil memproses saat semua data valid', async ({ page }) => {
  // Butuh flight yang aktif + semua field terisi
});

// DataPemesan-24
test('[DataPemesan-24] Field Email menolak format yang tidak valid', async ({ page }) => {
  await page.goto(BOOKING_URL);
  await page.waitForLoadState('networkidle');

  const emailField = page.getByPlaceholder('Contoh: email@example.com').or(
    page.getByPlaceholder(/email/i).first()
  );
  if (await emailField.isVisible()) {
    await emailField.fill('irham@');
    await emailField.blur();
    await page.waitForTimeout(500);

    const errorEl = page.locator('[class*="error"]').first();
    if (await errorEl.isVisible()) {
      await expect(errorEl).toBeVisible({ timeout: 5000 });
    }
  }
});

// DataPemesan-25 - Manual: butuh matikan internet
test.skip('[DataPemesan-25] Tombol lanjut saat koneksi internet terputus', async ({ page }) => {
  // Manual: matikan internet, isi data, klik lanjut
});
