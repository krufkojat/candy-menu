import React, { useCallback, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import Label from "@/components/forms/Label";
import clsx from "clsx";
import FormError from "@/components/forms/FormError";

interface FormAttributesFieldProps {
  name: string;
  label?: string;
  attributes: string[];
  limit?: number;
  isRequired?: boolean;
}

const FormAttributesField: React.FC<FormAttributesFieldProps> = ({
  name,
  label,
  attributes,
  limit,
  isRequired,
}) => {
  const { control, getFieldState, formState } = useFormContext();

  const { field } = useController({
    control,
    name,
  });
  const [value, setValue] = useState<string[]>(field.value || []);
  const { invalid, error } = getFieldState(name, formState);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (limit && value.length >= limit && e.target.checked) {
        return toast.error(`Możesz wybrać maksymalnie ${limit} opcji.`);
      }

      const valueCopy = e.target.checked
        ? [...value, e.target.value]
        : value.filter((item) => item !== e.target.value);

      field.onChange(valueCopy);

      return setValue(valueCopy);
    },
    [value, limit, setValue, field],
  );

  return (
    <div>
      {label && (
        <Label label={label} fieldName={name} isRequired={isRequired} />
      )}

      <div
        className={clsx(
          "flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-slate-50/75 p-4",
          invalid && "ring-2 ring-red-200",
        )}
      >
        <div className="flex flex-wrap gap-2">
          {attributes.map((attribute) => (
            <div key={attribute}>
              <input
                id={`${name}-${attribute}`}
                onChange={handleChange}
                type="checkbox"
                checked={value.includes(attribute)}
                value={attribute}
                className="peer sr-only"
              />

              <label
                htmlFor={`${name}-${attribute}`}
                className={clsx(
                  "inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-xl bg-gray-100 px-3 py-1 font-medium text-gray-400 transition-colors hover:bg-gray-200 peer-checked:bg-primary-400 peer-checked:text-primary-50 peer-focus:ring peer-focus:ring-gray-500/20",
                )}
              >
                {attribute}
              </label>
            </div>
          ))}
        </div>
      </div>

      {invalid && error && <FormError message={error.message} />}
    </div>
  );
};

export default FormAttributesField;
