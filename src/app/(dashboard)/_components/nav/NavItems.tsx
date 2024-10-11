import React from "react";
import Link from "next/link";
import clsx from "clsx";
import MenuSettingsIcon from "@/components/icons/MenuSettingsIcon";
import MenuMenuIcon from "@/components/icons/MenuMenuIcon";
import { useAuth, useAuthDispatch } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { pacifico } from "@/utils/fonts";
import LogoutIcon from "@/components/icons/LogoutIcon";

interface NavItem {
  name: string;
  href: string;
  icon: React.FC;
}

interface NavItemProps {
  close?: () => void;
}

const navItems: NavItem[] = [
  {
    name: "Ustawienia",
    href: "/panel",
    icon: MenuSettingsIcon,
  },
  {
    name: "Karta menu",
    href: "/panel/menu",
    icon: MenuMenuIcon,
  },
];

const NavItems: React.FC<NavItemProps> = ({ close }) => {
  const { user } = useAuth();
  const dispatch = useAuthDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    toast.success("Wylogowano!");

    router.push("/");
  };

  return (
    <div className="relative flex h-fit flex-col items-center py-8 lg:w-60 lg:rounded-2xl lg:bg-white lg:px-10 lg:shadow-sm">
      <Link
        onClick={() => close && close()}
        href="/"
        className={clsx(
          "text-3xl font-bold text-primary-300",
          pacifico.className,
        )}
      >
        CandyMenu
      </Link>

      <div className="mb-7 mt-4 flex items-center justify-center">
        <span className="flex w-full items-center justify-center break-all rounded-xl bg-slate-50 px-3 py-1 text-center font-semibold text-slate-400">
          {user.username}
        </span>
      </div>

      <nav
        aria-label="User navigation"
        className="mb-4 flex flex-col space-y-2.5 border-b-2 border-dotted border-slate-100 pb-4 font-semibold text-gray-500"
      >
        {navItems.map((navItem) => {
          const Icon = navItem.icon;

          return (
            <Link
              key={navItem.name}
              onClick={() => close && close()}
              href={navItem.href}
            >
              <button
                className={clsx(
                  "flex w-full items-center rounded-xl px-4 py-2.5 font-medium transition-colors",
                  pathname === navItem.href
                    ? "text-primary-500 hover:bg-primary-50"
                    : "text-slate-500 hover:bg-slate-100",
                )}
              >
                <Icon />

                <span className="ml-2">{navItem.name}</span>
              </button>
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        className="flex items-center rounded-xl px-4 py-2.5 font-medium text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-500"
        onClick={logout}
      >
        <LogoutIcon />

        <span className="ml-2">Wyloguj</span>
      </button>
    </div>
  );
};

export default NavItems;
