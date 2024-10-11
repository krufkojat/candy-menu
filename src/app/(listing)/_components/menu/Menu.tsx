"use client";

import Category from "@/app/(listing)/_components/menu/Category";
import { useRecoilValue } from "recoil";
import { filteredCategoriesListState, MenuCategory } from "@/store/menu";

const Menu = () => {
  const menuCategories: MenuCategory[] = useRecoilValue(
    filteredCategoriesListState("listing"),
  );

  if (!menuCategories || menuCategories.length === 0) {
    return (
      <div className="mx-auto flex flex-col items-center gap-3 p-7 text-slate-300 sm:gap-4 md:w-2/3 lg:w-3/5">
        <span className="text-center text-sm font-medium sm:text-xl">
          Menu nie zawiera żadnych kategorii
        </span>
      </div>
    );
  }

  return menuCategories.map((category) => (
    <Category key={category.id} category={category} />
  ));
};

export default Menu;
