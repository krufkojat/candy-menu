import React, { useCallback, useEffect } from "react";
import {
  Attribute,
  attributes,
  MenuItem,
  nextItemOrderState,
  useAddItem,
  useUpdateItem,
} from "@/store/menu";
import yup from "@/libs/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormInput from "@/components/forms/FormInput";
import RequiredFields from "@/components/forms/RequiredFields";
import ItemIngredientsField from "@/app/(dashboard)/panel/menu/_components/ItemIngredientsField";
import ItemAllergensField from "@/app/(dashboard)/panel/menu/_components/ItemAllergensField";
import ItemStatusField from "@/app/(dashboard)/panel/menu/_components/ItemStatusField";
import { useRecoilValue } from "recoil";
import { nanoid } from "nanoid";
import { yupResolver } from "@hookform/resolvers/yup";
import SubmitButton from "@/components/forms/SubmitButton";
import FormAttributesField from "@/components/forms/FormAttributesField";

interface ItemFormProps {
  closeModal: () => void;
  item?: MenuItem;
  categoryId: string;
}

interface FormData {
  name: string;
  price?: number;
  magnitude: string;
  calories?: number;
  ingredients?: {
    label: string;
    value: string;
  }[];
  allergens?: {
    label: string;
    value: string;
  }[];
  attributes?: Attribute[];
  status: "hidden" | "active";
}

const resolver = yup.object({
  name: yup.string().min(3).max(99).required(),
  price: yup.number().min(0.01, "Cena musi być wyższa niż 0.01"),
  magnitude: yup.string().required(),
  calories: yup
    .number()
    .positive()
    .optional()
    .transform((_, val) => (val !== "" ? Number(val) : undefined)),
  ingredients: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().max(30).required(),
      }),
    )
    .optional(),
  allergens: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().max(30).required(),
      }),
    )
    .optional(),
  attributes: yup
    .array()
    .of(yup.string().oneOf(attributes).required())
    .optional(),
  status: yup.string().oneOf(["active", "hidden"]).required(),
});

const ItemForm: React.FC<ItemFormProps> = ({
  closeModal,
  item,
  categoryId,
}) => {
  const nameRef = React.useRef<HTMLInputElement>(null);

  const addItem = useAddItem();
  const updateItem = useUpdateItem();
  const nextItemOrder = useRecoilValue(nextItemOrderState(categoryId));

  const defaultValues: FormData = {
    name: item?.name || "",
    price: item?.price,
    magnitude: item?.magnitude || "",
    calories: item?.calories || undefined,
    ingredients:
      item?.ingredients?.map((ingredient) => ({
        label: ingredient,
        value: ingredient,
      })) || [],
    allergens:
      item?.allergens?.map((allergen) => ({
        label: allergen,
        value: allergen,
      })) || [],
    attributes: item?.attributes || [],
    status: item?.status || "active",
  };

  const methods = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(resolver),
  });

  const handleSubmit = useCallback<SubmitHandler<FormData>>(
    (formValues: FormData) => {
      const newItem: MenuItem = {
        ...(item || {}),
        ...formValues,
        id: item?.id || nanoid(),
        order: item?.order || nextItemOrder,
        price: formValues.price || 0,
        ingredients:
          formValues.ingredients?.map((ingredient) => ingredient.value) || [],
        allergens:
          formValues.allergens?.map((allergen) => allergen.value) || [],
      };

      if (item) {
        updateItem(categoryId, newItem);
      } else {
        addItem(categoryId, newItem);
      }

      closeModal();

      toast.success(item ? "Zapisano zmiany!" : "Dodano potrawę!");
    },
    [item, nextItemOrder, categoryId, updateItem, addItem, closeModal],
  );

  useEffect(() => {
    if (!item && nameRef.current) {
      nameRef.current.focus();
    }
  }, [item]);

  return (
    <div className="flex flex-col gap-10">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="space-y-7"
        >
          <FormInput
            name="name"
            label="Nazwa potrawy"
            inputRef={nameRef}
            isRequired
          />

          <div className="flex w-full items-center gap-4 max-sm:flex-col max-sm:gap-2.5">
            <FormInput
              name="price"
              type="number"
              label="Cena"
              isRequired
              step={0.01}
            />

            <FormInput name="magnitude" label="Rozmiar" />

            <FormInput type="number" name="calories" label="Kalorie" />
          </div>

          <FormAttributesField
            attributes={[...attributes]}
            name="attributes"
            label="Cechy"
          />

          <ItemIngredientsField />

          <ItemAllergensField />

          <ItemStatusField />

          <div className="flex items-end pt-10">
            <SubmitButton text={item ? "Zapisz zmiany" : "Dodaj potrawę"} />
          </div>
        </form>
      </FormProvider>

      <RequiredFields />
    </div>
  );
};

export default ItemForm;
