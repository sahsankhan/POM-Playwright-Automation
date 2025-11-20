/**
 * Section 2 Page Object
 * Contains all elements and methods for Section 2 validation
 */
class Section2Page {
  constructor(page) {
    this.page = page;
    
    // Base locators for Section 2
    this.pageTitle = '//h1[normalize-space(.)="Validation Demo — Two Sections"]';
    this.filmDropdownInput = "//div[@data-testid='s2-film-input']//input";
    this.filmOptions = "//li[@role='option']";
    this.noOptionsItem = "//div[contains(@class,'MuiAutocomplete-noOptions') and normalize-space()='No options']";
    this.textField = "//label[normalize-space()='Text for section 2']/following::input[1]";
    this.checkbox = "//span[@data-testid='s2-checkbox']/input[@type='checkbox']";
    this.checkboxTextLocator = "//span[@data-testid='s2-checkbox']/parent::label//span[contains(@class,'FormControlLabel-label')]";
    this.clearFilmButton = "//div[@data-testid='s2-film-input']//button[@title='Clear']";
    this.validateBtn = "//button[@data-testid='s2-validate-btn']";
    this.resetBtn = "//button[@data-testid='s2-reset-btn']";
    this.banner = "[data-testid='s2-success-alert'] .MuiAlert-message";
    this.errorAlertMessage = "[data-testid='s2-error-alert'] .MuiAlert-message";
    this.infoAlertMessage = "[data-testid='s2-error-alert'] .MuiAlert-message";
  }

  /**
   * Navigate to sample project page
   */
  async goto() {
    await this.page.goto('https://sample-project-dusky.vercel.app/');
    await this.page.waitForSelector(this.pageTitle, { timeout: 30000 });
  }

  /**
   * Click on film dropdown
   */
  async clickFilmDropdown() {
    await this.page.click(this.filmDropdownInput);
  }

  /**
   * Type in film search field
   * @param {string} query - Search query
   */
  async typeFilmSearch(query) {
    await this.page.fill(this.filmDropdownInput, query);
    // Playwright auto-waits for options to load - no explicit wait needed
  }

  /**
   * Get all film options from dropdown
   * @returns {Promise<Array<string>>} Array of option texts
   */
  async getFilmOptions() {
    try {
      await Promise.race([
        this.page.waitForSelector(this.filmOptions, { timeout: 2000 }),
        this.page.waitForSelector(this.noOptionsItem, { timeout: 2000 })
      ]).catch(() => {});

      const noOptionsVisible = await this.page.isVisible(this.noOptionsItem);
      if (noOptionsVisible) {
        return ['No options'];
      }

      const options = await this.page.locator(this.filmOptions).allTextContents();
      return options.length > 0 ? options : [];
    } catch (error) {
      return [];
    }
  }

  /**
   * Select film from dropdown by partial text
   * @param {string} filmPartial - Partial film name
   */
  async selectFilm(filmPartial) {
    const optionSelector = `//li[@role='option' and contains(normalize-space(), "${filmPartial}")]`;
    await this.page.click(optionSelector);
    // Playwright auto-waits for the element to be actionable before clicking
  }

  /**
   * Get selected film value
   * @returns {Promise<string>} Selected film value
   */
  async getSelectedFilm() {
    return await this.page.inputValue(this.filmDropdownInput);
  }

  /**
   * Enter text in text field
   * @param {string} value - Text to enter
   */
  async enterText(value) {
    await this.page.fill(this.textField, value);
  }

  /**
   * Get text field value
   * @returns {Promise<string>} Text field value
   */
  async getTextFieldValue() {
    return await this.page.inputValue(this.textField);
  }

  /**
   * Get checkbox text (Checked/Unchecked)
   * @returns {Promise<string>} Checkbox text
   */
  async getCheckboxText() {
    const text = await this.page.textContent(this.checkboxTextLocator);
    return text ? text.trim() : '';
  }

  /**
   * Check the checkbox
   */
  async checkCheckbox() {
    await this.page.check(this.checkbox);
  }

  /**
   * Set checkbox state (Checked/Unchecked)
   * @param {string} state - "Checked" or "Unchecked"
   */
  async setCheckboxState(state) {
    const normalized = state.toLowerCase();
    if (normalized === 'checked') {
      await this.page.check(this.checkbox);
    } else {
      await this.page.uncheck(this.checkbox);
    }
  }

  /**
   * Check if checkbox is checked
   * @returns {Promise<boolean>} True if checked
   */
  async isCheckboxChecked() {
    return await this.page.isChecked(this.checkbox);
  }

  /**
   * Click validate button
   */
  async clickValidate() {
    await this.page.click(this.validateBtn);
    // Playwright auto-waits for validation to complete
  }

