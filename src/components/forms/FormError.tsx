import React from "react";

interface ErrorProps {
  message?: string;
}

const FormError: React.FC<ErrorProps> = ({ message }) => (
  <div className="ml-2 mt-0.5 flex w-fit flex-wrap items-center rounded-b-md bg-primary-200/20 p-1.5 text-red-500 md:ml-3 md:rounded-b-lg md:px-4 md:py-2">
    <p>{message}</p>
  </div>
);

export default FormError;
