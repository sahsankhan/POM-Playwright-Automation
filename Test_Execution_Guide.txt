Test Execution Guide

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
	npm run test:chrome, 	
	npm run test:firefox, or 
	npm run test:webkit.
6.  Run tests in headed mode by setting HEADLESS=false and executing npx
    cucumber-js.
7.  Run specific tests by name using npx cucumber-js –name “”.
8.  Generate HTML reports using npm run report.
9. View test reports in the reports directory.
