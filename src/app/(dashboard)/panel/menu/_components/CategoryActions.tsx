import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import useDialog from "@/hooks/useDialog";
import clsx from "clsx";
import CategoryDialog from "@/app/(dashboard)/panel/menu/_components/CategoryDialog";
import { MenuCategory, useDeleteCategory } from "@/store/menu";
import ConfirmDialog from "@/components/overlays/ConfirmDialog";
import toast from "react-hot-toast";

interface CategoryActionsProps {
  category: Omit<MenuCategory, "items">;
  openFirstTab: () => void;
}

const CategoryActions: React.FC<CategoryActionsProps> = ({
  category,
  openFirstTab,
}) => {
  const deleteCategory = useDeleteCategory();

  const {
    isOpen: isCategoryDialogOpen,
    openModal: openCategoryDialog,
    closeModal: closeCategoryDialog,
  } = useDialog();

  const {
    isOpen: isConfirmDialogOpen,
    openModal: openConfirmDialog,
    closeModal: closeConfirmDialog,
  } = useDialog();

  const proceed = () => {
    deleteCategory(category.id);

    toast.success("Kategoria została usunięta");

    openFirstTab();
  };

  return (
    <>
      <Menu>
        <MenuButton className="inline-flex h-fit w-full items-center justify-center rounded-2xl border-2 border-gray-100 bg-transparent px-4 py-2 text-left font-medium text-gray-700 transition-colors duration-100 hover:text-gray-500 focus:outline-none focus:ring focus:ring-gray-100 md:w-fit">
          Edytuj
        </MenuButton>

        <MenuItems
          anchor="bottom"
          className="z-[19] h-fit w-fit origin-top-right space-y-1 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl focus:outline-none max-sm:fixed max-sm:inset-x-2 max-sm:bottom-2"
        >
          <MenuItem>
            {({ focus }) => (
              <button
                onClick={openCategoryDialog}
                className={clsx(
                  "block w-full cursor-pointer rounded-xl p-3 text-sm font-medium transition-colors hover:bg-primary-500 hover:text-white sm:p-2.5",
                  focus ? "bg-primary-600 text-white" : "text-zinc-600",
                )}
              >
                Edytuj
              </button>
            )}
          </MenuItem>

          <MenuItem>
            {({ focus }) => (
              <button
                onClick={openConfirmDialog}
                className={clsx(
                  "block w-full cursor-pointer rounded-xl p-3 text-sm font-medium transition-colors hover:bg-primary-500 hover:text-white sm:p-2.5",
                  focus ? "bg-primary-600 text-white" : "text-zinc-600",
                )}
              >
                Usuń
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Menu>

      <CategoryDialog
        isOpen={isCategoryDialogOpen}
        close={closeCategoryDialog}
        category={category}
      />

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        close={closeConfirmDialog}
        title="Czy chcesz usunć tę kategorię?"
        proceed={proceed}
        proceedLabel="Tak, usuń tę kategorię"
      />
    </>
  );
};

export default CategoryActions;
