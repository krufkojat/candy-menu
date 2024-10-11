import React from "react";

interface EmptyProps {
  label: string;
  button?: React.ReactNode;
}

const Empty: React.FC<EmptyProps> = ({ label, button }) => (
  <div className="rounded-3xl bg-slate-100/70 p-4">
    <div className="mx-auto flex flex-col items-center gap-3 p-7 text-slate-400 sm:gap-4 md:w-2/3 lg:w-3/5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-9 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
        />
      </svg>

      <h2 className="text-center text-sm font-medium sm:text-xl">{label}</h2>

      {button && button}
    </div>
  </div>
);

export default Empty;
