import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it } from "@jest/globals";
import IconButton from "@/components/buttons/IconButton";
import { BellIcon } from "@heroicons/react/16/solid";
import React from "react";
import "@testing-library/jest-dom";

describe("IconButton Component", () => {
  it("should render the button with icon", () => {
    render(<IconButton icon={<BellIcon />} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should render the icon with the correct classes", () => {
    render(
      <IconButton icon={<BellIcon className="size-4 text-slate-400" />} />,
    );

    const button = screen.getByRole("button");
    const svgIcon = button.querySelector("svg");

    expect(svgIcon).toBeInTheDocument();
    expect(svgIcon).toHaveClass("size-4");
    expect(svgIcon).toHaveClass("text-slate-400");
  });

  it("should apply the default styles", () => {
    render(<IconButton icon={<BellIcon />} />);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-primary-300");
    expect(button).toHaveClass("hover:bg-primary-400");
    expect(button).toHaveClass("focus:ring-primary-200");
  });

  it("should call the onClick prop", () => {
    const onClick = jest.fn();

    render(<IconButton icon={<BellIcon />} onClick={onClick} />);

    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it("should spread additional props to the button element", () => {
    render(<IconButton icon={<BellIcon />} aria-label="bell-icon" />);

    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "bell-icon",
    );
  });
});
