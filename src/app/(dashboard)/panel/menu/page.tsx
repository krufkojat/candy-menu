"use client";

import React from "react";
import Title from "@/app/(dashboard)/_components/text/Title";
import Empty from "@/components/text/Empty";
import BasicButton from "@/components/buttons/Button";
import CategoryDialog from "@/app/(dashboard)/panel/menu/_components/CategoryDialog";
import { categoriesListState, MenuCategory } from "@/store/menu";
import { useRecoilValue } from "recoil";
import CategoriesList from "@/app/(dashboard)/panel/menu/_components/CategoriesList";
import useDialog from "@/hooks/useDialog";

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => (
  <BasicButton intent="soft" onClick={onClick}>
    Dodaj kategorię
  </BasicButton>
);

const MenuPage: React.FC = () => {
  const menuCategories: MenuCategory[] = useRecoilValue(categoriesListState);

  const { isOpen, openModal, closeModal } = useDialog();

  return (
    <>
      <div className="flex flex-col">
        <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row">
          <Title title="Karta menu" />

          <Button onClick={openModal} />
        </div>

        {menuCategories.length === 0 ? (
          <Empty
            label="Brak kategorii menu"
            button={<Button onClick={openModal} />}
          />
        ) : (
          <CategoriesList />
        )}
      </div>

      <CategoryDialog isOpen={isOpen} close={closeModal} />
    </>
  );
};

export default MenuPage;
