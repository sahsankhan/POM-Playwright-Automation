const CommonLocators = require('./commonLocators');

/**
 * Season Review Page Object
 * Contains all elements and methods for Season Review validation
 */
class SeasonReviewPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL;
    
    // Common locators from shared file
    this.pageTitle = CommonLocators.pageTitle;
    this.filmDropdownInput = CommonLocators.filmDropdownInput;
    this.filmOptions = CommonLocators.filmOptions;
    this.noOptionsItem = CommonLocators.noOptionsItem;
    this.textField = CommonLocators.textField;
    this.checkboxTextLocator = CommonLocators.checkboxTextLocator;
    this.clearFilmButton = CommonLocators.clearFilmButton;
    
    // Season Review specific locators
    this.checkbox = "[data-testid='s2-checkbox']";
    this.validateBtn = "[data-testid='s2-validate-btn']";
    this.resetBtn = "[data-testid='s2-reset-btn']";
    this.banner = "[data-testid='s2-success-alert'] .MuiAlert-message";
    this.errorAlertMessage = "[data-testid='s2-error-alert'] .MuiAlert-message";
    this.infoAlertMessage = "[data-testid='s2-error-alert'] .MuiAlert-message";
  }

  /**
   * Navigate to sample project page
   */
  async goto() {
    await this.page.goto(this.baseUrl);
    await this.page.locator(this.pageTitle, { hasText: CommonLocators.pageTitleText }).waitFor({ timeout: 30000 });
  }

  /**
   * Click on season dropdown
   */
  async clickFilmDropdown() {
    const dropdown = this.page.locator(this.filmDropdownInput, { hasText: "Choose a season" }).locator('input');
    await dropdown.waitFor({ state: 'visible', timeout: 5000 });
    await dropdown.click();
    await this.page.locator(this.filmOptions).first().waitFor({ state: 'visible', timeout: 5000 });
  }

  /**
   * Type in season search field
   * @param {string} query - Search query
   */
  async typeFilmSearch(query) {
    const dropdown = this.page.locator(this.filmDropdownInput, { hasText: "Choose a season" }).locator('input');
    await dropdown.waitFor({ state: 'visible', timeout: 5000 });
    await dropdown.fill(query);
    // Wait for either options or "No options" to appear
    await Promise.race([
      this.page.locator(this.filmOptions).first().waitFor({ timeout: 5000 }),
      this.page.locator(this.noOptionsItem).waitFor({ timeout: 5000 })
    ]);
  }

  /**
   * Get all season options from dropdown
   * @returns {Promise<Array<string>>} Array of option texts
   */
  async getFilmOptions() {
    try {
      // Wait for either options or no options message
      await Promise.race([
        this.page.locator(this.filmOptions).first().waitFor({ timeout: 2000 }),
        this.page.locator(this.noOptionsItem).waitFor({ timeout: 2000 })
      ]).catch(() => {});

      // Check if "No options" is visible
      const noOptionsVisible = await this.page.locator(this.noOptionsItem).isVisible();
      if (noOptionsVisible) {
        return ['No options'];
      }

      // Get all options
      const options = await this.page.locator(this.filmOptions).allTextContents();
      return options.length > 0 ? options : [];
    } catch (error) {
      return [];
    }
  }

  /**
   * Select season from dropdown by partial text
   * @param {string} filmPartial - Partial season name
   */
  async selectFilm(filmPartial) {
    const optionSelector = `li[role='option']:has-text("${filmPartial}")`;
    await this.page.locator(optionSelector).first().waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator(optionSelector).first().click();
    // Wait for the value to be set
    await this.page.waitForTimeout(300);
  }

  /**
   * Get selected season value
   * @returns {Promise<string>} Selected season value
   */
  async getSelectedFilm() {
    const dropdown = this.page.locator(this.filmDropdownInput, { hasText: "Choose a season" }).locator('input');
    return await dropdown.inputValue();
  }

  /**
   * Enter text in text field
   * @param {string} value - Text to enter
   */
  async enterText(value) {
    const textField = this.page.getByLabel(this.textField).nth(1);
    await textField.waitFor({ state: 'visible', timeout: 5000 });
    await textField.fill(value);
  }

  /**
   * Get text field value
   * @returns {Promise<string>} Text field value
   */
  async getTextFieldValue() {
    const textField = this.page.getByLabel(this.textField).nth(1);
    return await textField.inputValue();
  }

  /**
   * Get checkbox text (Checked/Unchecked)
   * @returns {Promise<string>} Checkbox text
   */
  async getCheckboxText() {
    const checkboxLabel = this.page.locator(this.checkbox).locator('..').locator(this.checkboxTextLocator);
    const text = await checkboxLabel.textContent();
    return text ? text.trim() : '';
  }

  /**
   * Check the checkbox
   */
  async checkCheckbox() {
    const checkbox = this.page.locator(this.checkbox).locator('input');
    await checkbox.waitFor({ state: 'visible', timeout: 5000 });
    await checkbox.check();
    // Wait for checkbox state to update
    await this.page.waitForTimeout(300);
  }

  /**
   * Set checkbox state (Checked/Unchecked)
   * @param {string} state - "Checked" or "Unchecked"
   */
  async setCheckboxState(state) {
    const checkbox = this.page.locator(this.checkbox).locator('input');
    const normalized = state.toLowerCase();
    if (normalized === 'checked') {
      await checkbox.check();
    } else {
      await checkbox.uncheck();
    }
  }

  /**
   * Check if checkbox is checked
   * @returns {Promise<boolean>} True if checked
   */
  async isCheckboxChecked() {
    const checkbox = this.page.locator(this.checkbox).locator('input');
    return await checkbox.isChecked();
  }

  /**
   * Click validate button
   */
  async clickValidate() {
    const validateBtn = this.page.locator(this.validateBtn);
    await validateBtn.waitFor({ state: 'visible', timeout: 5000 });
    await validateBtn.click();
    // Wait for validation result (banner or error)
    await Promise.race([
      this.page.locator(this.banner).waitFor({ timeout: 5000 }),
      this.page.locator(this.errorAlertMessage).waitFor({ timeout: 5000 })
    ]);
  }

  /**
   * Click reset button
   */
  async clickReset() {
    const resetBtn = this.page.locator(this.resetBtn);
    await resetBtn.waitFor({ state: 'visible', timeout: 5000 });
    await resetBtn.click();
    // Wait for fields to be cleared
    await this.page.waitForTimeout(500);
  }

  /**
   * Click clear season button
   */
  async clickClearFilm() {
    const clearBtn = this.page.getByTitle(this.clearFilmButton);
    await clearBtn.waitFor({ state: 'visible', timeout: 5000 });
    await clearBtn.click();
    // Wait for field to be cleared
    await this.page.waitForTimeout(300);
  }

  /**
   * Get banner text
   * @returns {Promise<string|null>} Banner text or null
   */
  async getBannerText() {
    try {
      // Try multiple possible banner selectors
      const bannerSelectors = [
        this.banner,
        "[data-testid='s2-success-alert']",
        ".MuiAlert-standardSuccess",
        "div[role='alert']"
      ];
      
      for (const selector of bannerSelectors) {
        try {
          await this.page.locator(selector).waitFor({ timeout: 2000 });
          const text = await this.page.locator(selector).textContent();
          if (text && text.trim()) {
            return text.trim();
          }
        } catch (e) {
          continue;
        }
      }
      return null;
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
      const isVisible = await this.page.locator(this.errorAlertMessage).isVisible();
      if (!isVisible) return null;
      
      const text = await this.page.locator(this.errorAlertMessage).textContent();
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
      const isVisible = await this.page.locator(this.infoAlertMessage).isVisible();
      if (!isVisible) return null;
      
      const text = await this.page.locator(this.infoAlertMessage).textContent();
      return text ? text.trim() : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Dynamic button click based on button name
   * @param {string} buttonName - Button name (e.g., "Validate", "Submit", "Reset", "Clear")
   */
  async clickButtonByName(buttonName) {
    const normalized = buttonName.toLowerCase();
    switch (normalized) {
      case 'validate':
      case 'submit':
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
    if (normalized.includes('text') || normalized.includes('review')) {
      const textField = this.page.getByLabel(this.textField).nth(1);
      await textField.click();
    } else if (normalized.includes('season') || normalized.includes('film')) {
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
    
    if (normalized.includes('season') || normalized.includes('film')) {
      const value = await this.getSelectedFilm();
      return value === '' || value === null;
    } else if (normalized.includes('text') || normalized.includes('review')) {
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
      await this.page.locator(this.errorAlertMessage).waitFor({ timeout: 5000 });
      const errorText = await this.getErrorAlertText();
      
      if (!errorText) return [];
      
      // Split by common delimiters (newline, bullet points, etc.)
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

module.exports = SeasonReviewPage;
