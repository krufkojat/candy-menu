import { MenuCategory } from "@/store/menu";
import Item from "@/app/(listing)/_components/menu/Item";
import Image from "next/image";
import { capitalizeFirst } from "@/utils/text";
import { Media } from "@/utils/media";
import React, { memo } from "react";

interface CategoryProps {
  category: MenuCategory;
}

const Category: React.FC<CategoryProps> = ({ category }) => {
  const initial = category.name.charAt(0);

  return (
    <div key={category.id} className="relative space-y-3">
      <div className="flex w-full flex-col lg:mt-3.5">
        <div className="flex items-center gap-2">
          <Media greaterThanOrEqual="lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-700 p-3 text-2xl text-slate-300">
              {category.icon ? (
                <Image
                  alt="Category icon"
                  src={`/icons/category_${category.icon}.svg`}
                  width="40"
                  height="40"
                  className="brightness-90 contrast-125"
                />
              ) : (
                capitalizeFirst(initial)
              )}
            </div>
          </Media>

          <h2 className="relative text-xl font-semibold text-primary-300">
            {category.name}
          </h2>
        </div>

        <div className="mt-4 flex flex-col gap-5">
          {category.items && category.items?.length > 0 ? (
            category.items
              .filter((item) => item.status === "active")
              .map((item) => (
                <Item item={item} categoryName={category.name} key={item.id} />
              ))
          ) : (
            <div className="badge bg-slate-900 text-slate-300">
              <p>Ta kategoria nie posiada żadnych pozycji</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Category);
