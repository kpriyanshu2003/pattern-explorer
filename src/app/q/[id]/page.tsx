import ClientSideWrapper from "@/components/ClientSideWrapper";

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

  return <ClientSideWrapper id={id} />;
}
