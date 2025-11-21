const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

/**
 * Film Review Feature Step Definitions
 * This file contains Film Review-specific step definitions and aliases.
 * Common reusable steps are defined in commonSteps.js
 */

// ============================================================================
// GIVEN STEPS - Navigation (Film Review specific)
// ============================================================================
// Note: Generic navigation steps are in commonSteps.js

// ============================================================================
// WHEN STEPS - Film Review specific aliases
// ============================================================================

// Alias for dropdown click (Film Review context)
When('user clicks on Choose Film dropdown in Film Review', async function () {
  await this.filmReviewPage.clickFilmDropdown();
});

When('the user clicks on Choose Film dropdown in Film Review', async function () {
  await this.filmReviewPage.clickFilmDropdown();
});

// Alias for film search (Film Review context)
When('the user enters {string} in the Choose Film field', async function (searchText) {
  await this.filmReviewPage.typeFilmSearch(searchText);
});

// Alias for film selection (Film Review context)
When('the user selects {string} from the dropdown', async function (filmName) {
  await this.filmReviewPage.selectFilm(filmName);
});

When('the user selects {string} from the film dropdown', async function (filmName) {
  await this.filmReviewPage.clickFilmDropdown();
  await this.filmReviewPage.selectFilm(filmName);
});

When('the user selects {string}', async function (filmName) {
  await this.filmReviewPage.clickFilmDropdown();
  await this.filmReviewPage.selectFilm(filmName);
});

// Alias for field clicks (Film Review context)
When('the user clicks on {string} field', async function (fieldName) {
  await this.filmReviewPage.clickFieldByName(fieldName);
});

When('the user clicks {string} field', async function (fieldName) {
  await this.filmReviewPage.clickFieldByName(fieldName);
});

// Alias for text entry (Film Review context)
When('the user enters {string} in the text field', async function (text) {
  await this.filmReviewPage.enterText(text);
});

When('the user enters {string}', async function (text) {
  await this.filmReviewPage.enterText(text);
});

When('the user leaves the text field empty', async function () {
  // Do nothing - field is already empty
});

// Alias for checkbox (Film Review context)
When('the user sets checkbox to {string}', async function (state) {
  await this.filmReviewPage.setCheckboxState(state);
});

When('the user checks the checkbox', async function () {
  await this.filmReviewPage.checkCheckbox();
});

// Alias for button clicks (Film Review context)
When('the user clicks {string} button for Film Review', async function (buttonName) {
  await this.filmReviewPage.clickButtonByName(buttonName);
});

When('the user clicks {string} button for film review', async function (buttonName) {
  await this.filmReviewPage.clickButtonByName(buttonName);
});

When('the user clicks Submit button for film review', async function () {
  await this.filmReviewPage.clickValidate();
});

When('the user clicks {string} button for choose a film field', async function (buttonName) {
  await this.filmReviewPage.clickButtonByName(buttonName);
});

// ============================================================================
// THEN STEPS - Film Review specific assertions
// ============================================================================

// Alias for dropdown options (Film Review context)
Then('the following options should be visible in Film Review:', async function (dataTable) {
  const expectedOptions = dataTable.raw().slice(1).map(row => row[0].trim());
  const actualOptions = await this.filmReviewPage.getFilmOptions();
  
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
      throw new Error(`Expected option "${expected}" not found in dropdown. Available options: [${normalizedActual.join(', ')}]`);
    }
  }
});

// Alias for film field value (Film Review context)
Then('the film field should display {string}', async function (expectedValue) {
  const actualValue = await this.filmReviewPage.getSelectedFilm();
  expect(actualValue).toBe(expectedValue);
});

Then('the film field should be empty', async function () {
  const value = await this.filmReviewPage.getSelectedFilm();
  expect(value).toBe('');
});

Then('the film field should remain empty', async function () {
  const value = await this.filmReviewPage.getSelectedFilm();
  expect(value).toBe('');
});

// Alias for error messages (Film Review context)
Then('the following errors should appear in Film Review:', async function (dataTable) {
  const expectedErrors = dataTable.raw().slice(1).map(row => row[0].trim());
  const errorText = await this.filmReviewPage.getErrorAlertText();
  
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
