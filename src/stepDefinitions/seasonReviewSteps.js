const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

/**
 * Season Review Feature Step Definitions
 * This file contains Season Review-specific step definitions and aliases.
 * Common reusable steps are defined in commonSteps.js
 */

// ============================================================================
// WHEN STEPS - Season Review specific aliases
// ============================================================================

// Alias for dropdown click (Season Review context)
When('the user clicks on Choose Film dropdown in Season Review', async function () {
  await this.seasonReviewPage.clickSeasonDropdown();
});

When('user clicks on Choose Film dropdown in Season Review', async function () {
  await this.seasonReviewPage.clickSeasonDropdown();
});

// Alias for season search (Season Review context)
When('the user enters {string} in the Season Review film field', async function (searchText) {
  await this.seasonReviewPage.typeSeasonSearch(searchText);
});

// Alias for season selection (Season Review context)
When('the user selects {string} from the Season Review dropdown', async function (seasonName) {
  // Check if dropdown is already open, if not click it
  const dropdownOpen = await this.page.isVisible("li[role='option']");
  if (!dropdownOpen) {
    await this.seasonReviewPage.clickSeasonDropdown();
  }
  await this.seasonReviewPage.selectSeason(seasonName);
});

// Alias for field clicks (Season Review context)
When('the user clicks {string} field in Season Review', async function (fieldName) {
  await this.seasonReviewPage.clickFieldByName(fieldName);
});

// Alias for text entry (Season Review context)
When('the user enters {string} in Season Review text field', async function (text) {
  await this.seasonReviewPage.enterText(text);
});

When('the user leaves the Season Review text field empty', async function () {
  // Do nothing - field is already empty
});

// Alias for checkbox (Season Review context)
When('the user checks the checkbox in Season Review', async function () {
  await this.seasonReviewPage.checkCheckbox();
});

// Alias for button clicks (Season Review context)
When('the user clicks {string} button for season review', async function (buttonName) {
  await this.seasonReviewPage.clickButtonByName(buttonName);
});

When('the user clicks {string} button for Season Review film field', async function (buttonName) {
  await this.seasonReviewPage.clickButtonByName(buttonName);
});

When('the user clicks Submit button for season review', async function () {
  await this.seasonReviewPage.clickValidate();
});

// ============================================================================
// THEN STEPS - Season Review specific assertions
// ============================================================================

// Alias for dropdown options (Season Review context)
Then('the following options should be visible in Season Review:', async function (dataTable) {
  const expectedOptions = dataTable.raw().map(row => row[0].trim()).filter(opt => opt !== 'Option');
  const actualOptions = await this.seasonReviewPage.getSeasonOptions();
  
  // Normalize options for comparison
  const normalizedActual = actualOptions.map(opt => opt.trim());
  const normalizedExpected = expectedOptions.map(opt => opt.trim());
  
  // Check if expected and actual counts match
  if (normalizedExpected.length !== normalizedActual.length) {
    throw new Error(`Expected ${normalizedExpected.length} options but found ${normalizedActual.length}. Expected: [${normalizedExpected.join(', ')}], Actual: [${normalizedActual.join(', ')}]`);
  }
  
  // Check if all expected options are present (exact match)
  for (const expected of normalizedExpected) {
    const found = normalizedActual.some(actual => actual === expected);
    
    if (!found) {
      throw new Error(`Expected option "${expected}" not found in Season Review dropdown. Available options: [${normalizedActual.join(', ')}]`);
    }
  }
});

// Alias for season field value (Season Review context)
Then('the user should see {string} selected in Season Review field', async function (expectedValue) {
  const actualValue = await this.seasonReviewPage.getSelectedSeason();
  expect(actualValue).toBe(expectedValue);
});

Then('the Season Review film field should display {string}', async function (expectedValue) {
  const actualValue = await this.seasonReviewPage.getSelectedSeason();
  expect(actualValue).toBe(expectedValue);
});

Then('the Season Review film field should be empty', async function () {
  const value = await this.seasonReviewPage.getSelectedSeason();
  expect(value).toBe('');
});

Then('the Season Review film field should remain empty', async function () {
  const value = await this.seasonReviewPage.getSelectedSeason();
  expect(value).toBe('');
});

// Alias for checkbox (Season Review context)
Then('the checkbox text in Season Review should display {string}', async function (expectedText) {
  const actualText = await this.seasonReviewPage.getCheckboxText();
  expect(actualText).toBe(expectedText);
});

Then('the checkbox in Season Review should be checked', async function () {
  const isChecked = await this.seasonReviewPage.isCheckboxChecked();
  expect(isChecked).toBeTruthy();
});

// Alias for text field (Season Review context)
Then('the Season Review text field should be empty', async function () {
  const value = await this.seasonReviewPage.getTextFieldValue();
  expect(value).toBe('');
});

Then('the Season Review text field should remain empty', async function () {
  const value = await this.seasonReviewPage.getTextFieldValue();
  expect(value).toBe('');
});

// Alias for banner (Season Review context)
Then('a banner should appear for Season Review: {string}', async function (expectedMessage) {
  const bannerText = await this.seasonReviewPage.getBannerText();
  expect(bannerText).toContain(expectedMessage);
});

// Alias for error messages (Season Review context)
Then('the following Season Review errors should appear:', async function (dataTable) {
  const expectedErrors = dataTable.raw().map(row => row[0].trim()).filter(err => err !== 'Error Message');
  const errorText = await this.seasonReviewPage.getErrorAlertText();
  
  expect(errorText).not.toBeNull();
  
  // Split actual error text into individual error messages
  const actualErrors = errorText.split('.').map(err => err.trim()).filter(err => err.length > 0);
  
  // Check each expected error has an exact match in actual errors
  for (const expectedError of expectedErrors) {
    const found = actualErrors.some(actual => actual === expectedError);
    if (!found) {
      throw new Error(`Expected error "${expectedError}" not found. Actual errors: [${actualErrors.join(', ')}]`);
    }
  }
});

Then('the following Season Review error should appear:', async function (dataTable) {
  const expectedErrors = dataTable.raw().map(row => row[0].trim()).filter(err => err !== 'Error Message');
  const errorText = await this.seasonReviewPage.getErrorAlertText();
  
  expect(errorText).not.toBeNull();
  
  // Split actual error text into individual error messages
  const actualErrors = errorText.split('.').map(err => err.trim()).filter(err => err.length > 0);
  
  // Check each expected error has an exact match in actual errors
  for (const expectedError of expectedErrors) {
    const found = actualErrors.some(actual => actual === expectedError);
    if (!found) {
      throw new Error(`Expected error "${expectedError}" not found. Actual errors: [${actualErrors.join(', ')}]`);
    }
  }
});

// Alias for multiple fields empty (Season Review context)
Then('the user should see following Season Review fields empty:', async function (dataTable) {
  const fields = dataTable.raw().map(row => row[0].trim());
  
  for (const field of fields) {
    const isEmpty = await this.seasonReviewPage.isFieldEmpty(field);
    
    if (!isEmpty) {
      throw new Error(`Season Review field "${field}" should be empty but has a value`);
    }
  }
});
