const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

function getPageObject(world, stepText = '') {
  const lowerStepText = stepText.toLowerCase();
  if (lowerStepText.includes('season review') || lowerStepText.includes('section 2')) {
    return world.seasonReviewPage;
  }
  if (lowerStepText.includes('film review') || lowerStepText.includes('section 1')) {
    return world.filmReviewPage;
  }
  return world.filmReviewPage || world.seasonReviewPage;
}

Given('the user is on Mainteny — QA Demo page', async function () {
  await this.filmReviewPage.goto();
});

Given('the user is on the Mainteny — QA Demo page', async function () {
  await this.seasonReviewPage.goto();
});

When('the user clicks on Choose Film dropdown in {string}', async function (section) {
  const pageObject = getPageObject(this, section);
  if (pageObject === this.seasonReviewPage) {
    await pageObject.clickSeasonDropdown();
  } else {
    await pageObject.clickFilmDropdown();
  }
});

When('user clicks on Choose Film dropdown in {string}', async function (section) {
  const pageObject = getPageObject(this, section);
  if (pageObject === this.seasonReviewPage) {
    await pageObject.clickSeasonDropdown();
  } else {
    await pageObject.clickFilmDropdown();
  }
});

When('the user enters {string} in the {string} film field', async function (searchText, section) {
  const pageObject = getPageObject(this, section);
  if (pageObject === this.seasonReviewPage) {
    await pageObject.typeSeasonSearch(searchText);
  } else {
    await pageObject.typeFilmSearch(searchText);
  }
});

When('the user selects {string} from the {string} dropdown', async function (filmName, section) {
  const pageObject = getPageObject(this, section);
  if (pageObject === this.seasonReviewPage) {
    await pageObject.clickSeasonDropdown();
    await pageObject.selectSeason(filmName);
  } else {
    await pageObject.clickFilmDropdown();
    await pageObject.selectFilm(filmName);
  }
});

When('the user clicks on {string} field', async function (fieldName) {
  await this.filmReviewPage.clickFieldByName(fieldName);
});

When('the user clicks {string} field in {string}', async function (fieldName, section) {
  const pageObject = getPageObject(this, section);
  await pageObject.clickFieldByName(fieldName);
});

When('the user enters {string} in {string} text field', async function (text, section) {
  const pageObject = getPageObject(this, section);
  await pageObject.enterText(text);
});

When('the user leaves the {string} text field empty', async function (section) {
});

When('the user checks the checkbox in {string}', async function (section) {
  const pageObject = getPageObject(this, section);
  await pageObject.checkCheckbox();
});

When('the user clicks {string} button for {string}', async function (buttonName, section) {
  const pageObject = getPageObject(this, section);
  await pageObject.clickButtonByName(buttonName);
});

When('the user clicks {string} button for {string} film field', async function (buttonName, section) {
  const pageObject = getPageObject(this, section);
  await pageObject.clickButtonByName(buttonName);
});

When('the user clicks Submit button for film review', async function () {
  await this.filmReviewPage.clickValidate();
});

When('the user clicks Submit button for season review', async function () {
  await this.seasonReviewPage.clickValidate();
});

Then('the following options should be visible in {string}:', async function (section, dataTable) {
  const pageObject = getPageObject(this, section);
  const expectedOptions = dataTable.raw().map(row => row[0].trim()).filter(opt => opt !== 'Option');
  const actualOptions = pageObject === this.seasonReviewPage 
    ? await pageObject.getSeasonOptions()
    : await pageObject.getFilmOptions();
  const normalizedActual = actualOptions.map(opt => opt.trim());
  const normalizedExpected = expectedOptions.map(opt => opt.trim());
  
  if (normalizedExpected.length !== normalizedActual.length) {
    throw new Error(`Expected ${normalizedExpected.length} options but found ${normalizedActual.length}. Expected: [${normalizedExpected.join(', ')}], Actual: [${normalizedActual.join(', ')}]`);
  }
  
  for (const expected of normalizedExpected) {
    const found = normalizedActual.some(actual => actual === expected);
    if (!found) {
      throw new Error(`Expected option "${expected}" not found in ${section} dropdown. Available options: [${normalizedActual.join(', ')}]`);
    }
  }
});

Then('following options should be visible:', async function (dataTable) {
  const pageObject = getPageObject(this);
  const expectedOptions = dataTable.raw().map(row => row[0].trim()).filter(opt => opt !== 'Option');
  const actualOptions = pageObject === this.seasonReviewPage 
    ? await pageObject.getSeasonOptions()
    : await pageObject.getFilmOptions();
  const normalizedActual = actualOptions.map(opt => opt.trim());
  const normalizedExpected = expectedOptions.map(opt => opt.trim());
  
  if (normalizedExpected.length !== normalizedActual.length) {
    throw new Error(`Expected ${normalizedExpected.length} options but found ${normalizedActual.length}. Expected: [${normalizedExpected.join(', ')}], Actual: [${normalizedActual.join(', ')}]`);
  }
  
  for (const expected of normalizedExpected) {
    const found = normalizedActual.some(actual => actual === expected);
    if (!found) {
      throw new Error(`Expected option "${expected}" not found in dropdown. Available options: [${normalizedActual.join(', ')}]`);
    }
  }
});

