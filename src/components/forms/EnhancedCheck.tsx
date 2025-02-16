import React, { forwardRef, ForwardRefRenderFunction } from "react";
import clsx from "clsx";

interface EnhancedCheckProps {
  name: string;
  value: string;
  onChange?: React.FormEventHandler<HTMLInputElement>;
  checked?: boolean;
  label?: string;
  type?: "checkbox" | "radio";
}

const EnhancedCheck: ForwardRefRenderFunction<
  HTMLInputElement,
  EnhancedCheckProps
> = (
  { name, value, onChange, checked, label, type = "checkbox", ...props },
  ref,
) => {
  const role = type === "checkbox" ? "checkbox" : "radio";

  return (
    <label
      htmlFor={`${name}-${value}`}
      className="group flex cursor-pointer items-center"
    >
      <input
        id={`${name}-${value}`}
        value={value}
        name={name}
        checked={checked}
        type={type}
        onChange={onChange}
        className={clsx(
          "h-5 w-5 cursor-pointer border-2 border-slate-200/80 bg-slate-50/20 text-primary-500 transition-colors focus:ring-2 focus:ring-primary-500/30",
          type === "checkbox" && "rounded",
          !checked && label
            ? "group-hover:border-slate-300"
            : "hover:border-primary-200",
        )}
        ref={ref}
        role={role}
        {...props}
      />

      {label && (
        <div className="ml-1.5 shrink">
          <span
            className={clsx(
              "cursor-pointer hyphens-auto font-medium transition-colors dark:text-gray-300",
              checked
                ? "text-primary-500"
                : "text-gray-500 group-hover:text-gray-600",
            )}
            lang="pl"
          >
            {label}
          </span>
        </div>
      )}
    </label>
  );
};

export default forwardRef(EnhancedCheck);
