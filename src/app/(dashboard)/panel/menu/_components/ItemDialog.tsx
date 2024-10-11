import React from "react";
import { MenuItem } from "@/store/menu";
import Dialog from "@/components/overlays/Dialog";
import DialogHeader from "@/components/overlays/DialogHeader";
import ItemForm from "@/app/(dashboard)/panel/menu/_components/ItemForm";

interface ItemDialogProps {
  isOpen: boolean;
  close: () => void;
  item?: MenuItem;
  categoryId: string;
}

const ItemDialog: React.FC<ItemDialogProps> = ({
  isOpen,
  close,
  item,
  categoryId,
}) => {
  const title = item ? "Edytuj potrawę" : "Dodaj potrawę";

  return (
    <Dialog isOpen={isOpen} close={close}>
      <DialogHeader close={close} title={title} />

      <ItemForm closeModal={close} item={item} categoryId={categoryId} />
    </Dialog>
  );
};

export default ItemDialog;