Then('the following options should be visible:', async function (dataTable) {
  const pageObject = getPageObject(this);
  const expectedOptions = dataTable.raw().map(row => row[0].trim()).filter(opt => opt !== 'Option');
  const actualOptions = pageObject === this.seasonReviewPage 
    ? await pageObject.getSeasonOptions()
    : await pageObject.getFilmOptions();
  const normalizedActual = actualOptions.map(opt => opt.trim());
  const normalizedExpected = expectedOptions.map(opt => opt.trim());
  
  if (normalizedExpected.length !== normalizedActual.length) {
    throw new Error(`Expected ${normalizedExpected.length} options but found ${normalizedActual.length}. Expected: [${normalizedExpected.join(', ')}], Actual: [${normalizedActual.join(', ')}]`);
  }
  
  for (const expected of normalizedExpected) {
    const found = normalizedActual.some(actual => actual === expected);
    if (!found) {
      throw new Error(`Expected option "${expected}" not found in dropdown. Available options: [${normalizedActual.join(', ')}]`);
    }
  }
});

Then('the user should see {string} selected in the field', async function (expectedValue) {
  const pageObject = getPageObject(this);
  const actualValue = pageObject === this.seasonReviewPage 
    ? await pageObject.getSelectedSeason()
    : await pageObject.getSelectedFilm();
  expect(actualValue).toBe(expectedValue);
});

Then('the user should see {string} selected in {string} field', async function (expectedValue, section) {
  const pageObject = getPageObject(this, section);
  const actualValue = pageObject === this.seasonReviewPage 
    ? await pageObject.getSelectedSeason()
    : await pageObject.getSelectedFilm();
  expect(actualValue).toBe(expectedValue);
});

Then('the {string} film field should display {string}', async function (section, expectedValue) {
  const pageObject = getPageObject(this, section);
  const actualValue = pageObject === this.seasonReviewPage 
    ? await pageObject.getSelectedSeason()
    : await pageObject.getSelectedFilm();
  expect(actualValue).toBe(expectedValue);
});

Then('the {string} film field should be empty', async function (section) {
  const pageObject = getPageObject(this, section);
  const value = pageObject === this.seasonReviewPage 
    ? await pageObject.getSelectedSeason()
    : await pageObject.getSelectedFilm();
  expect(value).toBe('');
});

Then('the {string} film field should remain empty', async function (section) {
  const pageObject = getPageObject(this, section);
  const value = pageObject === this.seasonReviewPage 
    ? await pageObject.getSelectedSeason()
    : await pageObject.getSelectedFilm();
  expect(value).toBe('');
});

Then('the user should see empty field', async function () {
  const pageObject = getPageObject(this);
  const value = pageObject === this.seasonReviewPage 
    ? await pageObject.getSelectedSeason()
    : await pageObject.getSelectedFilm();
  expect(value).toBe('');
});

Then('checkbox text should display {string}', async function (expectedText) {
  const pageObject = getPageObject(this);
  const actualText = await pageObject.getCheckboxText();
  expect(actualText).toBe(expectedText);
});

Then('user should see checkbox text as {string}', async function (expectedText) {
  const pageObject = getPageObject(this);
  const actualText = await pageObject.getCheckboxText();
  expect(actualText).toBe(expectedText);
});

Then('checkbox text should change to {string}', async function (expectedText) {
  const pageObject = getPageObject(this);
  const actualText = await pageObject.getCheckboxText();
  expect(actualText).toBe(expectedText);
});

Then('checkbox text should remain {string}', async function (expectedText) {
  const pageObject = getPageObject(this);
  const actualText = await pageObject.getCheckboxText();
  expect(actualText).toBe(expectedText);
});

Then('the checkbox text in {string} should display {string}', async function (section, expectedText) {
  const pageObject = getPageObject(this, section);
  const actualText = await pageObject.getCheckboxText();
  expect(actualText).toBe(expectedText);
});

Then('the checkbox should be checked', async function () {
  const pageObject = getPageObject(this);
  const isChecked = await pageObject.isCheckboxChecked();
  expect(isChecked).toBeTruthy();
});

Then('the checkbox in {string} should be checked', async function (section) {
  const pageObject = getPageObject(this, section);
  const isChecked = await pageObject.isCheckboxChecked();
  expect(isChecked).toBeTruthy();
});

