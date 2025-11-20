const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

/**
 * Section 2 Feature Step Definitions
 */

// When steps - Film dropdown interactions for Section 2
When('the user clicks on Choose Film dropdown in Section 2', async function () {
  await this.section2Page.clickFilmDropdown();
  await this.page.waitForTimeout(500);
});

// Alias for the above step (without "the")
When('user clicks on Choose Film dropdown in Section 2', async function () {
  await this.section2Page.clickFilmDropdown();
  await this.page.waitForTimeout(500);
});

When('the user enters {string} in the Section 2 film field', async function (searchText) {
  await this.section2Page.typeFilmSearch(searchText);
});

When('the user selects {string} from the Section 2 dropdown', async function (filmName) {
  // Check if dropdown is already open, if not click it
  const dropdownOpen = await this.page.isVisible("//li[@role='option']");
  if (!dropdownOpen) {
    await this.section2Page.clickFilmDropdown();
    await this.page.waitForTimeout(500);
  }
  await this.section2Page.selectFilm(filmName);
});

// When steps - Text field interactions for Section 2
When('the user clicks {string} field in Section 2', async function (fieldName) {
  await this.section2Page.clickFieldByName(fieldName);
});

When('the user enters {string} in Section 2 text field', async function (text) {
  await this.section2Page.enterText(text);
});

When('the user leaves the Section 2 text field empty', async function () {
  // Do nothing - field is already empty
  await this.page.waitForTimeout(100);
});

// When steps - Checkbox interactions for Section 2
When('the user checks the checkbox in Section 2', async function () {
  await this.section2Page.checkCheckbox();
});

When('the user sets checkbox to {string} in Section 2', async function (state) {
  await this.section2Page.setCheckboxState(state);
});

// When steps - Button clicks for Section 2
When('the user clicks {string} button for section 2', async function (buttonName) {
  await this.section2Page.clickButtonByName(buttonName);
});

When('the user clicks {string} button for Section 2 film field', async function (buttonName) {
  await this.section2Page.clickButtonByName(buttonName);
});

// Then steps - Verify film dropdown options for Section 2
Then('the following options should be visible in Section 2:', async function (dataTable) {
  const expectedOptions = dataTable.raw().map(row => row[0].trim()).filter(opt => opt !== 'Option');
  const actualOptions = await this.section2Page.getFilmOptions();
  
  const normalizedActual = actualOptions.map(opt => opt.trim());
  const normalizedExpected = expectedOptions.map(opt => opt.trim());
  
  for (const expected of normalizedExpected) {
    const found = normalizedActual.some(actual => 
      actual.includes(expected) || expected.includes(actual)
    );
    
    if (!found) {
      throw new Error(`Expected option "${expected}" not found in Section 2 dropdown. Available options: ${normalizedActual.join(', ')}`);
    }
  }
});

// Then steps - Verify film field value for Section 2
Then('the user should see {string} selected in Section 2 field', async function (expectedValue) {
  const actualValue = await this.section2Page.getSelectedFilm();
  expect(actualValue).toBe(expectedValue);
});

Then('the Section 2 film field should display {string}', async function (expectedValue) {
  const actualValue = await this.section2Page.getSelectedFilm();
  expect(actualValue).toBe(expectedValue);
});

Then('the Section 2 film field should be empty', async function () {
  const value = await this.section2Page.getSelectedFilm();
  expect(value).toBe('');
});

Then('the Section 2 film field should remain empty', async function () {
  const value = await this.section2Page.getSelectedFilm();
  expect(value).toBe('');
});

// Then steps - Verify checkbox for Section 2
Then('the checkbox text in Section 2 should display {string}', async function (expectedText) {
  const actualText = await this.section2Page.getCheckboxText();
  expect(actualText).toBe(expectedText);
});

Then('the checkbox in Section 2 should be checked', async function () {
  const isChecked = await this.section2Page.isCheckboxChecked();
  expect(isChecked).toBeTruthy();
});

// Then steps - Verify text field for Section 2
Then('the Section 2 text field should be empty', async function () {
  const value = await this.section2Page.getTextFieldValue();
  expect(value).toBe('');
});

Then('the Section 2 text field should remain empty', async function () {
  const value = await this.section2Page.getTextFieldValue();
  expect(value).toBe('');
});

// Then steps - Verify banner messages for Section 2
Then('a banner should appear for Section 2: {string}', async function (expectedMessage) {
  const bannerText = await this.section2Page.getBannerText();
  expect(bannerText).toContain(expectedMessage);
});

// Then steps - Verify error messages for Section 2
Then('the following Section 2 errors should appear:', async function (dataTable) {
  const expectedErrors = dataTable.raw().map(row => row[0].trim()).filter(err => err !== 'Error Message');
  const errorText = await this.section2Page.getErrorAlertText();
  
  expect(errorText).not.toBeNull();
  
  for (const expectedError of expectedErrors) {
    expect(errorText).toContain(expectedError);
  }
});

Then('the following Section 2 error should appear:', async function (dataTable) {
  const expectedErrors = dataTable.raw().map(row => row[0].trim()).filter(err => err !== 'Error Message');
  const errorText = await this.section2Page.getErrorAlertText();
  
  expect(errorText).not.toBeNull();
  
  for (const expectedError of expectedErrors) {
    expect(errorText).toContain(expectedError);
  }
});

// Then steps - Verify multiple fields are empty for Section 2
Then('the user should see following Section 2 fields empty:', async function (dataTable) {
  const fields = dataTable.raw().map(row => row[0].trim());
  
  for (const field of fields) {
    const isEmpty = await this.section2Page.isFieldEmpty(field);
    
    if (!isEmpty) {
      throw new Error(`Section 2 field "${field}" should be empty but has a value`);
    }
  }
});

