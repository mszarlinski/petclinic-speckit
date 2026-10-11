Feature: Owners header navigation
  As clinic staff
  I want an "Owners" entry in the site header with an "Add new" action
  So that I can reach owner registration without knowing its URL

  Scenario: The header shows an Owners entry distinct from Home
    Given I am on the homepage
    Then I should see an "Owners" entry in the header distinct from "Home"

  Scenario: Opening the Owners menu reveals an Add new item
    Given I am on the homepage
    When I open the "Owners" menu in the header
    Then I should see an "Add new" item inside the "Owners" menu

  Scenario: Selecting Add new reaches the registration form
    Given I am on the homepage
    When I open the "Owners" menu in the header
    And I select "Add new" from the "Owners" menu
    Then I should be on the owner registration page with the form ready

  Scenario: The registration form is reachable using only header navigation
    Given I am on the homepage
    When I navigate to owner registration using only the header
    And I submit a valid owner registration
    Then the owner is saved without ever navigating to the registration page by its address

  Scenario: The Owners entry reflects the active section after navigating there
    Given I am on the homepage
    When I navigate to owner registration using only the header
    Then the "Owners" entry in the header shows an active state

  Scenario: Selecting Add new again while already on the registration page keeps it ready
    Given I am on the owner registration page reached via the header
    When I open the "Owners" menu in the header
    And I select "Add new" from the "Owners" menu
    Then I should be on the owner registration page with the form ready

  Scenario: The Owners entry remains available on the owner detail page
    Given I have just registered an owner via the header
    Then I should see an "Owners" entry in the header distinct from "Home"
    And the "Owners" entry in the header shows an active state

  Scenario: Add new remains reachable on a narrow viewport
    Given I am on the homepage with a narrow viewport
    When I open the "Owners" menu in the header
    Then the "Add new" item inside the "Owners" menu is fully visible on screen
