import PersonaPageClient from "@/components/client/persona-client";
import { useApi } from "@/hooks/api";
import { IPersona } from "@/types/persona";
import axios from "axios";

export default async function PersonaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/persona/${id}`
  );
  const persona: IPersona = response.data;

  return <PersonaPageClient persona={persona} />;
}
