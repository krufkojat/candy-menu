import { useToggle } from "react-use";
import { useFormContext } from "react-hook-form";
import Label from "@/components/forms/Label";
import BasicInput from "@/components/forms/BasicInput";
import FormError from "@/components/forms/FormError";
import React from "react";

interface PasswordInputProps {
  name: string;
  label?: string;
  isRequired?: boolean;
}

const PasswordInput = ({ name, label, isRequired }: PasswordInputProps) => {
  const [showPassword, toggleShowPassword] = useToggle(false);
  const { register, formState, getFieldState } = useFormContext();

  const { invalid, error } = getFieldState(name, formState);

  return (
    <div className="flex w-full flex-col">
      {label && (
        <Label label={label} fieldName={name} isRequired={isRequired} />
      )}

      <div className="relative flex items-center">
        <BasicInput
          type={showPassword ? "text" : "password"}
          placeholder="*******"
          invalid={invalid}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...register(name)}
        />

        <button
          type="button"
          className="absolute right-2.5 flex items-center justify-center p-1 text-gray-400 transition-colors hover:text-gray-500"
          onClick={toggleShowPassword}
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
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
      </div>

      {invalid && error && <FormError message={error.message} />}
    </div>
  );
};

export default PasswordInput;
