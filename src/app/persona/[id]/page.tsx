import PersonaPageClient from "@/components/client/persona-client";
import { useApi } from "@/hooks/api";
import { IPersona } from "@/types/persona";

export default async function PersonaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const api = useApi();

  const response = await api.get(`/api/persona/${id}`);
  const persona: IPersona = response.data;

  return <PersonaPageClient persona={persona} />;
}
