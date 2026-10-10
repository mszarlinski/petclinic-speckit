Feature: Homepage skeleton
  As a developer verifying the project scaffold
  I want the homepage to load
  So that I know the BDD acceptance pipeline is wired up before any clinic feature exists

  Scenario: Visiting the homepage
    Given I am on the homepage
    Then I should see the heading "Petclinic"