Then('the text field should be empty', async function () {
  const pageObject = getPageObject(this);
  const value = await pageObject.getTextFieldValue();
  expect(value).toBe('');
});

Then('the text field should remain empty', async function () {
  const pageObject = getPageObject(this);
  const value = await pageObject.getTextFieldValue();
  expect(value).toBe('');
});

Then('the {string} text field should be empty', async function (section) {
  const pageObject = getPageObject(this, section);
  const value = await pageObject.getTextFieldValue();
  expect(value).toBe('');
});

Then('the {string} text field should remain empty', async function (section) {
  const pageObject = getPageObject(this, section);
  const value = await pageObject.getTextFieldValue();
  expect(value).toBe('');
});

Then('a banner should appear: {string}', async function (expectedMessage) {
  const pageObject = getPageObject(this);
  const bannerText = await pageObject.getBannerText();
  expect(bannerText).toContain(expectedMessage);
});

Then('a banner should appear for {string}: {string}', async function (section, expectedMessage) {
  const pageObject = getPageObject(this, section);
  const bannerText = await pageObject.getBannerText();
  expect(bannerText).toContain(expectedMessage);
});

Then('the following errors should appear in {string}:', async function (section, dataTable) {
  const pageObject = getPageObject(this, section);
  const expectedErrors = dataTable.raw().slice(1).map(row => row[0].trim());
  const errorText = await pageObject.getErrorAlertText();
  expect(errorText).not.toBeNull();
  const actualErrors = errorText.split('.').map(err => err.trim()).filter(err => err.length > 0);
  
  for (const expectedError of expectedErrors) {
    const found = actualErrors.some(actual => actual === expectedError);
    if (!found) {
      throw new Error(`Expected error "${expectedError}" not found in ${section}. Actual errors: [${actualErrors.join(', ')}]`);
    }
  }
});

Then('the following errors should appear:', async function (dataTable) {
  const pageObject = getPageObject(this);
  const expectedErrors = dataTable.raw().map(row => row[0].trim()).filter(err => err !== 'Error Message');
  const errorText = await pageObject.getErrorAlertText();
  expect(errorText).not.toBeNull();
  const actualErrors = errorText.split('.').map(err => err.trim()).filter(err => err.length > 0);
  
  for (const expectedError of expectedErrors) {
    const found = actualErrors.some(actual => actual === expectedError);
    if (!found) {
      throw new Error(`Expected error "${expectedError}" not found. Actual errors: [${actualErrors.join(', ')}]`);
    }
  }
});

Then('the following error should appear:', async function (dataTable) {
  const pageObject = getPageObject(this);
  const expectedErrors = dataTable.raw().map(row => row[0].trim()).filter(err => err !== 'Error Message');
  const errorText = await pageObject.getErrorAlertText();
  expect(errorText).not.toBeNull();
  const actualErrors = errorText.split('.').map(err => err.trim()).filter(err => err.length > 0);
  
  for (const expectedError of expectedErrors) {
    const found = actualErrors.some(actual => actual === expectedError);
    if (!found) {
      throw new Error(`Expected error "${expectedError}" not found. Actual errors: [${actualErrors.join(', ')}]`);
    }
  }
});

Then('error msg should appear {string}', async function (expectedErrorMessage) {
  const pageObject = this.filmReviewPage || this.seasonReviewPage;
  const isVisible = await pageObject.isSpecificErrorVisible(expectedErrorMessage);
  expect(isVisible).toBe(true);
  const actualText = await pageObject.getSpecificErrorText(expectedErrorMessage);
  expect(actualText).not.toBeNull();
  expect(actualText.trim()).toBe(expectedErrorMessage);
});

Then('the following fields should be empty:', async function (dataTable) {
  const pageObject = getPageObject(this);
  const fields = dataTable.raw().slice(1).map(row => row[0].trim());
  for (const field of fields) {
    const isEmpty = await pageObject.isFieldEmpty(field);
    if (!isEmpty) {
      throw new Error(`Field "${field}" should be empty but has a value`);
    }
  }
});

Then('the use should see following fields empty:', async function (dataTable) {
  const pageObject = getPageObject(this);
  const fields = dataTable.raw().map(row => row[0].trim());
  for (const field of fields) {
    const isEmpty = await pageObject.isFieldEmpty(field);
    if (!isEmpty) {
      throw new Error(`Field "${field}" should be empty but has a value`);
    }
  }
});

Then('the user should see following {string} fields empty:', async function (section, dataTable) {
  const pageObject = getPageObject(this, section);
  const fields = dataTable.raw().map(row => row[0].trim());
  for (const field of fields) {
    const isEmpty = await pageObject.isFieldEmpty(field);
    if (!isEmpty) {
      throw new Error(`${section} field "${field}" should be empty but has a value`);
    }
  }
});
