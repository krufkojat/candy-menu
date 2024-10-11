import ItemDialogBody from "@/app/(listing)/_components/menu/ItemDialogBody";
import { MenuItem } from "@/store/menu";
import React from "react";
import Dialog from "@/components/overlays/Dialog";
import DialogHeader from "@/components/overlays/DialogHeader";

interface MenuItemProps {
  item: MenuItem;
  categoryName: string;
  isOpen: boolean;
  close: () => void;
}

const ItemDialog: React.FC<MenuItemProps> = ({
  item,
  categoryName,
  isOpen,
  close,
}) => (
  <Dialog isOpen={isOpen} close={close} intent="dark">
    <DialogHeader close={close} title={categoryName} intent="dark" />

    <ItemDialogBody item={item} />
  </Dialog>
);

export default ItemDialog;
