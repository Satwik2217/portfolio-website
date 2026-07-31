"use client";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

const EasterEggs = dynamic(() => import("@/components/EasterEggs"), {
  ssr: false,
});

export default function ClientEffects() {
  return (
    <>
      <CustomCursor />
      <EasterEggs />
    </>
  );
}
