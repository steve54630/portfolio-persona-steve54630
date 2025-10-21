import StatusViewer from "@/components/client/status-viewer";
import axios from "axios";

async function page() {

  const url = process.env.NEXT_PUBLIC_API_URL || `https://${process.env.VERCEL_URL}`
  const response = await axios.get(

    `${url}/api/stats`
  );
  const stats = response.data;

  return <StatusViewer stats={stats}></StatusViewer>;
}

export default page;
