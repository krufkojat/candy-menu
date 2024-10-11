import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BasicInput from "@/components/forms/BasicInput";

describe("BasicInput Component", () => {
  it("should render the input element with the correct default classes", () => {
    render(<BasicInput name="test" type="text" />);

    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      "w-full rounded-xl bg-slate-50/20 px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm border-gray-200",
    );
  });

  it("should apply the 'invalid' class when the 'invalid' prop is true", () => {
    render(<BasicInput name="test" type="text" invalid />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveClass(
      "border-red-400 ring-4 ring-primary-200/20 focus:border-red-300 focus:ring-4 focus:ring-primary-200/20",
    );
  });

  it("should apply the custom class when 'className' is passed", () => {
    render(<BasicInput name="test" type="text" className="custom-class" />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveClass("custom-class");
  });

  it("should render with the correct 'type' and 'name' attributes", () => {
    render(<BasicInput name="email" type="email" />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAttribute("type", "email");
  });

  it("should forward the ref to the input element", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<BasicInput name="test" type="text" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("should spread additional props to the input element", () => {
    render(<BasicInput name="test" type="text" placeholder="Enter text" />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("placeholder", "Enter text");
  });

  it("should handle user input correctly", async () => {
    render(<BasicInput name="test" type="text" />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "Hello World" } });

    expect(input).toHaveValue("Hello World");
  });
});
