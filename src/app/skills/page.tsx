import SkillsClient from "@/components/client/skills-client";
import { useApi } from "@/hooks/api";
import React from "react";

export async function SkillPage() {
  const api = useApi();
  const skills = (await api.get("/api/skills")).data;

  const categories = (await api.get("/api/categories")).data;

  return <SkillsClient skills={skills} categories={categories} />;
}

export default SkillPage;
