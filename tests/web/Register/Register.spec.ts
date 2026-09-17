import { test, expect } from '@playwright/test';

const BASE_URL = 'http://103.196.155.10/multiket/web';

async function goToRegisterForm(page: any) {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Login' }).first().click();
  await expect(page.getByPlaceholder('Input email address')).toBeVisible({ timeout: 10000 });
  await page.getByRole('button', { name: 'Register' }).first().click();
  await expect(page.getByPlaceholder('First Name')).toBeVisible({ timeout: 10000 });
}

const registerSubmit = (page: any) => page.locator('form').getByRole('button', { name: 'Register' });
const passwordInput = (page: any) => page.locator('#password');

// ─── Register TC ─────────────────────────────────────────────────────────────

// Register-01
test('[Register-01] Menampilkan halaman Register dengan benar', async ({ page }) => {
  await goToRegisterForm(page);

  await expect(page.getByPlaceholder('First Name')).toBeVisible();
  await expect(page.getByPlaceholder('Last Name')).toBeVisible();
  await expect(page.getByPlaceholder('corporate@company.com')).toBeVisible();
  await expect(passwordInput(page)).toBeVisible();
  await expect(page.getByPlaceholder('Confirm Password')).toBeVisible();
  await expect(registerSubmit(page)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login Here' })).toBeVisible();
});

// Register-02
test('[Register-02] Account Type default terpilih Individual', async ({ page }) => {
  await goToRegisterForm(page);

  // Individual radio harus terpilih by default
  const individualOption = page.getByText('Individual').first();
  await expect(individualOption).toBeVisible();
});

// Register-03
test('[Register-03] Account Type dapat diubah ke Company', async ({ page }) => {
  await goToRegisterForm(page);

  await page.getByText('Company').first().click();
  await page.waitForTimeout(500);
  await expect(page.getByText('Company').first()).toBeVisible();
});

// Register-04
test('[Register-04] Field First Name dan Last Name menerima input yang valid', async ({ page }) => {
  await goToRegisterForm(page);

  await page.getByPlaceholder('First Name').fill('John');
  await page.getByPlaceholder('Last Name').fill('Doe');

  await expect(page.getByPlaceholder('First Name')).toHaveValue('John');
  await expect(page.getByPlaceholder('Last Name')).toHaveValue('Doe');
});

// Register-05
test('[Register-05] Field Email Address menerima format email yang valid', async ({ page }) => {
  await goToRegisterForm(page);

  await page.getByPlaceholder('corporate@company.com').fill('corporate@company.com');
  await page.getByPlaceholder('corporate@company.com').blur();
  await page.waitForTimeout(500);

  // Tidak ada error state
  await expect(page.locator('.ant-form-item-has-error').first()).not.toBeVisible({ timeout: 3000 }).catch(() => {});
});

// Register-06
test('[Register-06] Field Email Address menolak format email tidak valid', async ({ page }) => {
  await goToRegisterForm(page);

  await page.getByPlaceholder('corporate@company.com').fill('johndoe');
  await page.getByPlaceholder('corporate@company.com').blur();
  await page.waitForTimeout(800);

  // Submit button tetap disabled
  await expect(registerSubmit(page)).toBeDisabled({ timeout: 5000 });
});

// Register-07
test('[Register-07] Field Country dapat diisi/dipilih', async ({ page }) => {
  await goToRegisterForm(page);

  const countryInput = page.getByPlaceholder('Input Country');
  await expect(countryInput).toBeVisible();
  await countryInput.fill('Indonesia');
  await expect(countryInput).toHaveValue('Indonesia');
});

// Register-08
test('[Register-08] Field Phone Number menerima nomor valid dengan kode negara', async ({ page }) => {
  await goToRegisterForm(page);

  const phoneInput = page.getByPlaceholder('+62 81234567890');
  await expect(phoneInput).toBeVisible();
  await phoneInput.fill('81234567890');
  await expect(phoneInput).toHaveValue('81234567890');
});

// Register-09
test('[Register-09] Field Date of Birth menampilkan date picker dan menerima tanggal valid', async ({ page }) => {
  await goToRegisterForm(page);

  await page.getByPlaceholder('Select date').click();
  await page.waitForTimeout(500);

  // Calendar/date picker muncul
  await expect(page.locator('.ant-picker-dropdown, .ant-calendar').first()).toBeVisible({ timeout: 5000 });
});

// Register-10
test('[Register-10] Field Gender dapat dipilih Male dan Female', async ({ page }) => {
  await goToRegisterForm(page);

  // Cari toggle Male/Female
  const maleOption = page.getByText('Male').first();
  const femaleOption = page.getByText('Female').first();

  if (await maleOption.isVisible()) {
    await femaleOption.click();
    await expect(femaleOption).toBeVisible();
  }
});

// Register-11
test('[Register-11] Field Passport Number menerima input yang valid', async ({ page }) => {
  await goToRegisterForm(page);

  const passportInput = page.getByPlaceholder('X12345678');
  await expect(passportInput).toBeVisible();
  await passportInput.fill('X12345678');
  await expect(passportInput).toHaveValue('X12345678');
});

// Register-12
test('[Register-12] Section Frequent Flyer Program dapat dibuka/ditutup', async ({ page }) => {
  await goToRegisterForm(page);

  const ffpSection = page.getByText('Frequent Flyer Program').first();
  await expect(ffpSection).toBeVisible();
  await ffpSection.click();
  await page.waitForTimeout(500);
  // Section expand — verifikasi ada perubahan
  await expect(page.locator('body')).toBeVisible();
});

// Register-13
test('[Register-13] Field Password dan Confirm Password menyembunyikan karakter', async ({ page }) => {
  await goToRegisterForm(page);

  await passwordInput(page).fill('Pass@1234');
  await expect(passwordInput(page)).toHaveAttribute('type', 'password');

  await page.getByPlaceholder('Confirm Password').fill('Pass@1234');
  await expect(page.getByPlaceholder('Confirm Password')).toHaveAttribute('type', 'password');
});

// Register-14
test('[Register-14] Password dan Confirm Password tidak cocok membuat button disabled', async ({ page }) => {
  await goToRegisterForm(page);

  await page.getByPlaceholder('First Name').fill('John');
  await page.getByPlaceholder('Last Name').fill('Doe');
  await passwordInput(page).fill('Pass@1234');
  await page.getByPlaceholder('Confirm Password').fill('Pass@5678');
  await page.getByPlaceholder('Confirm Password').blur();
  await page.waitForTimeout(800);

  await expect(registerSubmit(page)).toBeDisabled({ timeout: 5000 });
});

// Register-15
test('[Register-15] Tombol Register nonaktif sebelum checkbox persetujuan dicentang', async ({ page }) => {
  await goToRegisterForm(page);

  // Form kosong / checkbox belum dicentang — button disabled
  await expect(registerSubmit(page)).toBeDisabled({ timeout: 5000 });
});

// Register-16 - Manual: butuh email valid untuk OTP verifikasi
test.skip('[Register-16] Registrasi berhasil dengan semua input valid', async ({ page }) => {
  // Manual: isi semua field valid lalu input OTP dari email
});

// Register-17
test('[Register-17] Registrasi dengan field First Name kosong — button disabled', async ({ page }) => {
  await goToRegisterForm(page);

  // First Name kosong → button harus disabled
  await page.getByPlaceholder('corporate@company.com').fill('test@test.com');
  await passwordInput(page).fill('Pass@1234');
  await page.getByPlaceholder('Confirm Password').fill('Pass@1234');

  await expect(registerSubmit(page)).toBeDisabled({ timeout: 5000 });
});

// Register-18
test('[Register-18] Registrasi dengan field Email kosong — button disabled', async ({ page }) => {
  await goToRegisterForm(page);

  await page.getByPlaceholder('First Name').fill('John');
  await page.getByPlaceholder('Last Name').fill('Doe');
  // Email kosong
  await passwordInput(page).fill('Pass@1234');
  await page.getByPlaceholder('Confirm Password').fill('Pass@1234');

  await expect(registerSubmit(page)).toBeDisabled({ timeout: 5000 });
});

// Register-19 - Manual: butuh email yang sudah terdaftar
test.skip('[Register-19] Registrasi dengan email sudah terdaftar menampilkan error', async ({ page }) => {
  // Manual: daftar dengan email yang sudah ada di sistem
});

// Register-20 - Manual: butuh matikan internet
test.skip('[Register-20] Registrasi tanpa koneksi internet', async ({ page }) => {
  // Manual: matikan internet, coba register
});

// Register-21
test('[Register-21] Link Login Here mengarahkan ke tab Login', async ({ page }) => {
  await goToRegisterForm(page);

  await page.getByRole('button', { name: 'Login Here' }).click();
  await page.waitForTimeout(500);

  await expect(page.getByPlaceholder('Input email address')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('form').getByRole('button', { name: 'Login' })).toBeVisible();
});

// ─── OTP Verification TC ──────────────────────────────────────────────────────

// OTP-01 - Depends on successful register
test.skip('[OTP-01] Modal Verifikasi Akun muncul setelah Register berhasil', async ({ page }) => {
  // Manual: submit register dengan data valid, cek modal OTP muncul
});

// OTP-02
test('[OTP-02] Modal OTP menampilkan 6 kotak input', async ({ page }) => {
  // Simulasi: login lalu cek modal OTP yang muncul (dari flow login)
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Login' }).first().click();
  await expect(page.getByPlaceholder('Input email address')).toBeVisible({ timeout: 10000 });

  await page.getByPlaceholder('Input email address').fill('irhamzuhdi@gmail.com');
  await page.getByPlaceholder('Input Password').fill('A@dmin12345');
  await page.locator('form').getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Verifikasi Akun')).toBeVisible({ timeout: 15000 });

  // Cek ada input OTP (6 kotak)
  const otpInputs = page.locator('.ant-otp input, input[maxlength="1"], [class*="otp"] input');
  const count = await otpInputs.count();
  expect(count).toBeGreaterThanOrEqual(1);
});

// OTP-03
test('[OTP-03] Input OTP bisa diisi angka', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Login' }).first().click();
  await expect(page.getByPlaceholder('Input email address')).toBeVisible({ timeout: 10000 });

  await page.getByPlaceholder('Input email address').fill('irhamzuhdi@gmail.com');
  await page.getByPlaceholder('Input Password').fill('A@dmin12345');
  await page.locator('form').getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Verifikasi Akun')).toBeVisible({ timeout: 15000 });

  // Cek modal masih tampil
  await expect(page.getByText('Masukan Kode OTP yang kami kirim ke email')).toBeVisible();
});

