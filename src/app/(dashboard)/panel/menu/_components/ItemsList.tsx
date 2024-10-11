import React, { useCallback } from "react";
import Empty from "@/components/text/Empty";
import BasicButton from "@/components/buttons/Button";
import useDialog from "@/hooks/useDialog";
import { itemsListState, MenuCategory, MenuItem } from "@/store/menu";
import { useRecoilState } from "recoil";
import ItemDialog from "@/app/(dashboard)/panel/menu/_components/ItemDialog";
import Item from "@/app/(dashboard)/panel/menu/_components/Item";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface ItemsListProps {
  category: MenuCategory;
}

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => (
  <BasicButton intent="primary" onClick={onClick}>
    Dodaj potrawę
  </BasicButton>
);

const ItemsList: React.FC<ItemsListProps> = ({ category }) => {
  const { isOpen, openModal, closeModal } = useDialog();

  const [items, setItems] = useRecoilState(itemsListState(category.id));

  const handleReorder = useCallback(
    (array: MenuItem[]) => {
      setItems(array.map((item, index) => ({ ...item, order: index + 1 })));
    },
    [setItems],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) return;

      if (active.id !== over.id) {
        const prevIndex = items.indexOf(
          items.find((item) => item.id === active.id) as MenuItem,
        );
        const nextIndex = items.indexOf(
          items.find((item) => item.id === over.id) as MenuItem,
        );

        handleReorder(arrayMove(items, prevIndex, nextIndex));
      }
    },
    [items, handleReorder],
  );

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 25,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 25,
      },
    }),
  );

  if (items && items.length > 0) {
    return (
      <div className="flex flex-col space-y-4">
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((item) => (
              <Item key={item.id} categoryId={category.id} item={item} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    );
  }

  return (
    <>
      <Empty label="Brak potraw" button={<Button onClick={openModal} />} />

      <ItemDialog isOpen={isOpen} close={closeModal} categoryId={category.id} />
    </>
  );
};

export default ItemsList;
