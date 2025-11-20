const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

/**
 * Section 1 Feature Step Definitions
 */

// Given steps
Given('the user is on sample project page', async function () {
  await this.section1Page.goto();
});

Given('the user selects is on sample project page', async function () {
  await this.section1Page.goto();
});

Given('the user is on the sample project page', async function () {
  await this.section1Page.goto();
});

// When steps - Film dropdown interactions
When('the user clicks on Choose Film dropdown in Section 1', async function () {
  await this.section1Page.clickFilmDropdown();
  // Playwright auto-waits for dropdown to open
});

When('user clicks on Choose Film dropdown in Section 1', async function () {
  await this.section1Page.clickFilmDropdown();
  // Playwright auto-waits for dropdown to open
});

When('the user enters {string} in the Choose Film field', async function (searchText) {
  await this.section1Page.typeFilmSearch(searchText);
});

When('the user selects {string} from the dropdown', async function (filmName) {
  await this.section1Page.selectFilm(filmName);
});

When('the user selects {string} from the film dropdown', async function (filmName) {
  await this.section1Page.clickFilmDropdown();
  // Playwright auto-waits for options to load
  await this.section1Page.selectFilm(filmName);
});

When('the user selects {string}', async function (filmName) {
  await this.section1Page.clickFilmDropdown();
  // Playwright auto-waits for options to load
  await this.section1Page.selectFilm(filmName);
});

// When steps - Text field interactions
When('the user clicks on {string} field', async function (fieldName) {
  await this.section1Page.clickFieldByName(fieldName);
});

When('the user clicks {string} field', async function (fieldName) {
  await this.section1Page.clickFieldByName(fieldName);
});

When('the user enters {string} in the text field', async function (text) {
  await this.section1Page.enterText(text);
});

When('the user enters {string}', async function (text) {
  await this.section1Page.enterText(text);
});

When('the user leaves the text field empty', async function () {
  // Do nothing - field is already empty (no wait needed)
});

// When steps - Checkbox interactions
When('the user sets checkbox to {string}', async function (state) {
  await this.section1Page.setCheckboxState(state);
});

When('the user checks the checkbox', async function () {
  await this.section1Page.checkCheckbox();
});

// When steps - Button clicks (dynamic)
When('the user clicks {string} button for Section 1', async function (buttonName) {
  await this.section1Page.clickButtonByName(buttonName);
});

When('the user clicks {string} button for section 1', async function (buttonName) {
  await this.section1Page.clickButtonByName(buttonName);
});

When('the user clicks {string} button for choose a film field', async function (buttonName) {
  await this.section1Page.clickButtonByName(buttonName);
});

// Then steps - Verify film dropdown options
Then('the following options should be visible in Section 1:', async function (dataTable) {
  const expectedOptions = dataTable.raw().slice(1).map(row => row[0].trim());
  const actualOptions = await this.section1Page.getFilmOptions();
  
  // Normalize options for comparison
  const normalizedActual = actualOptions.map(opt => opt.trim());
  const normalizedExpected = expectedOptions.map(opt => opt.trim());
  
  // Check if all expected options are present
  for (const expected of normalizedExpected) {
    const found = normalizedActual.some(actual => 
      actual.includes(expected) || expected.includes(actual)
    );
    
    if (!found) {
      throw new Error(`Expected option "${expected}" not found in dropdown. Available options: ${normalizedActual.join(', ')}`);
    }
  }
});

Then('following options should be visible:', async function (dataTable) {
  const expectedOptions = dataTable.raw().map(row => row[0].trim()).filter(opt => opt !== 'Option');
  const actualOptions = await this.section1Page.getFilmOptions();
  
  // Normalize options for comparison
  const normalizedActual = actualOptions.map(opt => opt.trim());
  const normalizedExpected = expectedOptions.map(opt => opt.trim());
  
  // Check if all expected options are present
  for (const expected of normalizedExpected) {
    const found = normalizedActual.some(actual => 
      actual.includes(expected) || expected.includes(actual)
    );
    
    if (!found) {
      throw new Error(`Expected option "${expected}" not found in dropdown. Available options: ${normalizedActual.join(', ')}`);
    }
  }
});

Then('the following options should be visible:', async function (dataTable) {
  const expectedOptions = dataTable.raw().map(row => row[0].trim()).filter(opt => opt !== 'Option');
  const actualOptions = await this.section1Page.getFilmOptions();
  
  // Normalize options for comparison
  const normalizedActual = actualOptions.map(opt => opt.trim());
  const normalizedExpected = expectedOptions.map(opt => opt.trim());
  
  // Check if all expected options are present
  for (const expected of normalizedExpected) {
    const found = normalizedActual.some(actual => 
      actual.includes(expected) || expected.includes(actual)
    );
    
    if (!found) {
      throw new Error(`Expected option "${expected}" not found in dropdown. Available options: ${normalizedActual.join(', ')}`);
    }
  }
});

