import {Icon} from "./icon";

export class SourceType {
    static readonly CONTAINER = new SourceType("CONTAINER", Icon.Container, "Container");
    static readonly CRAFTED = new SourceType("CRAFTED", Icon.Crafted, "Crafted");
    static readonly CREATED = new SourceType("CREATED", Icon.Created, "Created");
    static readonly DISENCHANTED = new SourceType("DISENCHANTED", Icon.Disenchanted, "Disenchanted");
    static readonly DROP = new SourceType("DROP", Icon.Drop, "Drop");
    static readonly FISHED = new SourceType("FISHED", Icon.Fished, "Fished");
    static readonly GATHERED = new SourceType("GATHERED", Icon.Gathered, "Gathered");
    static readonly MILLED = new SourceType("MILLED", Icon.Milled, "Milled");
    static readonly MINED = new SourceType("MINED", Icon.Mined, "Mined");
    static readonly PROSPECTED = new SourceType("PROSPECTED", Icon.Prospected, "Prospected");
    static readonly QUEST = new SourceType("QUEST", Icon.Quest, "Quest");
    static readonly SKINNED = new SourceType("SKINNED", Icon.Skinned, "Skinned");
    static readonly SOLD = new SourceType("SOLD", Icon.Sold, "Sold");
    static readonly SURVEYED = new SourceType("SURVEYED", Icon.Archeology, "Surveyed");

    public static readonly values = [SourceType.CONTAINER, SourceType.CRAFTED, SourceType.CREATED, SourceType.DISENCHANTED,
        SourceType.DROP, SourceType.FISHED, SourceType.GATHERED, SourceType.MILLED, SourceType.MINED, SourceType.PROSPECTED,
        SourceType.QUEST, SourceType.SKINNED, SourceType.SOLD, SourceType.SURVEYED];

    private constructor(private readonly key: string, public readonly icon: Icon, public readonly name: string) {
    }

    toString(): string {
        return this.key;
    }

    static fromString(key: string): SourceType {
        for (const sourceType of SourceType.values) {
            if (sourceType.key === key) {
                return sourceType;
            }
        }
        throw new Error("Could not find Source Type with key " + key);
    }
}