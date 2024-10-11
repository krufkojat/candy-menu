import React, { useMemo } from "react";
import FormTagsField from "@/components/forms/FormTagsField";
import { useRecoilValue } from "recoil";
import { itemDetailsState } from "@/store/menu";

const ItemIngredientsField: React.FC = () => {
  const ingredients = useRecoilValue(itemDetailsState("ingredients"));

  const suggestions = useMemo(
    () =>
      ingredients.map((ingredient) => ({
        label: ingredient,
        value: ingredient,
      })),
    [ingredients],
  );

  return (
    <div className="space-y-10">
      <FormTagsField
        suggestions={suggestions}
        label="Składniki"
        name="ingredients"
        placeholder="Dodaj lub wybierz składnik"
      />
    </div>
  );
};

export default ItemIngredientsField;
