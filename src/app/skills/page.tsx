import SkillsClient from "@/components/client/skills-client";
import axios from "axios";
import React from "react";

export default async function SkillPage() {
  const url =
    process.env.NEXT_PUBLIC_API_URL || `https://${process.env.VERCEL_URL}`;

  const skills = (await axios.get(`${url}/api/skills`)).data;

  const categories = (await axios.get(`${url}/api/categories`)).data;

  return <SkillsClient skills={skills} categories={categories} />;
}
