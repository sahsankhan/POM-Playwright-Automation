@Section2

Feature: Sample project automation Section 2 Scenarios

  Scenario: Section 2 passes validation
    Given the user is on the sample project page
    When the user clicks on Choose Film dropdown in Section 2
    Then the following options should be visible in Section 2:
      | Option                   |
      | The Shawshank Redemption |
      | The Godfather            |
      | The Dark Knight          |
      | 12 Angry Men             |
      | Schindler's List         |
    When the user selects "The Dark" from the Section 2 dropdown
    Then the user should see "The Dark Knight" selected in Section 2 field
    When the user clicks "Text for selection" field in Section 2
    And the user enters "Test Section 2" in Section 2 text field
    Then the checkbox text in Section 2 should display "Unchecked"
    When the user checks the checkbox in Section 2
    Then the checkbox in Section 2 should be checked
    And the checkbox text in Section 2 should display "Checked"
    When the user clicks "Validate" button for section 2
    Then a banner should appear for Section 2: "Section 2 is valid"

  Scenario: Section 2 resets validation
    Given the user is on the sample project page
    When the user clicks on Choose Film dropdown in Section 2
    Then the following options should be visible in Section 2:
      | Option                   |
      | The Shawshank Redemption |
      | The Godfather            |
      | The Dark Knight          |
      | 12 Angry Men             |
      | Schindler's List         |
    When the user enters "The Dark" in the Section 2 film field
    Then the following options should be visible in Section 2:
      | Option          |
      | The Dark Knight |
    When the user selects "The Dark" from the Section 2 dropdown
    Then the user should see "The Dark Knight" selected in Section 2 field
    When the user clicks "Text for Section 2" field
    And the user enters "Test Section 2" in Section 2 text field
    Then the checkbox text in Section 2 should display "Unchecked"
    When the user checks the checkbox in Section 2
    Then the checkbox in Section 2 should be checked
    And the checkbox text in Section 2 should display "Checked"
    When the user clicks "Validate" button for section 2
    Then a banner should appear for Section 2: "Section 2 is valid"
    When the user clicks "Reset" button for section 2
    Then the user should see following Section 2 fields empty:
      | Choose Film        |
      | Text for Section 2 |
      | Checkbox           |

  Scenario: Verify clear button clears Section 2 film field
    Given the user is on the sample project page
    When the user clicks on Choose Film dropdown in Section 2
    Then the following options should be visible in Section 2:
      | Option                   |
      | The Shawshank Redemption |
      | The Godfather            |
      | The Dark Knight          |
      | 12 Angry Men             |
      | Schindler's List         |
    When the user selects "The Dark" from the Section 2 dropdown
    Then the user should see "The Dark Knight" selected in Section 2 field
    When the user clicks "Clear" button for Section 2 film field
    Then the Section 2 film field should be empty

  Scenario: Verify No Options appear for invalid film name in Section 2
    Given the user is on the sample project page
    When the user clicks on Choose Film dropdown in Section 2
    When the user enters "TEST123" in the Section 2 film field
    Then the following options should be visible in Section 2:
      | No options |

  Scenario: Section 2 Validate with all fields blank
    Given the user is on the sample project page
    When the user clicks "Validate" button for section 2
    Then the following Section 2 errors should appear:
      | Error Message          |
      | Please choose a film.  |
      | Text field is required |
      | You must check the box |
    And the Section 2 film field should remain empty
    And the Section 2 text field should remain empty
    And the checkbox text in Section 2 should display "Unchecked"

  Scenario: Section 2 Validate with only film selected
    Given the user is on the sample project page
    When the user clicks on Choose Film dropdown in Section 2
    Then the following options should be visible in Section 2:
      | Option                   |
      | The Shawshank Redemption |
      | The Godfather            |
      | The Dark Knight          |
      | 12 Angry Men             |
      | Schindler's List         |
    When the user selects "The Godfather" from the Section 2 dropdown
    Then the Section 2 film field should display "The Godfather"
    When the user clicks "Validate" button for section 2
    Then the following Section 2 errors should appear:
      | Error Message          |
      | Text field is required |
      | You must check the box |
    And the checkbox text in Section 2 should display "Unchecked"

  Scenario: Section 2 Validate with Film + text entered, checkbox unchecked
    Given the user is on the sample project page
    When the user selects "The Shawshank Redemption" from the Section 2 dropdown
    Then the Section 2 film field should display "The Shawshank Redemption"
    When the user enters "Test Section 2" in Section 2 text field
    Then the checkbox text in Section 2 should display "Unchecked"
    When the user clicks "Validate" button for section 2
    Then the following Section 2 error should appear:
      | Error Message          |
      | You must check the box |

  Scenario: Section 2 Validate with Text + checkbox set, but no film selected
    Given the user is on the sample project page
    When the user enters "Test Section 2" in Section 2 text field
    And the user checks the checkbox in Section 2
    Then the checkbox text in Section 2 should display "Checked"
    When the user clicks "Validate" button for section 2
    Then the following Section 2 error should appear:
      | Error Message        |
      | Please choose a film |

  Scenario: Section 2 Validate with Film selected + checkbox checked, but empty text field
    Given the user is on the sample project page
    When the user selects "The Dark Knight" from the Section 2 dropdown
    Then the Section 2 film field should display "The Dark Knight"
    When the user leaves the Section 2 text field empty
    And the user checks the checkbox in Section 2
    Then the checkbox text in Section 2 should display "Checked"
    When the user clicks "Validate" button for section 2
    Then the following Section 2 error should appear:
      | Error Message          |
      | Text field is required |

Scenario: Section 2 Validate with using characters in text section field
Given the user is on the sample project page
When the user clicks on Choose Film dropdown in Section 2
Then the following options should be visible in Section 2:
| Option |
| The Shawshank Redemption |
| The Godfather |
| The Dark Knight |
| 12 Angry Men |
| Schindler's List |
When the user selects "The Dark" from the Section 2 dropdown
Then the user should see "The Dark Knight" selected in Section 2 field
When the user clicks "Text for selection" field in Section 2
And the user enters "Test Section ++" in Section 2 text field
Then the checkbox text in Section 2 should display "Unchecked"
When the user checks the checkbox in Section 2
Then the checkbox in Section 2 should be checked
And the checkbox text in Section 2 should display "Checked"
When the user clicks "Validate" button for section 2
Then error msg should appear "Text contains invalid characters (only letters, numbers and spaces allowed)"