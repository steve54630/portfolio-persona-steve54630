import ConfidantClient from "@/components/client/confidants-client";
import axios from "axios";

async function ConfidantsPage() {

  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/confidants`);
  const confidants = response.data;

  return <ConfidantClient confidants={confidants} />;
}

export default ConfidantsPage;
