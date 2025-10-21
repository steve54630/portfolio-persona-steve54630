import { IStats } from "./stats";

export type IStatus = {
    level: string;
    hp: number;
    maxHp: number;
    sp: number;
    maxSp: number;
    stats: IStats[]
}