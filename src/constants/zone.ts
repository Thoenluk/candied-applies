import {MapImage} from "./mapImage";

export class Zone {
    static readonly AHNKAHET = new Zone("AHNKAHET", MapImage.Ahnkahet, "Ahn'kahet");
    static readonly AZJOLNERUB_HADRONOXS_LAIR = new Zone("AZJOLNERUB_HADRONOXS_LAIR", MapImage.AzjolNerubHadronoxsLair, "Azjol-Nerub");
    static readonly AZJOLNERUB_THE_GILDED_GATE = new Zone("AZJOLNERUB_THE_GILDED_GATE", MapImage.AzjolNerubTheGildedGate, "Azjol-Nerub");
    static readonly BOREAN_TUNDRA = new Zone("BOREAN_TUNDRA", MapImage.BoreanTundra, "Borean Tundra");
    static readonly CRYSTALSONG_FOREST = new Zone("CRYSTALSONG_FOREST", MapImage.CrystalsongForest, "Crystalsong Forest");
    static readonly DALARAN = new Zone("DALARAN", MapImage.Dalaran, "Dalaran");
    static readonly DALARAN_SEWERS = new Zone("DALARAN_SEWERS", MapImage.DalaranSewers, "Dalaran");
    static readonly DRAGONBLIGHT = new Zone("DRAGONBLIGHT", MapImage.Dragonblight, "Dragonblight");
    static readonly DRAKTHARON_KEEP_THE_VESTIBULES = new Zone("DRAKTHARON_KEEP_THE_VESTIBULES", MapImage.DraktharonKeepTheVestibules, "Drak'tharon Keep");
    static readonly ELWYNN_FOREST = new Zone("ELWYNN_FOREST", MapImage.ElwynnForest, "Elwynn Forest");
    static readonly ENCHANTING = new Zone("ENCHANTING", MapImage.Enchanting, "");
    static readonly GUNDRAK = new Zone("GUNDRAK", MapImage.Gundrak, "Gundrak");
    static readonly GRIZZLY_HILLS = new Zone("GRIZZLY_HILLS", MapImage.GrizzlyHills, "Grizzly Hills");
    static readonly HALLS_OF_LIGHTNING = new Zone("HALLS_OF_LIGHTNING", MapImage.HallsOfLightning, "Halls of Lightning");
    static readonly HALLS_OF_STONE = new Zone("HALLS_OF_STONE", MapImage.HallsOfStone, "Halls of Stone");
    static readonly HOWLING_FJORD = new Zone("HOWLING_FJORD", MapImage.HowlingFjord, "Howling Fjord");
    static readonly ICECROWN = new Zone("ICECROWN", MapImage.Icecrown, "Icecrown");
    static readonly ICECROWN_CITADEL = new Zone("ICECROWN_CITADEL", MapImage.IcecrownCitadel, "Icecrown Citadel");
    static readonly INSCRIPTION = new Zone("INSCRIPTION", MapImage.Inscription, "");
    static readonly LAKE_WINTERGRASP = new Zone("LAKE_WINTERGRASP", MapImage.LakeWintergrasp, "Lake Wintergrasp");
    static readonly NAXXRAMAS = new Zone("NAXXRAMAS", MapImage.Naxxramas, "Naxxramas");
    static readonly NORTHREND = new Zone("NORTHREND", MapImage.Northrend, "Northrend");
    static readonly ONYXIAS_LAIR = new Zone("ONYXIAS_LAIR", MapImage.OnyxiasLair, "Onyxia's Lair");
    static readonly PROSPECTING = new Zone("PROSPECTING", MapImage.Prospecting, "");
    static readonly SHOLAZAR_BASIN = new Zone("SHOLAZAR_BASIN", MapImage.SholazarBasin, "Sholazar Basin");
    static readonly STORM_PEAKS = new Zone("STORM_PEAKS", MapImage.StormPeaks, "Storm Peaks");
    static readonly THE_ARGENT_COLISEUM = new Zone("THE_ARGENT_COLISEUM", MapImage.TheArgentColiseum, "Trial of the Crusader");
    static readonly THE_NEXUS = new Zone("THE_NEXUS", MapImage.TheNexus, "The Nexus");
    static readonly THE_OCULUS_BAND_OF_TRANSMUTATION = new Zone("THE_OCULUS_BAND_OF_TRANSMUTATION", MapImage.TheOculusBandOfTransmutation, "The Oculus");
    static readonly THE_OCULUS_BAND_OF_VARIANCE = new Zone("THE_OCULUS_BAND_OF_VARIANCE", MapImage.TheOculusBandOfVariance, "The Oculus");
    static readonly TIRISFAL_GLADES = new Zone("TIRISFAL_GLADES", MapImage.TirisfalGlades, "Tirisfal Glades");
    static readonly TRANSMUTATION = new Zone("TRANSMUTATION", MapImage.Transmutation, "");
    static readonly ULDUAR_BASE_CAMP = new Zone("ULDUAR_BASE_CAMP", MapImage.UlduarBaseCamp, "Ulduar");
    static readonly ULDUAR_INNER_SANCTUM = new Zone("ULDUAR_INNER_SANCTUM", MapImage.UlduarInnerSanctum, "Ulduar");
    static readonly ULDUAR_PRISON_OF_YOGGSARON = new Zone("ULDUAR_PRISON_OF_YOGGSARON", MapImage.UlduarPrisonOfYoggSaron, "Ulduar");
    static readonly UTGARDE_KEEP = new Zone("UTGARDE_KEEP", MapImage.UtgardeKeep, "Utgarde Keep");
    static readonly UTGARDE_PINNACLE_UPPER_PINNACLE = new Zone("UTGARDE_PINNACLE_UPPER_PINNACLE", MapImage.UtgardePinnacleUpperPinnacle, "Utgarde Pinnacle");
    static readonly ZULDRAK = new Zone("ZULDRAK", MapImage.ZulDrak, "Zul'Drak");

