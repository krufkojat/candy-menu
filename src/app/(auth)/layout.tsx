import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { pacifico } from "@/utils/fonts";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => (
  <section className="overflow-hidden bg-gray-50 py-10">
    <div className="container">
      <Link
        href="/"
        className="btn-gray ransition mb-4 inline-flex items-center justify-center rounded-2xl border-2 border-slate-200/50 px-4 py-2 font-medium text-slate-500 duration-100 hover:bg-slate-50/40 focus:outline-none focus:ring focus:ring-slate-300/20 max-sm:w-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mr-2 size-6 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
        Wróć do aplikacji
      </Link>

      <div className="rounded-3xl bg-white p-10">
        <div className="flex flex-col gap-10 max-lg:items-center lg:flex-row">
          {children}

          <div className="relative w-full max-lg:hidden">
            <div
              className="flex h-full flex-col justify-start rounded-3xl bg-cover bg-center bg-no-repeat p-12 text-center bg-blend-darken lg:pt-14"
              style={{
                backgroundImage: `url(images/login.jpg)`,
              }}
            >
              <div className="absolute inset-x-0 top-0 h-3/5 w-full rounded-3xl bg-gradient-to-b from-black/50" />

              <div className="relative mx-auto md:max-w-md">
                <h3 className="mb-3 text-3xl font-bold tracking-tight text-white">
                  Menu Twojej restauracji dostępne wszędzie i zawsze – dzięki
                  <span
                    className={clsx(
                      "text-4xl text-primary-100",
                      pacifico.className,
                    )}
                  >
                    {" "}
                    Candy Menu!
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AuthLayout;
