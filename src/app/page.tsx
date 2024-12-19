import Main from "@/components/globals/Main";
import SideBar from "@/components/globals/SideBar";

export default function Home() {
  return (
    <div className="text-white bg-[#212121] flex h-dvh">
      <SideBar />
      <Main />
    </div>
  );
}
