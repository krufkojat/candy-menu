import React from "react";
import Required from "@/components/forms/Required";

const RequiredFields: React.FC = () => (
  <div className="mt-4 text-gray-400">
    <hr className="h-1 rounded border-0 bg-gray-50" />

    <div className="mt-1 flex items-center">
      <Required /> <span className="ml-1">- pola wymagane</span>
    </div>
  </div>
);

export default RequiredFields;
