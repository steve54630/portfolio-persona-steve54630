import PersonasClient from "../../components/client/personas-client";
import { IPersona } from "@/types/persona";

// Fonction serveur pour Fetch les personas
async function getPersonas(): Promise<IPersona[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/persona`, {
      next: { revalidate: 3600 }, // Cache les données pendant 1h
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des personas:", error);
    return [];
  }
}

export default async function PersonasPage() {
  const personas = await getPersonas();

  return <PersonasClient initialPersonas={personas} />;
}