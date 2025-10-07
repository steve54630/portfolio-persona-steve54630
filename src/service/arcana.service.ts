import { IArcana } from "@/types/arcana";
import arcanaData from "../data/arcana.json";

export class ArcanaService {
  private arcanas: IArcana[];

  constructor() {
    this.arcanas = arcanaData;
  }

  public getArcanaById(id: string): IArcana {
    return this.arcanas.find((arcana) => arcana.id === id)!;
  }

  public getArcanas(): IArcana[] {
    return this.arcanas;
  }
}
