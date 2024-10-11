import React, { HTMLInputTypeAttribute } from "react";
import { useFormContext } from "react-hook-form";
import BasicInput from "@/components/forms/BasicInput";
import FormError from "@/components/forms/FormError";
import Label from "@/components/forms/Label";

interface FormInputProps {
  name: string;
  inputRef?: React.MutableRefObject<HTMLInputElement | null>;
  label?: string;
  isRequired?: boolean;
  step?: number;
  type?: HTMLInputTypeAttribute;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  inputRef,
  label,
  isRequired,
  step,
  type = "text",
}) => {
  const { register, formState, getFieldState, setValue } = useFormContext();
  const { invalid, error } = getFieldState(name, formState);

  const reset = () => {
    setValue(name, "", { shouldDirty: true });
  };

  const { ref, ...rest } = register(name);

  return (
    <div className="flex w-full flex-col">
      {label && (
        <Label label={label} fieldName={name} isRequired={isRequired} />
      )}

      <div className="relative flex items-center">
        <BasicInput
          type={type}
          invalid={invalid}
          step={step}
          ref={(e) => {
            ref(e);
            if (inputRef) inputRef.current = e;
          }}
          {...rest}
        />

        {type !== "number" && (
          <button
            type="button"
            onClick={reset}
            className="absolute right-2.5 flex items-center justify-center p-1 text-gray-300 transition-colors hover:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {invalid && error && <FormError message={error.message} />}
    </div>
  );
};

export default FormInput;
