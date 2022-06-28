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
    given("The user is logged in.] u");
  });
});
