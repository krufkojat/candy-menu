import React, { memo, useState } from "react";
import ItemDialog from "@/app/(listing)/_components/menu/ItemDialog";
import { MenuItem } from "@/store/menu";

interface MenuItemProps {
  item: MenuItem;
  categoryName: string;
}

const Item: React.FC<MenuItemProps> = ({ item, categoryName }) => {
  let [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative flex flex-col items-start justify-between gap-x-3 md:flex-row">
        <div className="flex min-w-[150px] flex-col items-start">
          <div className="flex flex-col justify-start gap-0.5 md:flex-row md:flex-wrap-reverse">
            <button
              type="button"
              className="focus:ring:slate-500/20 order-2 mr-1.5 flex items-center justify-center rounded-2xl text-primary-50 underline transition-colors hover:text-primary-200 md:order-1"
              onClick={openModal}
            >
              <span className="hyphens-auto text-left">{item.name}</span>
            </button>

            {item.allergens && item.allergens.length > 0 && (
              <button
                type="button"
                className="order-1 flex items-center gap-1 md:order-2"
                onClick={openModal}
              >
                <div className="flex items-center justify-center rounded-xl bg-slate-700 px-2 py-1 text-xs text-slate-300 transition-colors hover:bg-slate-600 hover:text-slate-200 focus:ring-slate-300/20">
                  <p>Alergeny</p>
                </div>
              </button>
            )}
          </div>

          {item.ingredients && item.ingredients.length > 0 && (
            <span className="italic text-slate-300">
              {item.ingredients.map((ingredient) => ingredient).join(", ")}
            </span>
          )}
        </div>

        <div className="mb-2 mt-2 flex flex-wrap justify-end border-t-2 border-dotted border-slate-600 pt-1 text-slate-50 md:mb-0 md:ml-0 md:mt-0 md:gap-1.5 md:divide-x md:divide-slate-700 md:border-t-0 md:pt-0">
          {item.price && <span>{item.price}zł</span>}

          {item.magnitude && (
            <span className="pl-1.5 text-end text-slate-300">
              {item.magnitude}
            </span>
          )}

          {item.calories && (
            <span className="pl-1.5 text-slate-300">{item.calories}kcal</span>
          )}
        </div>
      </div>

      <ItemDialog
        item={item}
        categoryName={categoryName}
        isOpen={isOpen}
        close={closeModal}
      />
    </>
  );
};

export default memo(Item);