  /**
   * Click reset button
   */
  async clickReset() {
    await this.page.click(this.resetBtn);
    // Playwright auto-waits for reset action to complete
  }

  /**
   * Click clear film button
   */
  async clickClearFilm() {
    await this.page.click(this.clearFilmButton);
    // Playwright auto-waits for clear action to complete
  }

  /**
   * Get banner text
   * @returns {Promise<string|null>} Banner text or null
   */
  async getBannerText() {
    try {
      await this.page.waitForSelector(this.banner, { timeout: 5000 });
      const text = await this.page.textContent(this.banner);
      return text ? text.trim() : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get error alert text
   * @returns {Promise<string|null>} Error alert text or null
   */
  async getErrorAlertText() {
    try {
      const isVisible = await this.page.isVisible(this.errorAlertMessage);
      if (!isVisible) return null;
      
      const text = await this.page.textContent(this.errorAlertMessage);
      return text ? text.trim() : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get info alert text
   * @returns {Promise<string|null>} Info alert text or null
   */
  async getInfoAlertText() {
    try {
      const isVisible = await this.page.isVisible(this.infoAlertMessage);
      if (!isVisible) return null;
      
      const text = await this.page.textContent(this.infoAlertMessage);
      return text ? text.trim() : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Dynamic button click based on button name
   * @param {string} buttonName - Button name (e.g., "Validate", "Reset", "Clear")
   */
  async clickButtonByName(buttonName) {
    const normalized = buttonName.toLowerCase();
    switch (normalized) {
      case 'validate':
        await this.clickValidate();
        break;
      case 'reset':
        await this.clickReset();
        break;
      case 'clear':
        await this.clickClearFilm();
        break;
      default:
        throw new Error(`Unknown button: ${buttonName}`);
    }
  }

  /**
   * Dynamic field click based on field name
   * @param {string} fieldName - Field name
   */
  async clickFieldByName(fieldName) {
    const normalized = fieldName.toLowerCase();
    if (normalized.includes('text')) {
      await this.page.click(this.textField);
    } else if (normalized.includes('film')) {
      await this.clickFilmDropdown();
    } else {
      throw new Error(`Unknown field: ${fieldName}`);
    }
  }

  /**
   * Check if field is empty by field name
   * @param {string} fieldName - Field name
   * @returns {Promise<boolean>} True if field is empty
   */
  async isFieldEmpty(fieldName) {
    const normalized = fieldName.toLowerCase();
    
    if (normalized.includes('film')) {
      const value = await this.getSelectedFilm();
      return value === '' || value === null;
    } else if (normalized.includes('text')) {
      const value = await this.getTextFieldValue();
      return value === '' || value === null;
    } else if (normalized.includes('checkbox')) {
      const isChecked = await this.isCheckboxChecked();
      return !isChecked;
    }
    
    return false;
  }

  /**
   * Get all error messages from alert
   * @returns {Promise<Array<string>>} Array of error messages
   */
  async getAllErrorMessages() {
    try {
      await this.page.waitForSelector(this.errorAlertMessage, { timeout: 5000 });
      const errorText = await this.getErrorAlertText();
      
      if (!errorText) return [];
      
      const messages = errorText
        .split(/[\n•]/)
        .map(msg => msg.trim())
        .filter(msg => msg.length > 0);
      
      return messages;
    } catch (error) {
      return [];
    }
  }

  /**
   * Get specific error message locator by text
   * @param {string} errorText - The exact error message text
   * @returns {string} XPath locator for the error message
   */
  getSpecificErrorLocator(errorText) {
    return `//div[text()='${errorText}']`;
  }

  /**
   * Check if specific error message is visible
   * @param {string} errorText - The exact error message text
   * @returns {Promise<boolean>} True if error message is visible
   */
  async isSpecificErrorVisible(errorText) {
    try {
      const locator = this.getSpecificErrorLocator(errorText);
      const errorElement = this.page.locator(locator);
      await errorElement.waitFor({ state: 'visible', timeout: 5000 });
      return await errorElement.isVisible();
    } catch (error) {
      return false;
    }
  }

  /**
   * Get the text of a specific error message
   * @param {string} errorText - The exact error message text
   * @returns {Promise<string|null>} The error message text or null if not found
   */
  async getSpecificErrorText(errorText) {
    try {
      const locator = this.getSpecificErrorLocator(errorText);
      const errorElement = this.page.locator(locator);
      await errorElement.waitFor({ state: 'visible', timeout: 5000 });
      return await errorElement.textContent();
    } catch (error) {
      return null;
    }
  }
}

module.exports = Section2Page;

