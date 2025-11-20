/**
 * Reporter Configuration
 * Generates HTML reports from Cucumber JSON
 */
const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: './reports/',
  reportPath: './reports/html-report/',
  metadata: {
    browser: {
      name: process.env.BROWSER || 'chromium',
      version: 'Latest'
    },
    device: 'Local Machine',
    platform: {
      name: process.platform,
      version: process.version
    }
  },
  customData: {
    title: 'Test Execution Report',
    data: [
      { label: 'Project', value: 'Playwright Cucumber BDD Framework' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Execution Date', value: new Date().toLocaleString() },
      { label: 'Environment', value: process.env.BASE_URL || 'N/A' }
    ]
  }
});

console.log('HTML Report generated successfully at: ./reports/html-report/');

