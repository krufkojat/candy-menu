import React from "react";
import clsx from "clsx";

interface CardTitleProps {
  title: string;
  className?: string;
}

const CardTitle: React.FC<CardTitleProps> = ({ title, className }) => (
  <div
    className={clsx(
      "bg-gradient-to-r from-primary-400 to-violet-400 bg-clip-text text-xl font-semibold text-transparent",
      className,
    )}
  >
    {title}
  </div>
);

export default CardTitle;
