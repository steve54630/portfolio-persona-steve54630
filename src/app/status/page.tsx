import StatusViewer from "@/components/client/status-viewer";
import axios from "axios";

async function page() {

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stats`
  );
  const stats = response.data;

  return <StatusViewer stats={stats}></StatusViewer>;
}

export default page;
