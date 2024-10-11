import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BasicSwitch from "@/components/forms/BasicSwitch";

describe("BasicSwitch", () => {
  it("should render the switch component with correct initial state", () => {
    render(
      <BasicSwitch name="test-switch" enabled={false} onChange={() => {}} />,
    );

    const switchElement = screen.getByRole("switch");

    expect(switchElement).toBeInTheDocument();
    expect(switchElement).not.toBeChecked();
  });

  it("should render the switch as enabled when 'enabled' prop is true", () => {
    render(
      <BasicSwitch name="test-switch" enabled={true} onChange={() => {}} />,
    );

    const switchElement = screen.getByRole("switch");

    expect(switchElement).toBeChecked();
  });

  it("should call 'onChange' handler when switch is clicked", () => {
    const handleChange = jest.fn();

    render(
      <BasicSwitch
        name="test-switch"
        enabled={false}
        onChange={handleChange}
      />,
    );

    const switchElement = screen.getByRole("switch");

    fireEvent.click(switchElement);
    expect(handleChange).toHaveBeenCalled();
  });

  it("should apply the correct 'data-checked' attribute when enabled is true", () => {
    render(
      <BasicSwitch name="test-switch" enabled={true} onChange={() => {}} />,
    );

    const switchElement = screen.getByRole("switch");

    expect(switchElement).toHaveAttribute("data-checked");
  });
});
