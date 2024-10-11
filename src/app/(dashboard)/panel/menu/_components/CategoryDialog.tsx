import React from "react";
import Dialog from "@/components/overlays/Dialog";
import DialogHeader from "@/components/overlays/DialogHeader";
import { MenuCategory } from "@/store/menu";
import CategoryForm from "@/app/(dashboard)/panel/menu/_components/CategoryForm";

interface CategoryDialogProps {
  isOpen: boolean;
  close: () => void;
  category?: Omit<MenuCategory, "items">;
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({
  isOpen,
  close,
  category,
}) => {
  const title = category ? "Edytuj kategorię" : "Dodaj kategorię";

  return (
    <Dialog isOpen={isOpen} close={close}>
      <DialogHeader close={close} title={title} />

      <CategoryForm closeModal={close} category={category} />
    </Dialog>
  );
};

export default CategoryDialog;
