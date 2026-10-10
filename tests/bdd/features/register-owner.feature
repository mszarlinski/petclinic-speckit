Feature: Register an owner
  As clinic staff
  I want to register a pet owner
  So that the clinic can maintain their contact information

  Scenario: Successfully register a new owner
    Given the owner registration form is empty
    When clinic staff enters a valid first name, last name, address, city, and a 10-digit telephone number and submits
    Then the owner is saved
    And the owner's details are displayed

  Scenario: Reject submission with missing required fields
    Given the owner registration form
    When clinic staff submits with one or more required fields left blank
    Then the submission is rejected
    And the user is shown which field(s) are missing

  Scenario: Reject first or last name exceeding the character limit
    Given the owner registration form
    When clinic staff enters a first name or last name longer than 30 characters
    Then the submission is rejected
    And the user is shown that the field exceeds the allowed length

  Scenario: Reject address exceeding the character limit
    Given the owner registration form
    When clinic staff enters an address longer than 255 characters
    Then the submission is rejected
    And the user is shown that the field exceeds the allowed length

  Scenario: Reject city exceeding the character limit
    Given the owner registration form
    When clinic staff enters a city longer than 80 characters
    Then the submission is rejected
    And the user is shown that the field exceeds the allowed length

  Scenario: Reject telephone number that is not exactly 10 digits
    Given the owner registration form
    When clinic staff enters a telephone number that does not contain exactly 10 digits
    Then the submission is rejected
    And the user is shown that the telephone number is invalid

  Scenario: Open owner details immediately after saving
    Given a successfully submitted registration
    When the owner is saved
    Then the system opens the newly created owner's details without further navigation by the user
