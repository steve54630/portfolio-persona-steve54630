import SkillsClient from "@/components/client/skills-client";
import axios from "axios";
import React from "react";

export async function SkillPage() {
  const skills = (
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`)
  ).data;

  const categories = (
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
  ).data;

  return <SkillsClient skills={skills} categories={categories} />;
}

export default SkillPage;
