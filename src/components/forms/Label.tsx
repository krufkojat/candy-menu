import Required from "@/components/forms/Required";
import React from "react";

interface LabelProps {
  label: string;
  fieldName: string;
  isRequired?: boolean;
}

const Label: React.FC<LabelProps> = ({ label, fieldName, isRequired }) => (
  <label
    htmlFor={fieldName}
    className="mb-2 flex items-center truncate font-semibold text-gray-600"
  >
    {label} {isRequired && <Required />}
  </label>
);

export default Label;
