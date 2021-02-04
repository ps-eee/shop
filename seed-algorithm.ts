const puppeteer = require('puppeteer');

(async () => {

  // Open browser
  const browser = await puppeteer.launch({ defaultViewport: null, headless: false, newPage: false });

  for (let i = 0; i < 5; i++) {

    // Open tab
    const page = await browser.newPage();

    // Go to app
    await page.goto('http://localhost:4200');

    // Register Login prompt handler
    const userId = Math.floor(Math.random() * 100 + 1);
    page.on('dialog', async dialog => {
      await dialog.accept(`${userId}`);
    });

    // Open Login prompt
    await page.click('button#login');

    // Wait for API calls
    await page.waitForTimeout(3000);

    // Randomly select product and go to detail page
    const id = Math.floor(Math.random() * 2 + 1)
    await page.click('a#product-' + id);

    const isBuying = Math.floor((Math.random() * 10) % 2) === 0;

    if (isBuying) {

      // Checkout or not
      await page.click('button#checkout');

      // Wait for API call
      await page.waitForTimeout(3000);

    }

    // Close tab
    await page.close();

  }

  // Close browser
  setTimeout(async () => { await browser.close(); }, 500);

})();
