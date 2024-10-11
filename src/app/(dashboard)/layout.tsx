"use client";

import React, { useEffect } from "react";
import MobileNav from "@/app/(dashboard)/_components/nav/MobileNav";
import Header from "@/app/(dashboard)/_components/header/Header";
import DesktopNav from "@/app/(dashboard)/_components/nav/DesktopNav";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import useDialog from "@/hooks/useDialog";
import { Media } from "@/utils/media";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const menuOpen = useDialog();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/logowanie");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="block md:flex">
      <Media lessThan="lg">
        <MobileNav menuOpen={menuOpen} />
      </Media>

      <div className="relative flex min-h-screen flex-1 flex-col">
        <Media lessThan="lg">
          <Header menuOpen={menuOpen} />
        </Media>

        <div className="container">
          <div className="flex py-14">
            <Media greaterThanOrEqual="lg">
              <DesktopNav />
            </Media>

            <div className="w-full flex-1">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
