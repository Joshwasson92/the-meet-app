import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents numberChange={() => {}} />);
  });

  test("render NumberOfEvents", () => {
    expect(NumberOfEventsWrapper.find(".numbercount")).toHaveLength(1);
  });
  test("accurate input number of events", () => {
    let eventsNumber = NumberOfEventsWrapper.prop("numberOfEvents");
    expect(NumberOfEventsWrapper.find(".events-number").prop("value")).toBe(
      eventsNumber
    );
  });
  test("prevent negative number entries", () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: 30 });
    NumberOfEventsWrapper.find(".numberinput").simulate("change", {
      target: { value: -5 },
    });
  });
  test("prevent non number entries", () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: 30 });
    NumberOfEventsWrapper.find(".numberinput").simulate("change", {
      target: { value: "five" },
    });
  });

  test("able to update number of events", () => {
    const totalEventsObject = { target: { value: 15 } };
    NumberOfEventsWrapper.find(".numberinput").simulate(
      "change",
      totalEventsObject
    );
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(15);
  });
});
