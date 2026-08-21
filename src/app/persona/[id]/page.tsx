
import PersonaPageClient from "@/components/client/persona-client";
import { IPersona } from "@/types/persona";
import axios from "axios";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PersonaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const url = process.env.NEXT_PUBLIC_API_URL || `https://${process.env.VERCEL_URL}`;

  let persona: IPersona;
  try {
    const response = await axios.get(`${url}/api/persona/${id}`);
    persona = response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }
    throw error;
  }

  return <PersonaPageClient persona={persona} />;
}
