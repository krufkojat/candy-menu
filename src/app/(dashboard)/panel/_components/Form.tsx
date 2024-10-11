import yup from "@/libs/yup";
import { useRecoilState } from "recoil";
import { businessState } from "@/store/business";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback } from "react";
import FormInput from "@/components/forms/FormInput";
import RequiredFields from "@/components/forms/RequiredFields";
import Button from "@/components/buttons/Button";
import toast from "react-hot-toast";

interface FormProps {
  closeModal: () => void;
}

interface FormData {
  name: string;
  address: string;
}

const resolver = yup.object({
  name: yup.string().min(3).max(99).required(),
  address: yup.string().min(19).max(999).required(),
});

const Form: React.FC<FormProps> = ({ closeModal }) => {
  const [business, setBusiness] = useRecoilState(businessState);

  const defaultValues: FormData = {
    name: business.name,
    address: business.address,
  };

  const methods = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(resolver),
  });

  const handleSubmit = useCallback<SubmitHandler<FormData>>(
    (formValues: FormData) => {
      setBusiness(formValues);

      closeModal();

      toast.success("Zapisano zmiany!");
    },
    [setBusiness, closeModal],
  );

  return (
    <div className="flex flex-col gap-10">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="space-y-7"
        >
          <FormInput name="name" label="Nazwa lokalu" isRequired />

          <FormInput name="address" label="Adres" isRequired />

          <div className="flex items-end pt-10">
            <Button type="submit" intent="primary" className="ml-auto">
              Zapisz zmiany
            </Button>
          </div>
        </form>
      </FormProvider>

      <RequiredFields />
    </div>
  );
};

export default Form;
