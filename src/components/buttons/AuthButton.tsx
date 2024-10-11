"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import IconButton from "@/components/buttons/IconButton";
import { Bars3Icon, UserIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import useDialog from "@/hooks/useDialog";
import MobileNav from "@/app/(dashboard)/_components/nav/MobileNav";

const AuthButton: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const menuOpen = useDialog();

  if (!isAuthenticated) {
    return (
      <Link href="/panel">
        <IconButton
          icon={
            <UserIcon className="size-4 text-white" data-testid="icon-user" />
          }
        />
      </Link>
    );
  }

  return (
    <>
      <IconButton
        onClick={menuOpen.openModal}
        icon={
          <Bars3Icon className="size-4 text-white" data-testid="icon-bars" />
        }
      />

      <MobileNav menuOpen={menuOpen} />
    </>
  );
};

export default AuthButton;
