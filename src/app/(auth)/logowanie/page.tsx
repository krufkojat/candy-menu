"use client";

import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "@/components/forms/FormInput";
import PasswordInput from "@/components/forms/PasswordInput";
import RequiredFields from "@/components/forms/RequiredFields";
import { useAuth, useAuthDispatch } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import yup from "@/libs/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import SubmitButton from "@/components/forms/SubmitButton";
import clsx from "clsx";
import { pacifico } from "@/utils/fonts";

interface FormData {
  login: string;
  password?: string;
}

const resolver = yup.object({
  login: yup.string().required(),
  password: yup.string().optional(),
});

const SignPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const dispatch = useAuthDispatch();
  const router = useRouter();

  const defaultValues: FormData = {
    login: "admin",
    password: "admin",
  };

  const methods = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(resolver),
  });

  const handleSubmit = useCallback<SubmitHandler<FormData>>(
    (formValues) => {
      if (
        formValues.login === user.username &&
        formValues.password === user.password
      ) {
        dispatch({ type: "LOGIN" });

        toast.success("Zalogowano poprawnie!");

        return router.push("/");
      }

      toast.error("Niepoprawny login lub hasło!");
    },
    [dispatch, router, user.password, user.username],
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/panel");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="w-full shrink-0 md:w-2/3 lg:w-1/2">
      <div className="mx-auto py-12 md:max-w-md">
        <div className="mb-10 flex flex-col">
          <Link
            href="/"
            className={clsx(
              "mb-14 text-3xl font-bold text-primary-400 transition-colors hover:text-primary-500",
              pacifico.className,
            )}
          >
            CandyMenu
          </Link>

          <h3 className="mb-5 border-b border-gray-100 bg-gradient-to-br from-primary-500 via-primary-300 to-sky-600 bg-clip-text pb-2 text-3xl font-bold tracking-tight text-slate-700 text-transparent">
            Miło Cię widzieć!
          </h3>

          <p className="text-slate-500">Podaj swoje dane, aby się zalogować.</p>
        </div>

        <div className="flex flex-col gap-10">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(handleSubmit)}
              className="space-y-7"
            >
              <FormInput
                name="login"
                label="Email lub nazwa użytkownika"
                isRequired
              />

              <PasswordInput name="password" label="Hasło" isRequired />

              <SubmitButton text="Zaloguj się" />
            </form>
          </FormProvider>

          <RequiredFields />
        </div>
      </div>
    </div>
  );
};

export default SignPage;
