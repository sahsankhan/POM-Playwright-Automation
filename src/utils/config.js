/**
 * Configuration Management
 * Central configuration for the framework
 */
require('dotenv').config();

const config = {
  // Base URL
  baseUrl: process.env.BASE_URL || 'https://example.com',
  
  // Browser configuration
  browser: {
    type: process.env.BROWSER || 'chromium',
    headless: process.env.HEADLESS !== 'false',
    slowMo: parseInt(process.env.SLOW_MO) || 0,
  },
  
  // Viewport configuration
  viewport: {
    width: parseInt(process.env.VIEWPORT_WIDTH) || 1280,
    height: parseInt(process.env.VIEWPORT_HEIGHT) || 720,
  },
  
  // Timeouts
  timeout: {
    default: parseInt(process.env.TIMEOUT) || 60000,
    navigation: parseInt(process.env.NAVIGATION_TIMEOUT) || 30000,
    element: parseInt(process.env.ELEMENT_TIMEOUT) || 10000,
  },
  
  // Screenshots and videos
  screenshots: {
    enabled: process.env.SCREENSHOTS_ENABLED !== 'false',
    onFailure: true,
    path: './reports/screenshots/'
  },
  
  videos: {
    enabled: process.env.VIDEOS_ENABLED === 'true',
    path: './reports/videos/'
  },
  
  // Reporting
  reports: {
    path: './reports/',
    html: true,
    json: true,
    junit: true
  },
  
  // Retry configuration
  retry: {
    maxAttempts: parseInt(process.env.RETRY_ATTEMPTS) || 2,
    delay: parseInt(process.env.RETRY_DELAY) || 1000
  }
};

module.exports = config;

