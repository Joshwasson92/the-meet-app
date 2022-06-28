Feature: The number of events displayed can be changed from 1-30.

  Scenario: Standard number of events is 30.
    Given The user has not changed the number of events.
    When The user searches for events.
    Then The default maximum amount is 30.

  Scenario: The user changes the number of total events.
    Given The main page is opened.
    When The user changes the number of events.
    Then  The number of events displayed reflects the users choice.

