import React from "react";
import clsx from "clsx";

interface CardActionProps {
  children: React.ReactNode;
  className?: string;
}

const CardAction: React.FC<CardActionProps> = ({ children, className }) => (
  <div className={clsx("float-right ml-2 flex h-fit", className)}>
    {children}
  </div>
);

export default CardAction;
