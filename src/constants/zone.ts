import {MapImage} from "./mapImage";

export class Zone {
    static readonly AZEROTH = new Zone("AZEROTH", MapImage.Azeroth, "Azeroth");
    static readonly DARKMOON_ISLAND = new Zone("DARKMOON_ISLAND", MapImage.DarkmoonIsland, "Darkmoon Island");
    static readonly DEEPHOLM = new Zone("DEEPHOLM", MapImage.Deepholm, "Deepholm");
    static readonly ENCHANTING = new Zone("ENCHANTING", MapImage.Enchanting, "Enchanting");
    static readonly FERALAS = new Zone("FERALAS", MapImage.Feralas, "Feralas");
    static readonly LOST_CITY_OF_THE_TOLVIR = new Zone("LOST_CITY_OF_THE_TOLVIR", MapImage.LostCityOfTheTolvir, "Lost City of the Tol'vir");
    static readonly MOLTEN_FRONT = new Zone("MOLTEN_FRONT", MapImage.MoltenFront, "Molten Front");
    static readonly MOUNT_HYJAL = new Zone("MOUNT_HYJAL", MapImage.MountHyjal, "Mount Hyjal");
    static readonly PROSPECTING = new Zone("PROSPECTING", MapImage.Prospecting, "Prospecting");
    static readonly TOL_BARAD = new Zone("TOL_BARAD", MapImage.TolBarad, "Tol Barad");
    static readonly TOL_BARAD_PENINSULA = new Zone("TOL_BARAD_PENINSULA", MapImage.TolBaradPeninsula, "Tol Barad Peninsula");
    static readonly TRANSMUTATION_WITHOUT_CD = new Zone("TRANSMUTATION_WITHOUT_CD", MapImage.TransmutationWithoutCD, "Transmutation without CD");
    static readonly TRANSMUTATION_WITH_CD = new Zone("TRANSMUTATION_WITH_CD", MapImage.TransmutationWithCD, "Transmutation with CD");
    static readonly TWILIGHT_HIGHLANDS = new Zone("TWILIGHT_HIGHLANDS", MapImage.TwilightHighlands, "Twilight Highlands");
    static readonly ULDUM = new Zone("ULDUM", MapImage.Uldum, "Uldum");
    static readonly VASHJIR_ABYSSAL_DEPTHS = new Zone("VASHJIR_ABYSSAL_DEPTHS", MapImage.VashjirAbyssalDepths, "Vashj'ir: Abyssal Depths");
    static readonly VASHJIR_KELPTHAR_FOREST = new Zone("VASHJIR_KELPTHAR_FOREST", MapImage.VashjirKelptharForest, "Vashj'ir: Kelp'thar Forest");
    static readonly VASHJIR_SHIMMERING_EXPANSE = new Zone("VASHJIR_SHIMMERING_EXPANSE", MapImage.VashjirShimmeringExpanse, "Vashj'ir: Shimmering Expanse");
    static readonly VORTEX_PINNACLE = new Zone("VORTEX_PINNACLE", MapImage.VortexPinnacle, "Vortex Pinnacle");
    static readonly ZULGURUB = new Zone("ZULGURUB", MapImage.ZulGurub, "Zul'Gurub");

    public static readonly values: Zone[] = [Zone.AZEROTH, Zone.DARKMOON_ISLAND, Zone.DEEPHOLM, Zone.ENCHANTING, Zone.FERALAS,
        Zone.LOST_CITY_OF_THE_TOLVIR, Zone.MOLTEN_FRONT, Zone.MOUNT_HYJAL, Zone.PROSPECTING, Zone.TOL_BARAD, Zone.TOL_BARAD_PENINSULA,
        Zone.TRANSMUTATION_WITHOUT_CD, Zone.TRANSMUTATION_WITH_CD, Zone.TWILIGHT_HIGHLANDS, Zone.ULDUM, Zone.VASHJIR_ABYSSAL_DEPTHS,
        Zone.VASHJIR_KELPTHAR_FOREST, Zone.VASHJIR_SHIMMERING_EXPANSE, Zone.VORTEX_PINNACLE, Zone.ZULGURUB
    ];

    public static readonly openWorld: Zone[] = [Zone.DARKMOON_ISLAND, Zone.DEEPHOLM, Zone.FERALAS, Zone.MOLTEN_FRONT,
        Zone.MOUNT_HYJAL, Zone.TOL_BARAD, Zone.TOL_BARAD_PENINSULA, Zone.TWILIGHT_HIGHLANDS, Zone.ULDUM,
        Zone.VASHJIR_ABYSSAL_DEPTHS, Zone.VASHJIR_KELPTHAR_FOREST, Zone.VASHJIR_SHIMMERING_EXPANSE
    ];

    public static readonly dungeons: Zone[] = [Zone.LOST_CITY_OF_THE_TOLVIR, Zone.VORTEX_PINNACLE, Zone.ZULGURUB];

    private constructor(private readonly key: string, public readonly mapImage: MapImage, public readonly name: string) {
    }

    toString(): string {
        return this.key;
    }

    static fromString(key: string): Zone {
        for (const zone of Zone.values) {
            if (zone.key === key) {
                return zone;
            }
        }
        throw new Error("Could not find Zone with key " + key);
    }
}