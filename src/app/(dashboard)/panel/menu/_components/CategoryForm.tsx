import yup from "@/libs/yup";
import React, { useCallback, useEffect } from "react";
import {
  MenuCategory,
  nextCategoryOrderState,
  useAddCategory,
  useUpdateCategory,
} from "@/store/menu";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "@/components/forms/FormInput";
import RequiredFields from "@/components/forms/RequiredFields";
import FormTextarea from "@/components/forms/FormTextarea";
import IconField from "@/app/(dashboard)/panel/menu/_components/IconField";
import { useRecoilValue } from "recoil";
import { nanoid } from "nanoid";
import SubmitButton from "@/components/forms/SubmitButton";

interface FormProps {
  closeModal: () => void;
  category?: Omit<MenuCategory, "items">;
}

interface FormData {
  name: string;
  icon?: number;
}

const resolver = yup.object({
  name: yup.string().min(3).max(99).required(),
  icon: yup.number().optional(),
});

const CategoryForm: React.FC<FormProps> = ({ closeModal, category }) => {
  const nameRef = React.useRef<HTMLInputElement>(null);

  const defaultValues: FormData = {
    name: category?.name || "",
    icon: category?.icon || undefined,
  };

  const methods = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(resolver),
  });

  const addCategory = useAddCategory();
  const updateCategory = useUpdateCategory();
  const nextCategoryOder = useRecoilValue(nextCategoryOrderState);

  const handleSubmit = useCallback<SubmitHandler<FormData>>(
    (formValues: FormData) => {
      const newCategory: MenuCategory = {
        ...(category || {}),
        ...formValues,
        id: category?.id || nanoid(),
        order: category?.order || nextCategoryOder,
      };

      if (category) {
        updateCategory(newCategory);
      } else {
        addCategory(newCategory);
      }

      closeModal();

      toast.success(category ? "Zapisano zmiany!" : "Dodano kategorię!");
    },
    [addCategory, category, closeModal, nextCategoryOder, updateCategory],
  );

  useEffect(() => {
    if (!category && nameRef.current) {
      nameRef.current.focus();
    }
  }, [category]);

  return (
    <div className="flex flex-col gap-10">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="space-y-7"
        >
          <FormInput
            name="name"
            label="Nazwa kategorii"
            inputRef={nameRef}
            isRequired
          />

          <FormTextarea name="description" label="Opis" />

          <IconField />

          <div className="flex items-end pt-10">
            <SubmitButton
              text={category ? "Zapisz zmiany" : "Dodaj kategorię"}
            />
          </div>
        </form>
      </FormProvider>

      <RequiredFields />
    </div>
  );
};

export default CategoryForm;
