import clsx from "clsx";
import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  ForwardRefRenderFunction,
  HTMLInputTypeAttribute,
} from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  name: string;
  type: HTMLInputTypeAttribute;
  className?: string;
  invalid?: boolean;
}

const BasicInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, type, className, invalid, ...props },
  ref,
) => (
  <input
    id={name}
    name={name}
    type={type}
    ref={ref}
    className={clsx(
      "w-full rounded-xl bg-slate-50/20 px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm",
      invalid
        ? "border-red-400 ring-4 ring-primary-200/20 focus:border-red-300 focus:ring-4 focus:ring-primary-200/20"
        : "border-gray-200 focus:border-primary-200 focus:ring-4 focus:ring-primary-200/20",
      className,
    )}
    {...props}
  />
);

BasicInput.displayName = "BasicInput";

export default forwardRef(BasicInput);
