Feature: Show and Hide Event details.

  Scenario: When no event has been selected, every event description should be collapsed.
    Given The main page is opened.
    When No event has been selected.
    Then The event description should be hidden.

  Scenario: When a user selects the show details, the description of the event should appear.
    Given The event description is hidden.
    When The user selects show details.
    Then  The description of the correct event will appear.

  Scenario: The user is able to hide details
    Given The logged in user has selected Show Details previously.
    When The user selects Hide Details.
    Then The details will collaspe and be no longer visible. 
