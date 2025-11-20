/**
 * Helper Utilities
 * Common utility functions used across the framework
 */

/**
 * Generate random email
 * @returns {string} Random email address
 */
function generateRandomEmail() {
  const timestamp = Date.now();
  return `testuser_${timestamp}@example.com`;
}

/**
 * Generate random string
 * @param {number} length - Length of random string
 * @returns {string} Random string
 */
function generateRandomString(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Generate random number
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
function generateRandomNumber(min = 1, max = 1000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Format date
 * @param {Date} date - Date object
 * @param {string} format - Format string (YYYY-MM-DD, DD/MM/YYYY, etc.)
 * @returns {string} Formatted date string
 */
function formatDate(date = new Date(), format = 'YYYY-MM-DD') {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day);
}

/**
 * Wait for specified milliseconds
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after specified time
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry function with specified attempts
 * @param {Function} fn - Function to retry
 * @param {number} maxAttempts - Maximum retry attempts
 * @param {number} delay - Delay between retries in ms
 * @returns {Promise} Result of function
 */
async function retryOperation(fn, maxAttempts = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) throw error;
      console.log(`Attempt ${attempt} failed, retrying...`);
      await sleep(delay);
    }
  }
}

/**
 * Get current timestamp
 * @returns {string} Current timestamp
 */
function getTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

/**
 * Convert string to title case
 * @param {string} str - Input string
 * @returns {string} Title case string
 */
function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

module.exports = {
  generateRandomEmail,
  generateRandomString,
  generateRandomNumber,
  formatDate,
  sleep,
  retryOperation,
  getTimestamp,
  toTitleCase
};

