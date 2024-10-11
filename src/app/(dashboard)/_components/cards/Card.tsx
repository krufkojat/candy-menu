import React from "react";

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => (
  <div className="rounded-3xl bg-white p-4 shadow-sm md:p-8">{children}</div>
);

export default Card;
