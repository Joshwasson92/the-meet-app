import App from "../App";
import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";

const feature = loadFeature("./src/features/showHideEvents.feature");

defineFeature(feature, (test) => {
  test("When no event has been selected, every event description should be collapsed.", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;

    given("The main page is opened.", () => {
      AppWrapper = mount(<App />);
      AppWrapper.update();
    });

    when("No event has been selected.", () => {});

    then("The event description should be hidden.", () => {
      expect(AppWrapper.find(".event-description")).toHaveLength(0);
    });
  });

  test("When a user selects the show details, the description of the event should appear.", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given("The event description is hidden.", async () => {
      AppWrapper = await mount(<App />);
    });

    when("The user selects show details.", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event-description")).toHaveLength(0);
      AppWrapper.find(".show-button").at(0).simulate("click");
    });

    then("The description of the correct event will appear.", () => {
      expect(AppWrapper.find(".event-description")).toHaveLength(1);
    });
  });

  test("The user is able to hide details", ({ given, when, then }) => {
    let AppWrapper;
    given(
      "The logged in user has selected Show Details previously.",
      async () => {
        AppWrapper = await mount(<App />);
        AppWrapper.update();
        AppWrapper.find(".show-button").at(0).simulate("click");
      }
    );

    when("The user selects Hide Details.", () => {
      AppWrapper.find(".show-button").at(0).simulate("click");
      expect(AppWrapper.find(".event-description")).toHaveLength(0);
    });

    then("The details will collaspe and be no longer visible.", () => {
      expect(AppWrapper.find(".event-description")).toHaveLength(0);
    });
  });
});
