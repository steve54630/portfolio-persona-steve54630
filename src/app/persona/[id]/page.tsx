import PersonaPageClient from "@/components/client/persona-client";
import { IPersona } from "@/types/persona";
import axios from "axios";

export default async function PersonaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const url = process.env.NEXT_PUBLIC_API_URL || `https://${process.env.VERCEL_URL}`;
  const response = await axios.get(
    `${url}/api/persona/${id}`
  );
  const persona: IPersona = response.data;

  return <PersonaPageClient persona={persona} />;
}
