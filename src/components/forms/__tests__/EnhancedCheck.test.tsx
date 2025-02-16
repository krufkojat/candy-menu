import EnhancedCheck from "@/components/forms/EnhancedCheck";
import { render, screen, fireEvent } from "@testing-library/react";

describe("EnhancedCheck", () => {
  it("should render the checkbox component with the default 'type' attributes and correct role", () => {
    render(
      <EnhancedCheck name="test-checkbox" value="value" onChange={() => {}} />,
    );

    const checkboxElement = screen.getByRole("checkbox");

    expect(checkboxElement).toBeInTheDocument();
    expect(checkboxElement).toHaveAttribute("role", "checkbox");
  });

  it("should render the checkbox component with the correct 'type' attribute and role", () => {
    render(
      <EnhancedCheck
        name="test-checkbox"
        value="value"
        onChange={() => {}}
        type="radio"
      />,
    );

    const checkboxElement = screen.getByRole("radio");

    expect(checkboxElement).toBeInTheDocument();
    expect(checkboxElement).toHaveAttribute("role", "radio");
  });

  it("should call 'onChange' handler when checkbox is clicked", () => {
    const handleChange = jest.fn();

    render(
      <EnhancedCheck
        name="test-checkbox"
        value="value"
        onChange={handleChange}
      />,
    );

    const checkboxElement = screen.getByRole("checkbox");

    fireEvent.click(checkboxElement);
    expect(handleChange).toHaveBeenCalled();
  });
});
