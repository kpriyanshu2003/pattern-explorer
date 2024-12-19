import Main from "@/components/globals/Main";
import SideBar from "@/components/globals/SideBar";

export default async function Home({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  if (!id) window.location.href = "/";
  if (typeof window !== "undefined") {
    const queries = JSON.parse(localStorage.getItem("queries") || "[]");
    if (!queries.find((query: { id: string }) => query.id === id)) {
      window.location.href = "/";
    }
  }

  return (
    <div className="text-white bg-[#212121] flex h-dvh">
      <SideBar id={id} />
      <Main id={id} />
    </div>
  );
}
