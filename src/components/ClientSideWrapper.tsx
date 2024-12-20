"use client";

import dynamic from "next/dynamic"; // Dynamically import components to improve performance

const SideBar = dynamic(() => import("@/components/globals/SideBar"), {
  ssr: false, // Disable server-side rendering for the component
});
const Main = dynamic(() => import("@/components/globals/Main"), {
  ssr: false,
});

interface ClientSideWrapperProps {
  id: string;
}

const ClientSideWrapper = ({ id }: ClientSideWrapperProps) => {
  return (
    <div className="text-white bg-[#212121] flex h-dvh">
      <SideBar id={id} />
      <Main id={id} />
    </div>
  );
};

export default ClientSideWrapper;
