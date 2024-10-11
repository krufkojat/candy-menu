import { MenuItem } from "@/store/menu";
import React from "react";

interface MenuItemDialogBodyProps {
  item: MenuItem;
}

const ItemDialogBody: React.FC<MenuItemDialogBodyProps> = ({ item }) => (
  <div className="flex max-w-lg flex-col gap-7">
    <div className="flex flex-col gap-1">
      <h1
        className="hyphens-auto text-lg font-semibold text-primary-300 transition-colors md:text-2xl md:font-bold"
        lang="pl"
      >
        {item.name}
      </h1>

      <div className="mt-2 flex w-fit flex-wrap gap-1.5 border-t-2 border-dotted border-slate-600 pt-1 text-center md:divide-x md:divide-slate-700">
        {item.price && (
          <div className="text-slate-50">
            <span>{item.price}</span>

            <span>zł</span>
          </div>
        )}

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

    <div className="space-y-7">
      {item.ingredients && item.ingredients.length > 0 && (
        <div>
          <span className="mb-0.5 block text-primary-200">Składniki:</span>

          <span className="italic text-slate-200">
            {item.ingredients.map((ingredient) => ingredient).join(", ")}
          </span>
        </div>
      )}

      {item.attributes && item.attributes.length > 0 && (
        <div>
          <span className="mb-1 block text-slate-200">Cechy:</span>

          <div className="flex flex-wrap items-center gap-1">
            {item.attributes.map((attribute) => (
              <div
                key={attribute}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-700 px-2 py-0.5 text-emerald-400"
              >
                {attribute}
              </div>
            ))}
          </div>
        </div>
      )}

      {item.allergens && item.allergens.length > 0 && (
        <div>
          <span className="mb-1 block text-slate-200">Alergeny:</span>

          <div className="flex flex-wrap items-center gap-1">
            {item.allergens.map((allergen) => (
              <div
                key={allergen}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-700 px-2 py-0.5 text-rose-400"
              >
                {allergen}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default ItemDialogBody;
