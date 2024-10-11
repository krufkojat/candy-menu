import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useAuth } from "@/contexts/AuthContext";
import useDialog from "@/hooks/useDialog";
import AuthButton from "@/components/buttons/AuthButton";

jest.mock("@/contexts/AuthContext");
jest.mock("@/hooks/useDialog");
jest.mock("@/app/(dashboard)/_components/nav/MobileNav", () => {
  const MockMobileNav = () => <div>MobileNav</div>;
  MockMobileNav.displayName = "MockMobileNav";
  return MockMobileNav;
});

describe("AuthButton Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders login button when not authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });

    render(<AuthButton />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/panel");
    expect(screen.getByRole("button")).toContainElement(
      screen.getByTestId("icon-user"),
    );
  });

  it("renders menu button and MobileNav when authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });

    const openModal = jest.fn();
    const closeModal = jest.fn();
    const dialogState = { isOpen: false, openModal, closeModal };

    (useDialog as jest.Mock).mockReturnValue(dialogState);

    render(<AuthButton />);

    expect(screen.getByRole("button")).toContainElement(
      screen.getByTestId("icon-bars"),
    );

    expect(screen.getByText("MobileNav")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));
    expect(openModal).toHaveBeenCalled();
  });
});