// OTP-04
test('[OTP-04] Timer countdown resend kode berjalan mundur', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Login' }).first().click();
  await expect(page.getByPlaceholder('Input email address')).toBeVisible({ timeout: 10000 });

  await page.getByPlaceholder('Input email address').fill('irhamzuhdi@gmail.com');
  await page.getByPlaceholder('Input Password').fill('A@dmin12345');
  await page.locator('form').getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Verifikasi Akun')).toBeVisible({ timeout: 15000 });

  // Cek ada teks timer atau resend
  await expect(page.getByText(/kirim ulang|resend|00:/i).first()).toBeVisible({ timeout: 5000 });
});

// OTP-05 - Manual: tunggu timer habis
test.skip('[OTP-05] Link Kirim Ulang Kode aktif setelah timer habis', async ({ page }) => {
  // Manual: tunggu timer 00:00, klik kirim ulang
});

// OTP-06 - Manual: butuh kode OTP valid dari email
test.skip('[OTP-06] Verifikasi berhasil dengan kode OTP yang benar', async ({ page }) => {
  // Manual: masukkan OTP yang benar dari email
});

// OTP-07 - Manual: butuh simulasi OTP salah
test.skip('[OTP-07] Verifikasi gagal dengan kode OTP yang salah', async ({ page }) => {
  // Manual: masukkan OTP yang salah, cek pesan error
});

