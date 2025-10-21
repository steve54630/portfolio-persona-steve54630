import { IStats } from "./stats";

export type IStatus = {
    level: number;
    hp: number;
    maxHp: number;
    sp: number;
    maxSp: number;
    stats: IStats[]
}