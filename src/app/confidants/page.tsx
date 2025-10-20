import ConfidantClient from "@/components/client/confidants-client";
import { useApi } from "@/hooks/api";

async function ConfidantsPage() {
  const api = useApi();

  const response = await api.get("/api/links");
  const confidants = response.data;

  return <ConfidantClient confidants={confidants} />;
}

export default ConfidantsPage;