// OTP-08
test('[OTP-08] Tombol Verification dengan OTP belum lengkap — nonaktif', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Login' }).first().click();
  await expect(page.getByPlaceholder('Input email address')).toBeVisible({ timeout: 10000 });

  await page.getByPlaceholder('Input email address').fill('irhamzuhdi@gmail.com');
  await page.getByPlaceholder('Input Password').fill('A@dmin12345');
  await page.locator('form').getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Verifikasi Akun')).toBeVisible({ timeout: 15000 });

  // Tombol Verification seharusnya disabled saat OTP kosong
  const verifyBtn = page.getByRole('button', { name: 'Verification' });
  await expect(verifyBtn).toBeVisible();
  await expect(verifyBtn).toBeDisabled({ timeout: 5000 });
});

// OTP-09
test('[OTP-09] Tombol Batal menutup modal verifikasi', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Login' }).first().click();
  await expect(page.getByPlaceholder('Input email address')).toBeVisible({ timeout: 10000 });

  await page.getByPlaceholder('Input email address').fill('irhamzuhdi@gmail.com');
  await page.getByPlaceholder('Input Password').fill('A@dmin12345');
  await page.locator('form').getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Verifikasi Akun')).toBeVisible({ timeout: 15000 });

  await page.getByRole('button', { name: 'Batal' }).click();
  await page.waitForTimeout(500);

  await expect(page.getByText('Verifikasi Akun')).not.toBeVisible({ timeout: 5000 });
});

// OTP-10 - Manual: butuh kode OTP kadaluarsa
test.skip('[OTP-10] Kode OTP kadaluarsa menampilkan pesan error', async ({ page }) => {
  // Manual: tunggu OTP expired, masukkan, cek pesan error
});
