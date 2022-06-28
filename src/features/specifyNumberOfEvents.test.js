import App from "../App";
import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("Standard number of events is 30.", ({ given, when, then }) => {
    let AppWrapper;
    given("The user has not changed the number of events.", () => {
      AppWrapper = mount(<App />);
    });

    when("The user searches for events.", () => {
      AppWrapper.update();
    });

    then("The default maximum amount is 30.", () => {
      expect(AppWrapper.find(".event")).toHaveLength(2);
    });
  });

  test("The user changes the number of total events.", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given("The main page is opened.", () => {
      AppWrapper = mount(<App />);
    });

    when("The user changes the number of events.", () => {
      AppWrapper.update();
      AppWrapper.find(".events-number").simulate("change", {
        target: { value: "1" },
      });
    });

    then("The number of events displayed reflects the users choice.", () => {
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      NumberOfEventsWrapper.find(".numberinput").simulate("change", {
        target: { value: 1 },
      });
      expect(AppWrapper.state("numberOfEvents")).toEqual(1);
    });
  });
});
