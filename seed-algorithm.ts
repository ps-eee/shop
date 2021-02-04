const puppeteer = require('puppeteer');

(async () => {

  // Open browser
  const browser = await puppeteer.launch({ defaultViewport: null, headless: false, newPage: false });

  let preferredTreatmentCount = 0;
  let preferredTreatmentCheckoutCount = 0;

  let nonPreferredTreatmentCount = 0;
  let nonPreferredTreatmentCheckoutCount = 0;

  const runCount = 10;

  for (let i = 0; i < runCount; i++) {

    // Open tab
    const page = await browser.newPage();

    // Go to app
    await page.goto('http://localhost:4200');

    // Register Login prompt handler
    const userId = Math.floor(Math.random() * 1000 + 1);
    page.on('dialog', async dialog => {
      await dialog.accept(`${userId}`);
    });

    // Open Login prompt
    await page.click('button#login');

    // Wait for API calls
    await page.waitForTimeout(3000);

    // Randomly select product and go to detail page
    const id = Math.floor(Math.random() * 5 + 1)
    await page.click('a#product-' + id);

    // If preferred treatment, checkout if preferredTreatmentCheckoutCount/preferredTreatmentCount < 3%
    // If non-preferred treatment, checkout if nonPreferredTreatmentCheckoutCount/nonPreferredTreatmentCount < 2.75%

    const isTreatmentPreferred = (Math.floor(Math.random() * 2) % 2) === 0;

    let isBuying = false;

    if (isTreatmentPreferred) {

      isBuying = preferredTreatmentCheckoutCount / preferredTreatmentCount <= (3 / 100);

      if (isBuying) { preferredTreatmentCheckoutCount++; }

      preferredTreatmentCount++;

    } else {

      isBuying = nonPreferredTreatmentCheckoutCount / nonPreferredTreatmentCount <= (3 / 100);

      if (isBuying) { nonPreferredTreatmentCheckoutCount++; }

      nonPreferredTreatmentCount++;

    }

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
