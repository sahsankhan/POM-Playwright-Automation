@FilmReview

Feature: Sample project automation Film Review Scenarios

  Scenario: Film Review passes validation
    Given the user selects is on Mainteny — QA Demo page
    When user clicks on Choose Film dropdown in Film Review
    Then following options should be visible:
      | Option                   |
      | The Shawshank Redemption |
      | The Godfather            |
      | The Dark Knight          |
      | 12 Angry Men             |
      | Schindler's List         |
    When the user selects "The Dark" from the dropdown
    Then the user should see "The Dark Knight" selected in the field
    When the user clicks "Write your review" field
    And the user enters "Test Film Review"
    Then user should see checkbox text as "Terms and Conditions (not accepted)"
    When the user checks the checkbox
    Then the checkbox should be checked
    And checkbox text should change to "Terms and Conditions (accepted)"
    When the user clicks "Submit" button for film review
    Then a banner should appear: "Film Review is valid"

  Scenario: Film Review resets validation
    Given the user selects is on sample project page
    When user clicks on Choose Film dropdown in Film Review
    Then following options should be visible:
      | Option                   |
      | The Shawshank Redemption |
      | The Godfather            |
      | The Dark Knight          |
      | 12 Angry Men             |
      | Schindler's List         |
    When the user enters "The Dark" in the Choose Film field
    Then following options should be visible:
      | The Dark Knight          |
    When the user selects "The Dark" from the dropdown
    Then the user should see "The Dark Knight" selected in the field
    When the user clicks "Text for Film Review" field
    And the user enters "Test Film Review"
    Then user should see checkbox text as "Terms and Conditions (not accepted)"
    When the user checks the checkbox
    Then the checkbox should be checked
    And checkbox text should change to "Terms and Conditions (accepted)"
    When the user clicks "Submit" button for film review
    Then a banner should appear: "Film Review is valid"
    When the user clicks "Reset" button for film review
    Then the use should see following fields empty:
      | Choose Film          |
      | Write your review    |
      | Checkbox             |

  Scenario: Verify clear button for choose a film field clears the field
    Given the user selects is on sample project page
    When user clicks on Choose Film dropdown in Film Review
    Then following options should be visible:
      | Option                   |
      | The Shawshank Redemption |
      | The Godfather            |
      | The Dark Knight          |
      | 12 Angry Men             |
      | Schindler's List         |
    When the user selects "The Dark" from the dropdown
    Then the user should see "The Dark Knight" selected in the field
    When the user clicks "Clear" button for choose a film field
    Then the user should see empty field

  Scenario: Verify No Options appear for invalid film name
    Given the user selects is on sample project page
    When user clicks on Choose Film dropdown in Film Review
    When the user enters "TEST123" in the Choose Film field
    Then following options should be visible:
      | No options |

  Scenario: Film Review Validate with all fields blank
    Given the user is on the sample project page
    When the user clicks "Submit" button for film review
    Then the following errors should appear:
      | Error Message            |
      | Please choose a film     |
      | Review field is required |
      | You must check the box   |
    And the film field should remain empty
    And the text field should remain empty
    And checkbox text should remain "Terms and Conditions (not accepted)"

  Scenario: Film Review Validate with only film selected
    Given the user is on the sample project page
    When the user clicks on Choose Film dropdown in Film Review
    Then the following options should be visible:
      | Option                   |
      | The Shawshank Redemption |
      | The Godfather            |
      | The Dark Knight          |
      | 12 Angry Men             |
      | Schindler's List         |
    When the user selects "The Godfather" from the dropdown
    Then the film field should display "The Godfather"
    When the user clicks "Submit" button for film review
    Then the following errors should appear:
      | Error Message             |
      | Review field is required  |
      | You must check the box    |
    And checkbox text should remain "Terms and Conditions (not accepted)"

  Scenario: Film Review Validate with Film + text entered, checkbox unchecked
    Given the user is on the sample project page
    When the user selects "The Shawshank Redemption" from the film dropdown
    Then the film field should display "The Shawshank Redemption"
    When the user enters "Test Film Review" in the text field
    Then checkbox text should display "Terms and Conditions (not accepted)"
    When the user clicks "Submit" button for film review
    Then the following error should appear:
      | Error Message          |
      | You must check the box |

  Scenario: Film Review Validate with Text + checkbox set, but no film selected
    Given the user is on the sample project page
    When the user enters "Test Film Review" in the text field
    And the user checks the checkbox
    Then checkbox text should display "Terms and Conditions (accepted)"
    When the user clicks "Submit" button for film review
    Then the following error should appear:
      | Error Message        |
      | Please choose a film |

  Scenario: Film Review Validate with Film selected + checkbox checked, but empty text field
    Given the user is on the sample project page
    When the user clicks on Choose Film dropdown in Film Review
    And the user selects "The Dark Knight" from the dropdown
    Then the film field should display "The Dark Knight"
    When the user leaves the text field empty
    And the user checks the checkbox
    Then checkbox text should display "Terms and Conditions (accepted)"
    When the user clicks "Submit" button for film review
    Then the following error should appear:
      | Error Message            |
      | Review field is required |

  Scenario: Film Review Validate with using characters in text field
    Given the user selects is on sample project page
    When user clicks on Choose Film dropdown in Film Review
    Then following options should be visible:
      | Option                   |
      | The Shawshank Redemption |
      | The Godfather            |
      | The Dark Knight          |
      | 12 Angry Men             |
      | Schindler's List         |
    When the user selects "The Dark" from the dropdown
    Then the user should see "The Dark Knight" selected in the field
    When the user clicks "Write your review" field
    And the user enters "Test Film Review ++"
    Then user should see checkbox text as "Terms and Conditions (not accepted)"
    When the user checks the checkbox
    Then the checkbox should be checked
    And checkbox text should change to "Terms and Conditions (accepted)"
    When the user clicks "Submit" button for film review
    Then error msg should appear "Text contains invalid characters (only letters, numbers and spaces allowed)"
