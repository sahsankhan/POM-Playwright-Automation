module.exports = {
  default: {
    paths: ['src/features/**/*.feature'],
    require: ['src/stepDefinitions/**/*.js', 'src/hooks/hooks.js'],
    requireModule: [],
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
      'junit:reports/cucumber-report.xml'
    ],
    formatOptions: { snippetInterface: 'async-await' },
    dryRun: false,
    failFast: false,
    strict: true,
    publishQuiet: true,
  },
  chrome: {
    paths: ['src/features/**/*.feature'],
    require: ['src/stepDefinitions/**/*.js', 'src/hooks/hooks.js'],
    format: ['progress-bar', 'html:reports/cucumber-report.html'],
    worldParameters: {
      browser: 'chromium'
    }
  },
  firefox: {
    paths: ['src/features/**/*.feature'],
    require: ['src/stepDefinitions/**/*.js', 'src/hooks/hooks.js'],
    format: ['progress-bar', 'html:reports/cucumber-report.html'],
    worldParameters: {
      browser: 'firefox'
    }
  },
  webkit: {
    paths: ['src/features/**/*.feature'],
    require: ['src/stepDefinitions/**/*.js', 'src/hooks/hooks.js'],
    format: ['progress-bar', 'html:reports/cucumber-report.html'],
    worldParameters: {
      browser: 'webkit'
    }
  }
};

