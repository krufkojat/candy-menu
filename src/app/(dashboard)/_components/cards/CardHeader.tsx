import React from "react";

interface CardHeaderProps {
  children: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children }) => (
  <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-50 pb-4 md:flex-row">
    {children}
  </div>
);

export default CardHeader;
