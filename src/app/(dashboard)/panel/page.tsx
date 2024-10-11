"use client";

import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { businessState } from "@/store/business";
import Title from "@/app/(dashboard)/_components/text/Title";
import Card from "@/app/(dashboard)/_components/cards/Card";
import CardHeader from "@/app/(dashboard)/_components/cards/CardHeader";
import CardTitle from "@/app/(dashboard)/_components/cards/CardTitle";
import CardAction from "@/app/(dashboard)/_components/cards/CardAction";
import Button from "@/components/buttons/Button";
import SettingsDialog from "@/app/(dashboard)/panel/_components/SettingsDialog";

const DashboardPage: React.FC = () => {
  const business = useRecoilValue(businessState);

  let [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex flex-col">
        <Title
          title="Ustawienia"
          subtitle="Personalizacja i bezpieczeństwo Twojego konta."
          className="mb-14"
        />

        <Card>
          <CardHeader>
            <CardTitle title="Dane lokalu" />

            <CardAction className="max-md:order-first max-md:w-full">
              <Button onClick={openModal} intent="outline" className="w-full">
                Edytuj
              </Button>
            </CardAction>
          </CardHeader>

          <div className="mt-10 divide-y divide-primary-50">
            <div className="flex gap-4 py-4 font-semibold">
              <span className="flex w-1/3 items-center justify-between gap-4 text-slate-500">
                Nazwa
              </span>

              <span className="w-full pl-1 text-slate-700">
                {business.name}
              </span>
            </div>

            <div className="flex gap-4 py-4 font-semibold">
              <span className="flex w-1/3 items-center justify-between gap-4 text-slate-500">
                Adres
              </span>

              <span className="w-full pl-1 text-slate-700">
                {business.address}
              </span>
            </div>
          </div>
        </Card>
      </div>

      <SettingsDialog isOpen={isOpen} close={closeModal} />
    </>
  );
};

export default DashboardPage;
