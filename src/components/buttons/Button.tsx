import React, { ButtonHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";

const button = cva(
  "inline-flex h-fit items-center justify-center rounded-2xl px-4 py-2 text-left font-medium transition-colors duration-100 focus:outline-none focus:ring",
  {
    variants: {
      intent: {
        primary: [
          "bg-primary-400",
          "text-white",
          "hover:bg-primary-300",
          "focus:ring-primary-300",
          "hover:shadow",
          "shadow-md",
        ],
        secondary: [
          "bg-sky-500",
          "text-white",
          "hover:bg-sky-400",
          "focus:ring-sky-400",
          "hover:shadow",
          "shadow-md",
        ],
        soft: [
          "bg-primary-100",
          "text-primary-500",
          "hover:bg-primary-200",
          "focus:ring-primary-200",
          "hover:shadow",
        ],
        danger: [
          "bg-red-500",
          "text-white",
          "hover:bg-red-400",
          "focus:ring-red-400",
          "hover:shadow",
          "shadow-md",
        ],
        muted: [
          "bg-gray-100",
          "text-gray-500",
          "hover:text-gray-600",
          "focus:ring-gray-500",
          "shadow-md",
        ],
        outline: [
          "bg-transparent",
          "text-gray-700",
          "border-2",
          "border-gray-50",
          "hover:text-gray-500",
          "focus:ring-gray-100",
        ],
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

const Button: React.FC<ButtonProps> = ({ intent, className, ...props }) => (
  <button className={button({ intent, className })} {...props}></button>
);

export default Button;
