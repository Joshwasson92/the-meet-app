import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";

describe("<Event /> component", () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[1]} />);
  });

  test("render event", () => {
    expect(EventWrapper.find(".event")).toHaveLength(1);
  });

  test("render an event summary", () => {
    expect(EventWrapper.find(".summary")).toHaveLength(1);
  });
  test("render an event location", () => {
    expect(EventWrapper.find(".location")).toHaveLength(1);
  });

  test("description element is hidden", () => {
    expect(EventWrapper.state("collapsed")).toBe(true);
  });

  // Button testing

  test("render an event show details button", () => {
    expect(EventWrapper.find(".show-button")).toHaveLength(1);
  });

  test("show event details", () => {
    EventWrapper.find(".show-button").simulate("click");
    expect(EventWrapper.state("collapsed")).toBe(false);
  });
});
