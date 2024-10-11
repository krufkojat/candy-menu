import React from "react";
import Button from "@/components/buttons/Button";
import { useFormContext } from "react-hook-form";
import SpinnerIcon from "@/components/icons/SpinnerIcon";

interface SubmitButtonProps {
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => {
  const { formState } = useFormContext();
  const { isSubmitting } = formState;

  return (
    <Button
      type="submit"
      intent="primary"
      className="w-full items-center px-8 py-3.5"
    >
      {text}

      {isSubmitting && (
        <SpinnerIcon className="ml-1.5 animate-spin text-white" />
      )}
    </Button>
  );
};

export default SubmitButton;
