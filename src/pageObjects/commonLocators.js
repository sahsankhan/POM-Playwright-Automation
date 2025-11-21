/**
 * Common Locators
 * Shared locator definitions used across multiple page objects
 */

const CommonLocators = {
  // Page Title
  pageTitle: 'h1',
  pageTitleText: 'Mainteny — QA Demo',

  // Dropdown Locators
  filmDropdownInput: 'div.MuiAutocomplete-inputRoot',
  filmOptions: "li[role='option']",
  noOptionsItem: "//div[contains(@class,'MuiAutocomplete-noOptions') and normalize-space()='No options']",

  // Text Field Locators
  textField: 'Write your review',

  // Checkbox Locators
  checkboxTextLocator: 'span.MuiFormControlLabel-label',

  // Button Locators
  clearFilmButton: 'Clear'
};

module.exports = CommonLocators;

