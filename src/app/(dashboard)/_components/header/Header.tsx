import Link from "next/link";
import clsx from "clsx";
import IconButton from "@/components/buttons/IconButton";
import { Bars3Icon } from "@heroicons/react/16/solid";
import React from "react";
import { pacifico } from "@/utils/fonts";

interface HeaderProps {
  menuOpen: {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  };
}

const Header = ({ menuOpen }: HeaderProps) => {
  const { openModal } = menuOpen;

  return (
    <header aria-label="header" className="bg-primary-50">
      <div className="container mx-auto flex justify-between py-4">
        <Link
          href="/"
          className={clsx(
            "text-3xl font-bold text-primary-300 transition-colors hover:text-primary-400",
            pacifico.className,
          )}
        >
          <span className="hidden md:inline">CandyMenu</span>
          <span className="indline md:hidden">C&apos;Menu</span>
        </Link>

        <div className="flex gap-2">
          <IconButton
            onClick={openModal}
            icon={<Bars3Icon className="size-4 text-white" />}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
