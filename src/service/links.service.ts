import { ILink } from "@/types/link";
import linksData from "../data/links.json";

export class LinksService {
    private links: ILink[];

    constructor() {
        this.links = linksData;
    }

    getLinks(): ILink[] {
        return this.links;
    }
}