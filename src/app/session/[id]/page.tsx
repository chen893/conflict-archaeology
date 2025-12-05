import { use } from "react";
import { redirect } from "next/navigation";

export default function SessionIndexPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  redirect(`/session/${id}/calm-down`);
}
