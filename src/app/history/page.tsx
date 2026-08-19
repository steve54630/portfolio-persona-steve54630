import { experienceService } from "@/app/api";
import HistoryClient from "@/components/client/history-client";

export const metadata = {
  title: "History - Le parcours de Steve",
  description: "Le parcours professionnel de Steve Retournay",
};

export default function HistoryPage() {
  return <HistoryClient experiences={experienceService.getExperiences()} />;
}
