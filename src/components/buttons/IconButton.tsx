import React, { JSX, ReactElement } from "react";
import { cva, VariantProps } from "class-variance-authority";

const iconButton = cva(
  "flex size-9 shrink-0 items-center justify-center rounded-xl p-2 shadow focus:outline-none focus:ring transition-colors",
  {
    variants: {
      intent: {
        primary: [
          "bg-primary-300",
          "hover:bg-primary-400",
          "focus:ring-primary-200",
        ],
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  },
);

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButton> {
  icon: ReactElement;
}

const IconButton = ({
  icon,
  intent,
  ...props
}: IconButtonProps): JSX.Element => (
  <button
    role="button"
    type="button"
    className={iconButton({ intent })}
    {...props}
  >
    {icon}
  </button>
);

export default IconButton;
