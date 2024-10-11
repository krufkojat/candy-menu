import React from "react";
import Required from "@/components/forms/Required";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import FormError from "@/components/forms/FormError";

interface FormCheckFieldProps {
  name: string;
  legend: string;
  isRequired?: boolean;
  grid?: boolean;
  children?: React.ReactNode;
}

const FormCheckField: React.FC<FormCheckFieldProps> = ({
  name,
  legend,
  isRequired,
  grid,
  children,
}) => {
  const { getFieldState, formState } = useFormContext();
  const { invalid, error } = getFieldState(name, formState);

  return (
    <div>
      <div className="mb-2 flex items-center gap-1.5">
        {legend && (
          <legend className="mb-2 flex items-center truncate font-semibold text-gray-600">
            {legend} {isRequired && <Required />}
          </legend>
        )}
      </div>

      <fieldset
        className={clsx(
          "rounded-2xl bg-slate-50/75 p-4",
          invalid && "ring-2 ring-red-200",
        )}
      >
        <div
          className={clsx(
            grid
              ? "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
              : "space-y-3",
          )}
        >
          {children}
        </div>
      </fieldset>

      {invalid && error && <FormError message={error.message} />}
    </div>
  );
};

export default FormCheckField;
