import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const required = cva("ml-1 inline-block rounded-full bg-amber-400", {
  variants: {
    size: {
      sm: ["h-2 w-2"],
      md: ["h-2.5 w-2.5"],
      xl: ["h-4 w-4"],
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface RequiredProps extends VariantProps<typeof required> {}

const Required: React.FC<RequiredProps> = ({ size }) => (
  <span className={required({ size })} />
);

export default Required;
