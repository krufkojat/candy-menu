import React, { useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";
import clsx from "clsx";
import Image from "next/image";
import FormError from "@/components/forms/FormError";

const IconField: React.FC = () => {
  const name = "icon";

  const { control, getFieldState, formState } = useFormContext();
  const { field } = useController({
    control,
    name,
  });
  const { value } = field;
  const { invalid, error } = getFieldState(name, formState);

  const handleChange = useCallback(
    (icon: number) => {
      const nextValue = value === icon ? "" : icon;

      field.onChange(nextValue);
    },
    [value, field],
  );

  return (
    <div>
      <legend className="mb-2 flex items-center truncate font-semibold text-gray-600">
        Ikona
      </legend>

      <div
        className={clsx(
          "flex flex-wrap justify-center gap-3 rounded-xl bg-slate-50/75 p-4",
          invalid && "ring-2 ring-red-200",
        )}
      >
        {Array.from({ length: 19 }).map((_, index) => (
          <div key={index}>
            <input
              name={name}
              id={`${name}-${index}`}
              onChange={() => handleChange(index + 1)}
              type="checkbox"
              checked={value === index + 1}
              value={index + 1}
              className="peer w-0 opacity-0"
            />

            <label
              htmlFor={`${name}-${index}`}
              className={clsx(
                "inline-flex h-14 w-14 cursor-pointer rounded-xl p-2 ring-offset-2 transition-colors hover:ring-primary-500 peer-checked:bg-primary-100 peer-checked:shadow-md peer-checked:ring-1 peer-checked:ring-gray-200 peer-focus:ring peer-focus:ring-primary-500/20",
              )}
            >
              <Image
                src={`/icons/category_${index + 1}.svg`}
                alt="Menu category icon"
                className="inline-flex h-full w-full"
                width="40"
                height="40"
              />
            </label>
          </div>
        ))}
      </div>

      {invalid && error && <FormError message={error.message} />}
    </div>
  );
};

export default IconField;
