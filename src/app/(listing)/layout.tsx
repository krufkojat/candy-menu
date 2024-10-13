import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { pacifico } from "@/utils/fonts";
import AuthButton from "@/components/buttons/AuthButton";
import background from "/public/patterns/food.svg";
import { HeartIcon } from "@heroicons/react/16/solid";
import IconButton from "@/components/buttons/IconButton";

interface ListingLayoutProps {
  children: React.ReactNode;
}

const ListingLayout: React.FC<ListingLayoutProps> = ({ children }) => (
  <div
    className="min-h-screen bg-primary-50 pb-14"
    style={{
      backgroundImage: `url("${background.src}")`,
    }}
  >
    <header
      aria-label="header"
      className="container mx-auto mb-14 flex max-w-4xl justify-between py-4"
    >
      <Link
        href="/public"
        className={clsx(
          "text-3xl font-bold text-primary-300 transition-colors hover:text-primary-400",
          pacifico.className,
        )}
      >
        <span className="hidden md:inline">CandyMenu</span>
        <span className="indline md:hidden">C&apos;Menu</span>
      </Link>

      <div className="flex gap-2">
        <IconButton icon={<HeartIcon className="size-4 text-white" />} />

        <AuthButton />
      </div>
    </header>

    {children}
  </div>
);

export default ListingLayout;
