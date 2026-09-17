const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();

  await page.goto('http://103.196.155.10/multiket/web');
  await page.waitForTimeout(3000);

  const buttons = await page.getByRole('button').allTextContents();
  console.log('Buttons:', JSON.stringify(buttons));

  const logoHtml = await page.locator('header').first().innerHTML().catch(() => '');
  console.log('Header HTML (300):', logoHtml.substring(0, 300));

  await browser.close();
})();
