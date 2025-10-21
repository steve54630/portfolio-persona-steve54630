import { IStatus } from "@/types/status";
import statusData from "../data/status.json";
import stats from "../data/stats.json";

export class StatusService {
  private status: IStatus;

  constructor() {
    this.status = { ...statusData, stats };
  }

  getStatus(): IStatus {
    return this.status;
  }
}
