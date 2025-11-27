@SeasonReview

Feature: Sample project automation Season Review Scenarios

  @smoke
  Scenario: Season Review passes validation
    Given the user is on the Mainteny — QA Demo page
    When the user clicks on Choose Film dropdown in Season Review
    Then the following options should be visible in Season Review:
      | Option           |
      | Wednesday        |
      | Stranger Things  |
      | Squid Game       |
      | The Witcher      |
      | Daredevil        |
    When the user selects "Stranger" from the Season Review dropdown
    Then the user should see "Stranger Things" selected in Season Review field
    When the user clicks "Write your review" field in Season Review
    And the user enters "Test Season Review" in Season Review text field
    Then the checkbox text in Season Review should display "Terms and Conditions (not accepted)"
    When the user checks the checkbox in Season Review
    Then the checkbox in Season Review should be checked
    And the checkbox text in Season Review should display "Terms and Conditions (accepted)"
    When the user clicks "Submit" button for season review
    Then a banner should appear for Season Review: "Season Review is valid"

  @smoke
  Scenario: Season Review resets validation
    Given the user is on the Mainteny — QA Demo page
    When the user clicks on Choose Film dropdown in Season Review
    Then the following options should be visible in Season Review:
      | Option           |
      | Wednesday        |
      | Stranger Things  |
      | Squid Game       |
      | The Witcher      |
      | Daredevil        |
    When the user enters "Stranger" in the Season Review film field
    Then the following options should be visible in Season Review:
      | Option          |
      | Stranger Things |
    When the user selects "Stranger" from the Season Review dropdown
    Then the user should see "Stranger Things" selected in Season Review field
    When the user clicks "Write your review" field in Season Review
    And the user enters "Test Season Review" in Season Review text field
    Then the checkbox text in Season Review should display "Terms and Conditions (not accepted)"
    When the user checks the checkbox in Season Review
    Then the checkbox in Season Review should be checked
    And the checkbox text in Season Review should display "Terms and Conditions (accepted)"
    When the user clicks "Submit" button for season review
    Then a banner should appear for Season Review: "Season Review is valid"
    When the user clicks "Reset" button for season review
    Then the user should see following Season Review fields empty:
      | Choose a season    |
      | Write your review  |
      | Checkbox           |

  Scenario: Verify clear button clears Season Review film field
    Given the user is on the Mainteny — QA Demo page
    When the user clicks on Choose Film dropdown in Season Review
    Then the following options should be visible in Season Review:
      | Option           |
      | Wednesday        |
      | Stranger Things  |
      | Squid Game       |
      | The Witcher      |
      | Daredevil        |
    When the user selects "Stranger" from the Season Review dropdown
    Then the user should see "Stranger Things" selected in Season Review field
    When the user clicks "Clear" button for Season Review film field
    Then the Season Review film field should be empty

  @negative
  Scenario: Verify No Options appear for invalid film name in Season Review
    Given the user is on the Mainteny — QA Demo page
    When the user clicks on Choose Film dropdown in Season Review
    When the user enters "TEST123" in the Season Review film field
    Then the following options should be visible in Season Review:
      | No options |

  @negative
  Scenario: Season Review Validate with all fields blank
    Given the user is on the Mainteny — QA Demo page
    When the user clicks "Submit" button for season review
    Then the following Season Review errors should appear:
      | Error Message          |
      | Please choose a Season |
      | Review field is required |
      | You must check the box |
    And the Season Review film field should remain empty
    And the Season Review text field should remain empty
    And the checkbox text in Season Review should display "Terms and Conditions (not accepted)"

  @negative
  Scenario: Season Review Validate with only film selected
    Given the user is on the Mainteny — QA Demo page
    When the user clicks on Choose Film dropdown in Season Review
    Then the following options should be visible in Season Review:
      | Option           |
      | Wednesday        |
      | Stranger Things  |
      | Squid Game       |
      | The Witcher      |
      | Daredevil        |
    When the user selects "Squid Game" from the Season Review dropdown
    Then the Season Review film field should display "Squid Game"
    When the user clicks "Submit" button for season review
    Then the following Season Review errors should appear:
      | Error Message          |
      | Review field is required |
      | You must check the box |
    And the checkbox text in Season Review should display "Terms and Conditions (not accepted)"

  @negative
  Scenario: Season Review Validate with Film + text entered, checkbox unchecked
    Given the user is on the Mainteny — QA Demo page
    When the user selects "Wednesday" from the Season Review dropdown
    Then the Season Review film field should display "Wednesday"
    When the user enters "Test Season Review" in Season Review text field
    Then the checkbox text in Season Review should display "Terms and Conditions (not accepted)"
    When the user clicks "Submit" button for season review
    Then the following Season Review error should appear:
      | Error Message          |
      | You must check the box |

  @negative
  Scenario: Season Review Validate with Text + checkbox set, but no film selected
    Given the user is on the Mainteny — QA Demo page
    When the user enters "Test Season Review" in Season Review text field
    And the user checks the checkbox in Season Review
    Then the checkbox text in Season Review should display "Terms and Conditions (accepted)"
    When the user clicks "Submit" button for season review
    Then the following Season Review error should appear:
      | Error Message          |
      | Please choose a Season |

  @negative
  Scenario: Season Review Validate with Film selected + checkbox checked, but empty text field
    Given the user is on the Mainteny — QA Demo page
    When the user selects "The Witcher" from the Season Review dropdown
    Then the Season Review film field should display "The Witcher"
    When the user leaves the Season Review text field empty
    And the user checks the checkbox in Season Review
    Then the checkbox text in Season Review should display "Terms and Conditions (accepted)"
    When the user clicks "Submit" button for season review
    Then the following Season Review error should appear:
      | Error Message          |
      | Review field is required |

  @negative
  Scenario: Season Review Validate with using characters in text field
    Given the user is on the Mainteny — QA Demo page
    When the user clicks on Choose Film dropdown in Season Review
    Then the following options should be visible in Season Review:
      | Option           |
      | Wednesday        |
      | Stranger Things  |
      | Squid Game       |
      | The Witcher      |
      | Daredevil        |
    When the user selects "Daredevil" from the Season Review dropdown
    Then the user should see "Daredevil" selected in Season Review field
    When the user clicks "Write your review" field in Season Review
    And the user enters "Test Season Review ++" in Season Review text field
    Then the checkbox text in Season Review should display "Terms and Conditions (not accepted)"
    When the user checks the checkbox in Season Review
    Then the checkbox in Season Review should be checked
    And the checkbox text in Season Review should display "Terms and Conditions (accepted)"
    When the user clicks "Submit" button for season review
    Then error msg should appear "Text contains invalid characters (only letters, numbers and spaces allowed)"
