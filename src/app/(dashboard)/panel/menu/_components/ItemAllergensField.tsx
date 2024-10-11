import React, { useMemo } from "react";
import FormTagsField from "@/components/forms/FormTagsField";
import { useRecoilValue } from "recoil";
import { itemDetailsState } from "@/store/menu";

const ItemAllergensField: React.FC = () => {
  const ingredients = useRecoilValue(itemDetailsState("allergens"));

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
        label="Alergeny"
        name="allergens"
        placeholder="Dodaj lub wybierz alergen"
      />
    </div>
  );
};

export default ItemAllergensField;
