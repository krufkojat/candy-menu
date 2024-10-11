"use client";

import React from "react";
import AuthProvider from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import { MediaContextProvider } from "@/utils/media";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <RecoilRoot>
      <MediaContextProvider>{children}</MediaContextProvider>

      <Toaster position="top-center" />
    </RecoilRoot>
  </AuthProvider>
);

export default Providers;