// Then steps - Verify film field value
Then('the film field should display {string}', async function (expectedValue) {
  const actualValue = await this.section1Page.getSelectedFilm();
  expect(actualValue).toBe(expectedValue);
});

Then('the user should see {string} selected in the field', async function (expectedValue) {
  const actualValue = await this.section1Page.getSelectedFilm();
  expect(actualValue).toBe(expectedValue);
});

Then('the film field should be empty', async function () {
  const value = await this.section1Page.getSelectedFilm();
  expect(value).toBe('');
});

Then('the film field should remain empty', async function () {
  const value = await this.section1Page.getSelectedFilm();
  expect(value).toBe('');
});

Then('the user should see empty field', async function () {
  const value = await this.section1Page.getSelectedFilm();
  expect(value).toBe('');
});

// Then steps - Verify checkbox
Then('checkbox text should display {string}', async function (expectedText) {
  const actualText = await this.section1Page.getCheckboxText();
  expect(actualText).toBe(expectedText);
});

Then('user should see checkbox text as {string}', async function (expectedText) {
  const actualText = await this.section1Page.getCheckboxText();
  expect(actualText).toBe(expectedText);
});

Then('checkbox text should change to {string}', async function (expectedText) {
  // Playwright auto-waits for the text content to be available
  const actualText = await this.section1Page.getCheckboxText();
  expect(actualText).toBe(expectedText);
});

Then('checkbox text should remain {string}', async function (expectedText) {
  const actualText = await this.section1Page.getCheckboxText();
  expect(actualText).toBe(expectedText);
});

Then('the checkbox should be checked', async function () {
  const isChecked = await this.section1Page.isCheckboxChecked();
  expect(isChecked).toBeTruthy();
});

// Then steps - Verify text field
Then('the text field should be empty', async function () {
  const value = await this.section1Page.getTextFieldValue();
  expect(value).toBe('');
});

Then('the text field should remain empty', async function () {
  const value = await this.section1Page.getTextFieldValue();
  expect(value).toBe('');
});

// Then steps - Verify banner messages
Then('a banner should appear: {string}', async function (expectedMessage) {
  const bannerText = await this.section1Page.getBannerText();
  expect(bannerText).toContain(expectedMessage);
});

// Then steps - Verify error messages
Then('the following errors should appear in Section 1:', async function (dataTable) {
  const expectedErrors = dataTable.raw().slice(1).map(row => row[0].trim());
  const errorText = await this.section1Page.getErrorAlertText();
  
  expect(errorText).not.toBeNull();
  
  // Check if all expected errors are present in the error message
  for (const expectedError of expectedErrors) {
    expect(errorText).toContain(expectedError);
  }
});

Then('the following errors should appear:', async function (dataTable) {
  const expectedErrors = dataTable.raw().map(row => row[0].trim()).filter(err => err !== 'Error Message');
  const errorText = await this.section1Page.getErrorAlertText();
  
  expect(errorText).not.toBeNull();
  
  // Check if all expected errors are present in the error message
  for (const expectedError of expectedErrors) {
    expect(errorText).toContain(expectedError);
  }
});

Then('the following error should appear:', async function (dataTable) {
  const expectedErrors = dataTable.raw().map(row => row[0].trim()).filter(err => err !== 'Error Message');
  const errorText = await this.section1Page.getErrorAlertText();
  
  expect(errorText).not.toBeNull();
  
  // Check if all expected errors are present in the error message
  for (const expectedError of expectedErrors) {
    expect(errorText).toContain(expectedError);
  }
});

// Then steps - Verify multiple fields are empty
Then('the following fields should be empty:', async function (dataTable) {
  const fields = dataTable.raw().slice(1).map(row => row[0].trim());
  
  for (const field of fields) {
    const isEmpty = await this.section1Page.isFieldEmpty(field);
    
    if (!isEmpty) {
      throw new Error(`Field "${field}" should be empty but has a value`);
    }
  }
});

Then('the use should see following fields empty:', async function (dataTable) {
  const fields = dataTable.raw().map(row => row[0].trim());
  
  for (const field of fields) {
    const isEmpty = await this.section1Page.isFieldEmpty(field);
    
    if (!isEmpty) {
      throw new Error(`Field "${field}" should be empty but has a value`);
    }
  }
});

// Then step - Verify specific error message appears (works for both Section 1 and Section 2)
Then('error msg should appear {string}', async function (expectedErrorMessage) {
  // Try section1Page first, then section2Page if section1 is not available
  const pageObject = this.section1Page || this.section2Page;
  
  // Check if error message is visible using page object method
  const isVisible = await pageObject.isSpecificErrorVisible(expectedErrorMessage);
  expect(isVisible).toBe(true);
  
  // Get and verify the exact text using page object method
  const actualText = await pageObject.getSpecificErrorText(expectedErrorMessage);
  expect(actualText).not.toBeNull();
  expect(actualText.trim()).toBe(expectedErrorMessage);
});

