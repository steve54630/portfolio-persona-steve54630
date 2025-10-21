import ConfidantClient from "@/components/client/confidants-client";
import axios from "axios";

export const dynamic = "force-dynamic";

async function ConfidantsPage() {
  const url =
    process.env.NEXT_PUBLIC_API_URL || `https://${process.env.VERCEL_URL}`;
  const response = await axios.get(`${url}/api/links`);
  const confidants = response.data;

  return <ConfidantClient confidants={confidants} />;
}

export default ConfidantsPage;