    public static readonly values: Zone[] = [Zone.AHNKAHET, Zone.AZJOLNERUB_HADRONOXS_LAIR, Zone.AZJOLNERUB_THE_GILDED_GATE,
        Zone.BOREAN_TUNDRA, Zone.CRYSTALSONG_FOREST, Zone.DALARAN, Zone.DALARAN_SEWERS, Zone.DRAGONBLIGHT, Zone.DRAKTHARON_KEEP_THE_VESTIBULES,
        Zone.ELWYNN_FOREST, Zone.ENCHANTING, Zone.GUNDRAK, Zone.GRIZZLY_HILLS, Zone.HALLS_OF_LIGHTNING, Zone.HALLS_OF_STONE,
        Zone.HOWLING_FJORD, Zone.ICECROWN, Zone.ICECROWN_CITADEL, Zone.INSCRIPTION, Zone.LAKE_WINTERGRASP, Zone.NAXXRAMAS,
        Zone.NORTHREND, Zone.ONYXIAS_LAIR, Zone.PROSPECTING, Zone.SHOLAZAR_BASIN, Zone.STORM_PEAKS, Zone.THE_ARGENT_COLISEUM,
        Zone.THE_NEXUS, Zone.THE_OCULUS_BAND_OF_TRANSMUTATION, Zone.THE_OCULUS_BAND_OF_VARIANCE, Zone.TIRISFAL_GLADES,
        Zone.TRANSMUTATION, Zone.ULDUAR_BASE_CAMP, Zone.ULDUAR_INNER_SANCTUM, Zone.ULDUAR_PRISON_OF_YOGGSARON,
        Zone.UTGARDE_KEEP, Zone.UTGARDE_PINNACLE_UPPER_PINNACLE, Zone.ZULDRAK
    ];

    public static readonly openWorld: Zone[] = [Zone.BOREAN_TUNDRA, Zone.CRYSTALSONG_FOREST, Zone.DALARAN, Zone.DRAGONBLIGHT,
        Zone.GRIZZLY_HILLS, Zone.HOWLING_FJORD, Zone.ICECROWN, Zone.LAKE_WINTERGRASP, Zone.SHOLAZAR_BASIN, Zone.STORM_PEAKS, Zone.ZULDRAK
    ];

    public static readonly dungeons: Zone[] = [Zone.AHNKAHET, Zone.AZJOLNERUB_HADRONOXS_LAIR, Zone.DRAKTHARON_KEEP_THE_VESTIBULES,
        Zone.GUNDRAK, Zone.HALLS_OF_LIGHTNING, Zone.HALLS_OF_STONE, Zone.ICECROWN_CITADEL, Zone.NAXXRAMAS, Zone.ONYXIAS_LAIR,
        Zone.THE_ARGENT_COLISEUM, Zone.THE_NEXUS, Zone.THE_OCULUS_BAND_OF_VARIANCE, Zone.ULDUAR_BASE_CAMP, Zone.UTGARDE_KEEP,
        Zone.UTGARDE_PINNACLE_UPPER_PINNACLE
    ];

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