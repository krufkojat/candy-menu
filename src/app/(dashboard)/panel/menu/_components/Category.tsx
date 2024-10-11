import React, { memo } from "react";
import { MenuCategory } from "@/store/menu";
import Button from "@/components/buttons/Button";
import useDialog from "@/hooks/useDialog";
import CategoryDialog from "@/app/(dashboard)/panel/menu/_components/CategoryDialog";
import CategoryActions from "@/app/(dashboard)/panel/menu/_components/CategoryActions";
import ItemsList from "@/app/(dashboard)/panel/menu/_components/ItemsList";
import ItemDialog from "@/app/(dashboard)/panel/menu/_components/ItemDialog";

interface SingleCategoryProps {
  category: MenuCategory;
  openFirstTab: () => void;
}

const Category: React.FC<SingleCategoryProps> = ({
  category,
  openFirstTab,
}) => {
  const { isOpen: isCategoryDialogOpen, closeModal: closeCategoryDialog } =
    useDialog();
  const {
    isOpen: isItemDialogOpen,
    openModal: openItemDialog,
    closeModal: closeItemDialog,
  } = useDialog();

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col justify-between md:flex-row">
          <h2 className="mb-4 hidden text-2xl font-bold text-primary-500 sm:text-3xl md:block">
            {category.name}
          </h2>

          <div className="flex flex-col justify-between gap-2 md:flex-row">
            <Button
              onClick={openItemDialog}
              intent="soft"
              className="w-full md:w-fit"
            >
              Dodaj potrawę
            </Button>

            <CategoryActions category={category} openFirstTab={openFirstTab} />
          </div>
        </div>

        <div className="mt-4">
          <ItemsList category={category} />
        </div>
      </div>

      <CategoryDialog
        isOpen={isCategoryDialogOpen}
        close={closeCategoryDialog}
        category={category}
      />

      <ItemDialog
        isOpen={isItemDialogOpen}
        close={closeItemDialog}
        categoryId={category.id}
      />
    </>
  );
};

export default memo(Category);
