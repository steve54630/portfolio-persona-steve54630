import StatusViewer from "@/components/client/status-viewer";
import axios from "axios";

export const dynamic = "force-dynamic";

async function StatusPage() {

  const url = process.env.NEXT_PUBLIC_API_URL || `https://${process.env.VERCEL_URL}`
  const response = await axios.get(

    `${url}/api/status`
  );
  const stats = response.data;

  return <StatusViewer stats={stats}></StatusViewer>;
}

export default StatusPage;
