# Playwright + Cucumber BDD Automation Framework

A robust test automation framework built with Playwright and Cucumber BDD, implementing the Page Object Model (POM) design pattern.

## 🚀 Features

- **Playwright**: Fast and reliable browser automation
- **Cucumber BDD**: Behavior-driven development with Gherkin syntax
- **Page Object Model**: Maintainable and reusable page objects
- **Multi-Browser Support**: Chrome, Firefox, and WebKit
- **Parallel Execution**: Run tests concurrently for faster results
- **Comprehensive Reporting**: HTML, JSON, and JUnit XML reports
- **CI/CD Ready**: GitHub Actions workflow included
- **Screenshot & Video**: Automatic capture on test failures

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

## 🔧 Installation


1.  Install dependencies using npm install.
2.  Install Playwright browsers using npx playwright install.
3.  Create and configure the .env file for environment variables.

```env
BASE_URL=https://sample-project-dusky.vercel.app
BROWSER=chromium
HEADLESS=true
TIMEOUT=60000
VIEWPORT_WIDTH=1280
VIEWPORT_HEIGHT=720
```

4.  Run all tests using npm test.
5.  Execute tests in specific browsers using 	
	npm run test:chrome
6.  Run tests in headed mode by setting HEADLESS=false and executing npx
    cucumber-js.
7.  Run specific tests by name using npx cucumber-js –name “”.
8.  Generate HTML reports using npm run report.
9.  Open Report: start reports/html-report/index.html

