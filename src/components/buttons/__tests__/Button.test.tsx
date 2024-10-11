import { it } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../Button";

describe("Button Component", () => {
  it("should render the button", () => {
    render(<Button />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should apply the default styles", () => {
    render(<Button />);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-primary-400");
    expect(button).toHaveClass("text-white");
    expect(button).toHaveClass("hover:bg-primary-300");
    expect(button).toHaveClass("focus:ring-primary-300");
    expect(button).toHaveClass("hover:shadow");
    expect(button).toHaveClass("shadow-md");
  });

  it('should support the "intent" prop', () => {
    render(<Button intent="secondary" />);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-sky-500");
    expect(button).toHaveClass("text-white");
    expect(button).toHaveClass("hover:bg-sky-400");
    expect(button).toHaveClass("focus:ring-sky-400");
    expect(button).toHaveClass("hover:shadow");
    expect(button).toHaveClass("shadow-md");
  });

  it('should support the "className" prop', () => {
    render(<Button intent="secondary" className="test-class" />);

    expect(screen.getByRole("button")).toHaveClass("test-class");
  });

  it('should support the "onClick" prop', () => {
    const onClick = jest.fn();

    render(<Button intent="secondary" onClick={onClick} />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it("should spread additional props to the button element", () => {
    render(<Button intent="secondary" aria-disabled="true" />);

    expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
  });
});
