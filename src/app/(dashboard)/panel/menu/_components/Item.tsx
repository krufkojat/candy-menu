import React, { useMemo } from "react";
import { MenuItem } from "@/store/menu";
import Card from "@/app/(dashboard)/_components/cards/Card";
import GrabIcon from "@/components/icons/GrabIcon";
import ItemActions from "@/app/(dashboard)/panel/menu/_components/ItemActions";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ItemDialog from "@/app/(dashboard)/panel/menu/_components/ItemDialog";
import useDialog from "@/hooks/useDialog";

interface ItemProps {
  categoryId: string;
  item: MenuItem;
}

const Item: React.FC<ItemProps> = ({ categoryId, item }) => {
  const itemDialog = useDialog();

  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = useMemo(
    () => ({
      zIndex: isDragging ? 1 : undefined,
      transform: CSS.Translate.toString(transform),
      transition,
    }),
    [transform, transition, isDragging],
  );

  return (
    <>
      <div ref={setNodeRef} style={style}>
        <Card>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex h-fit cursor-grab items-center self-center rounded-lg px-2 py-3 text-gray-500 transition-colors duration-100 hover:bg-gray-50"
                {...attributes}
                {...listeners}
              >
                <GrabIcon />
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={itemDialog.openModal}
                  className="line-clamp-2 font-medium text-primary-500 transition-colors hover:text-primary-600"
                >
                  {item.name}
                </button>
              </div>
            </div>

            <ItemActions
              categoryId={categoryId}
              item={item}
              openItemDialog={itemDialog.openModal}
            />
          </div>
        </Card>
      </div>

      <ItemDialog
        isOpen={itemDialog.isOpen}
        close={itemDialog.closeModal}
        categoryId={categoryId}
        item={item}
      />
    </>
  );
};

export default Item;
