import StatusViewer from "@/components/client/status-viewer";
import { useApi } from "@/hooks/api";
import React from "react";

async function page() {
  const api = useApi();

  const response = await api.get("/api/status");
  const stats = response.data;

  return <StatusViewer stats={stats}></StatusViewer>;
}

export default page;
