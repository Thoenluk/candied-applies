import {Icon} from "./icon";

export class Requirement {
    static readonly ALCHEMY = new Requirement("ALCHEMY", Icon.Alchemy, "Alchemy");
    static readonly ARCHEOLOGY = new Requirement("ARCHEOLOGY", Icon.Archeology, "Archeology");
    static readonly BLACKSMITHING = new Requirement("BLACKSMITHING", Icon.Blacksmithing, "Blacksmithing");
    static readonly COOKING = new Requirement("COOKING", Icon.Cooking, "Cooking");
    static readonly ENCHANTING = new Requirement("ENCHANTING", Icon.Enchanting, "Enchanting");
    static readonly ENGINEERING = new Requirement("ENGINEERING", Icon.Engineering, "Engineering");
    static readonly FLYING = new Requirement("FLYING", Icon.Flying, "Flying");
    static readonly FISHING = new Requirement("FISHING", Icon.Fishing, "Fishing");
    static readonly GROUP = new Requirement("GROUP", Icon.Group, "Group");
    static readonly HERBALISM = new Requirement("HERBALISM", Icon.Herbalism, "Herbalism");
    static readonly INSCRIPTION = new Requirement("INSCRIPTION", Icon.Inscription, "Inscription");
    static readonly JEWELCRAFTING = new Requirement("JEWELCRAFTING", Icon.Jewelcrafting, "Jewelcrafting");
    static readonly LEATHERWORKING = new Requirement("LEATHERWORKING", Icon.Leatherworking, "Leatherworking");
    static readonly MINING = new Requirement("MINING", Icon.Mining, "Mining");
    static readonly QUEST = new Requirement("QUEST", Icon.Quest, "Quest");
    static readonly SKINNING = new Requirement("SKINNING", Icon.Skinning, "Skinning");
    static readonly TAILORING = new Requirement("TAILORING", Icon.Tailoring, "Tailoring");

    public static readonly values = [
        Requirement.ALCHEMY,
        Requirement.ARCHEOLOGY,
        Requirement.BLACKSMITHING,
        Requirement.COOKING,
        Requirement.ENCHANTING,
        Requirement.ENGINEERING,
        Requirement.FLYING,
        Requirement.FISHING,
        Requirement.GROUP,
        Requirement.HERBALISM,
        Requirement.INSCRIPTION,
        Requirement.JEWELCRAFTING,
        Requirement.LEATHERWORKING,
        Requirement.MINING,
        Requirement.QUEST,
        Requirement.SKINNING,
        Requirement.TAILORING
    ];

    private constructor(private readonly key: string, public readonly icon: Icon, public readonly name: string) {
    }

    toString(): string {
        return this.key;
    }

    static fromString(key: string): Requirement {
        for (const requirement of Requirement.values) {
            if (requirement.key === key) {
                return requirement;
            }
        }
        throw new Error("Could not find Requirement with key " + key);
    }
}