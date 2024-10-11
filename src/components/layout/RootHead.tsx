"use client";

import React from "react";
import { mediaStyles } from "@/utils/media";
import Head from "next/head";

const RootHead: React.FC = () => (
  <Head>
    <style
      key="fresnel-css"
      dangerouslySetInnerHTML={{ __html: mediaStyles }}
      type="text/css"
    />
  </Head>
);

export default RootHead;
