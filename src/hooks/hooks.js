const { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('@playwright/test');
const FilmReviewPage = require('../pageObjects/FilmReviewPage');
const SeasonReviewPage = require('../pageObjects/SeasonReviewPage');
require('dotenv').config();

// Set default timeout for steps
setDefaultTimeout(60000);

// Global browser and context
let browser;
let context;

/**
 * Before All - Runs once before all scenarios
 */
BeforeAll(async function () {
  console.log('=================================');
  console.log('Starting Test Execution');
  console.log('=================================');
});

/**
 * Before - Runs before each scenario
 */
Before(async function (scenario) {
  console.log(`\nStarting Scenario: ${scenario.pickle.name}`);
  
  // Get browser type from environment or world parameters
  const browserType = this.parameters?.browser || process.env.BROWSER || 'chromium';
  const headless = process.env.HEADLESS !== 'false';
  
  console.log(`🌐 Browser: ${browserType} | Headless: ${headless} | HEADLESS env: "${process.env.HEADLESS}"`);
  
  // Launch browser
  switch (browserType.toLowerCase()) {
    case 'firefox':
      browser = await firefox.launch({ headless });
      break;
    case 'webkit':
      browser = await webkit.launch({ headless });
      break;
    default:
      browser = await chromium.launch({ headless });
  }
  
  // Create browser context
  context = await browser.newContext({
    viewport: { 
      width: parseInt(process.env.VIEWPORT_WIDTH) || 1280, 
      height: parseInt(process.env.VIEWPORT_HEIGHT) || 720 
    },
    recordVideo: {
      dir: 'reports/videos/',
      size: { width: 1280, height: 720 }
    }
  });
  
  // Create new page
  this.page = await context.newPage();
  
  // Initialize page objects
  this.filmReviewPage = new FilmReviewPage(this.page);
  this.seasonReviewPage = new SeasonReviewPage(this.page);
  
  // Set context timeout
  context.setDefaultTimeout(parseInt(process.env.TIMEOUT) || 60000);
});

/**
 * After - Runs after each scenario
 */
After(async function (scenario) {
  // Take screenshot on failure
  if (scenario.result.status === Status.FAILED) {
    const screenshot = await this.page.screenshot({ 
      path: `reports/screenshots/${scenario.pickle.name.replace(/\s/g, '_')}_failed.png`,
      fullPage: true 
    });
    
    // Attach screenshot to report
    await this.attach(screenshot, 'image/png');
    
    console.log(`❌ Scenario Failed: ${scenario.pickle.name}`);
  } else {
    console.log(`✅ Scenario Passed: ${scenario.pickle.name}`);
  }
  
  // Close page and context
  if (this.page) {
    await this.page.close();
  }
  
  if (context) {
    await context.close();
  }
  
  if (browser) {
    await browser.close();
  }
});

/**
 * After All - Runs once after all scenarios
 */
AfterAll(async function () {
  console.log('\n=================================');
  console.log('Test Execution Completed');
  console.log('=================================');
});

