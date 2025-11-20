Feature: Sample project automation Section 1 Scenarios

Scenario: Section 1 passes validation
Given the user selects is on sample project page
When user clicks on Choose Film dropdown in Section 1
Then following options should be visible:
| Option |
| The Shawshank Redemption |
| The Godfather |
| The Dark Knight |
| 12 Angry Men |
| Schindler's List |
When the user selects "The Dark" from the dropdown
Then the user should see "The Dark Knight" selected in the field
When the user clicks "Text for selection" field
And the user enters "Test Section 1"
Then user should see checkbox text as "Unchecked"
When the user checks the checkbox
Then the checkbox should be checked
And checkbox text should change to "Checked"
When the user clicks "Validate" button for section 1
Then a banner should appear: "Section 1 is valid"

Scenario: Section 1 resets validation
Given the user selects is on sample project page
When user clicks on Choose Film dropdown in Section 1
Then following options should be visible:
| Option |
| The Shawshank Redemption |
| The Godfather |
| The Dark Knight |
| 12 Angry Men |
| Schindler's List |
When the user enters "The Dark" in the Choose Film field
Then following options should be visible:
| The Dark Knight |
When the user selects "The Dark" from the dropdown
Then the user should see "The Dark Knight" selected in the field
When the user clicks "Text for Section 1" field
And the user enters "Test Section 1"
Then user should see checkbox text as "Unchecked"
When the user checks the checkbox
Then the checkbox should be checked
And checkbox text should change to "Checked"
When the user clicks "Validate" button for section 1
Then a banner should appear: "Section 1 is valid"
When the user clicks "Reset" button for section 1
Then the use should see following fields empty:
| Choose Film |
| Text for Section 1 |
| Checkbox |


Scenario: Verify clear button for choose a film field clears the field
Given the user selects is on sample project page
When user clicks on Choose Film dropdown in Section 1
Then following options should be visible:
| Option |
| The Shawshank Redemption |
| The Godfather |
| The Dark Knight |
| 12 Angry Men |
| Schindler's List |
When the user selects "The Dark" from the dropdown
Then the user should see "The Dark Knight" selected in the field
When the user clicks "Clear" button for choose a film field
Then the user should see empty field


Scenario: Verify No Options appear for invalid film name
Given the user selects is on sample project page
When user clicks on Choose Film dropdown in Section 1
When the user enters "TEST123" in the Choose Film field
Then following options should be visible:
| No options |


Scenario: Section 1 Validate with all fields blank

Given the user is on the sample project page
When the user clicks "Validate" button for section 1
Then the following errors should appear:
| Error Message |
| Please choose a film |
| Text field is required |
| You must check the box |
And the film field should remain empty
And the text field should remain empty
And checkbox text should remain "Unchecked"

Scenario: Section 1 Validate with only film selected

Given the user is on the sample project page
When the user clicks on Choose Film dropdown in Section 1
Then the following options should be visible:
| Option |
| The Shawshank Redemption |
| The Godfather |
| The Dark Knight |
| 12 Angry Men |
| Schindler's List |
When the user selects "The Godfather" from the dropdown
Then the film field should display "The Godfather"
When the user clicks "Validate" button for section 1
Then the following errors should appear:
| Error Message |
| Text field is required |
| You must check the box |
And checkbox text should remain "Unchecked"

Scenario: Section 1 Validate with Film + text entered, checkbox unchecked

Given the user is on the sample project page
When the user selects "The Shawshank Redemption" from the film dropdown
Then the film field should display "The Shawshank Redemption"
When the user enters "Test Section 1" in the text field
Then checkbox text should display "Unchecked"
When the user clicks "Validate" button for section 1
Then the following error should appear:
| Error Message |
| You must check the box |


Scenario: Section 1 Validate with Text + checkbox set, but no film selected

Given the user is on the sample project page
When the user enters "Test Section 1" in the text field
And the user checks the checkbox
Then checkbox text should display "Checked"
When the user clicks "Validate" button for section 1
Then the following error should appear:
| Error Message |
| Please choose a film |

Scenario: Section 1 Validate with Film selected + checkbox checked, but empty text field

Given the user is on the sample project page
When the user clicks on Choose Film dropdown in Section 1
And the user selects "The Dark Knight" from the dropdown
Then the film field should display "The Dark Knight"
When the user leaves the text field empty
And the user checks the checkbox
Then checkbox text should display "Checked"
When the user clicks "Validate" button for section 1
Then the following error should appear:
| Error Message |
| Text field is required |