import React from "react";
import { MenuItem, useDeleteItem } from "@/store/menu";
import useDialog from "@/hooks/useDialog";
import toast from "react-hot-toast";
import {
  Menu,
  MenuButton,
  MenuItem as HeadlessMenuItem,
  MenuItems,
} from "@headlessui/react";
import ActionsIcon from "@/components/icons/ActionsIcon";
import clsx from "clsx";
import ConfirmDialog from "@/components/overlays/ConfirmDialog";
import ItemStatusSwitch from "@/app/(dashboard)/panel/menu/_components/ItemStatusSwitch";

interface ItemActionsProps {
  categoryId: string;
  item: MenuItem;
  openItemDialog: () => void;
}

const ItemActions: React.FC<ItemActionsProps> = ({
  categoryId,
  item,
  openItemDialog,
}) => {
  const deleteItem = useDeleteItem();

  const {
    isOpen: isConfirmDialogOpen,
    openModal: openConfirmDialog,
    closeModal: closeConfirmDialog,
  } = useDialog();

  const proceed = () => {
    deleteItem(categoryId, item.id);

    toast.success("Potrawa została usunięta");
  };

  return (
    <div className="flex items-center gap-2">
      <ItemStatusSwitch item={item} categoryId={categoryId} />

      <Menu>
        <MenuButton className="inline-flex h-fit items-center justify-center rounded-2xl p-2 text-left font-medium text-slate-500 transition-colors duration-100 focus:outline-none focus:ring focus:ring-slate-200">
          <ActionsIcon />
        </MenuButton>

        <MenuItems
          anchor="bottom"
          className="z-[19] h-fit w-fit origin-top-right space-y-1 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl focus:outline-none max-sm:fixed max-sm:inset-x-2 max-sm:bottom-2"
        >
          <HeadlessMenuItem>
            {({ focus }) => (
              <button
                onClick={openItemDialog}
                className={clsx(
                  "block w-full cursor-pointer rounded-xl p-3 text-sm font-medium transition-colors hover:bg-primary-500 hover:text-white sm:p-2.5",
                  focus ? "bg-primary-600 text-white" : "text-zinc-600",
                )}
              >
                Edytuj
              </button>
            )}
          </HeadlessMenuItem>

          <HeadlessMenuItem>
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
          </HeadlessMenuItem>
        </MenuItems>
      </Menu>

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        close={closeConfirmDialog}
        title="Czy chcesz usunć tę potrawę?"
        proceed={proceed}
        proceedLabel="Tak, usuń tę potrawę"
      />
    </div>
  );
};

export default ItemActions;
