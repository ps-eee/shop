const puppeteer = require('puppeteer');

(async () => {

  // Open browser
  const browser = await puppeteer.launch({ defaultViewport: null, headless: true });

  const appUrl = 'http://localhost:4200';
  const preferredTreatment = 'Almost Gone!';
  const runCount = 100;
  let preferredTreatmentCount = 0;
  let preferredTreatmentCheckoutCount = 0;
  let nonPreferredTreatmentCount = 0;
  let nonPreferredTreatmentCheckoutCount = 0;

  for (let i = 0; i < runCount; i++) {

    console.log('Running iteration ' + (i + 1) + '.')

    // Open tab
    const page = await browser.newPage();

    // Go to app
    await page.goto(appUrl);

    // Register Login prompt handler
    const userId = Math.floor(Math.random() * 1000 + 1);
    page.on('dialog', async dialog => {
      await dialog.accept(`${userId}`);
    });

    // Open Login prompt
    await page.click('button#login');

    // Wait for API calls
    await page.waitForTimeout(5000);

    // Randomly select product and go to detail page
    const id = Math.floor(Math.random() * 5 + 1)
    await page.click('a#product-' + id);

    const fomoText = await page.$eval('#fomo-text', el => el.textContent);

    const isTreatmentPreferred = fomoText === preferredTreatment;

    let isBuying = false;

    if (isTreatmentPreferred) {

      // If preferred treatment, checkout if preferredTreatmentCheckoutCount/preferredTreatmentCount < 3%

      isBuying = preferredTreatmentCheckoutCount / preferredTreatmentCount <= (3 / 100);

      if (isBuying) { preferredTreatmentCheckoutCount++; }

      preferredTreatmentCount++;

    } else {

      // If non-preferred treatment, checkout if nonPreferredTreatmentCheckoutCount/nonPreferredTreatmentCount < 2.75%

      isBuying = nonPreferredTreatmentCheckoutCount / nonPreferredTreatmentCount <= (2.75 / 100);

      if (isBuying) { nonPreferredTreatmentCheckoutCount++; }

      nonPreferredTreatmentCount++;

    }

    if (isBuying) {

      // Checkout or not
      await page.click('button#checkout');

      // Wait for API call
      await page.waitForTimeout(5000);

    } else {

      await page.waitForTimeout(10000);

    }

    const chartPage = await browser.newPage();

    // Go to chart
    await chartPage.goto('http://localhost:7071/api/getCharts');

    await chartPage.screenshot({ path: './screenshots/ss-' + i + '.png' });

    await chartPage.waitForTimeout(5000);

    await chartPage.close();

    // Close tab
    await page.close();

  }

  // Close browser
  setTimeout(async () => { await browser.close(); }, 3000);

})();
