import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";
import { mockData } from "../mock-data";
import { eventWrapper } from "@testing-library/user-event/dist/utils";

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

  // Button testing

  test("render an event show details button", () => {
    expect(EventWrapper.find(".show-button")).toHaveLength(1);
  });

  test("show event details", () => {
    EventWrapper.find(".show-button").simulate("click");
    expect(EventWrapper.state("collapsed")).toEqual(false);
  });
});
