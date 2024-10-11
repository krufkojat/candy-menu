"use client";

import React from "react";
import Menu from "@/app/(listing)/_components/menu/Menu";
import { useRecoilValue } from "recoil";
import { Business, businessState } from "@/store/business";

const HomePage: React.FC = () => {
  const business: Business = useRecoilValue(businessState);

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="rounded-2xl bg-slate-800 p-2 md:p-8 lg:p-12">
        <div className="mb-7 flex flex-col items-start border-b border-slate-700 pb-3 max-md:px-4 max-md:pt-4">
          <span className="block text-xs font-semibold uppercase text-slate-500 md:text-sm">
            Karta menu
          </span>

          <span
            className="hyphens-auto text-lg font-semibold text-primary-200 md:text-2xl md:font-bold"
            lang="pl"
          >
            {business.name}
          </span>
        </div>

        <div className="space-y-7 max-md:p-4 lg:space-y-14">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
