import clsx from "clsx";
import React, { TextareaHTMLAttributes } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useFormContext } from "react-hook-form";
import Label from "@/components/forms/Label";
import FormError from "@/components/forms/FormError";

interface BasicTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "style"> {
  name: string;
  label?: string;
  isRequired?: boolean;
  className?: string;
  invalid?: boolean;
}

export const FormTextarea: React.FC<BasicTextareaProps> = ({
  name,
  label,
  isRequired,
  className,
  ...props
}) => {
  const { register, formState, getFieldState } = useFormContext();
  const { invalid, error } = getFieldState(name, formState);

  return (
    <div className="flex w-full flex-col">
      {label && (
        <Label label={label} fieldName={name} isRequired={isRequired} />
      )}

      <TextareaAutosize
        minRows={2}
        id={name}
        className={clsx(
          "w-full rounded-xl bg-slate-50/20 px-4 py-3 text-gray-700 placeholder-gray-400 shadow-sm",
          invalid
            ? "ring-primary-200/20 focus:ring-primary-200/20 border-red-400 ring-4 focus:border-red-300 focus:ring-4"
            : "focus:border-primary-200 focus:ring-primary-200/20 border-gray-200 focus:ring-4",
        )}
        {...register(name)}
        {...props}
      />

      {invalid && error && <FormError message={error.message} />}
    </div>
  );
};

export default FormTextarea;
