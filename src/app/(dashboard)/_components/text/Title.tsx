import clsx from "clsx";
import React from "react";

interface TitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ title, subtitle, className }) => (
  <div className={clsx("flex flex-col", className)}>
    <h1 className="text-2xl font-bold sm:text-3xl">
      <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
        {title}
      </span>
    </h1>

    {subtitle && <p className="mt-1 text-slate-400">{subtitle}</p>}
  </div>
);

export default Title;
