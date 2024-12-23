"use client";
import dynamic from "next/dynamic";

const SideBar = dynamic(() => import("@/components/globals/SideBar"), {
  ssr: false,
});
const Main = dynamic(() => import("@/components/globals/Main"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="text-white bg-[#212121] flex h-dvh">
      <SideBar />
      <Main />
    </div>
  );
}
