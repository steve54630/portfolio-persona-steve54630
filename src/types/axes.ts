import { IStats } from "./stats";

export type Axes = {
  x: number;
  y: number;
  stat: IStats;
  textAnchor: "start" | "middle" | "end";
  dominantBaseline: "hanging" | "auto" | "middle";
};
