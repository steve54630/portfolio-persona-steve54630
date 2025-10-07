import { MenuButtonProps } from "@/types/props";

export const buttons: MenuButtonProps[] = [
    {
      title: "Skills",
      explanation: "Ce que je sais faire",
      url: "/skills",
      color: "hover:bg-blue-600 focus:bg-blue-600",
    },
    {
      title: "Status",
      explanation: "Qui suis-je",
      url: "/status",
      color: "hover:bg-green-400 focus:bg-green-400",
    },
    {
      title: "Persona",
      explanation: "Quels sont mes projets",
      url: "/persona",
      color: "hover:bg-red-600 focus:bg-red-600",
    },
    {
      title: "Confidants",
      explanation: "Comment me contacter",
      url: "/confidants",
      color: "hover:bg-blue-600 focus:bg-blue-600",
    },
    {
      title: "History",
      explanation: "Mentions légales",
      url: "/mentions-legales",
      color: "hover:bg-gray-600 focus:bg-gray-600",
    },
  ];