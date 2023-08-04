import type {Zone} from "./zone";
import type {SourceType} from "./sourceType";
import type {Requirement} from "./requirement";
import type {Icon} from "./icon";

export interface Dataset {
    categories: Category[];
}

export interface Category {
    name: string;
    icon: Icon;
    colour: string;
    items: Item[];
}

export interface Item {
    name: string;
    icon: Icon;
    sources: Source[];
}

export interface Area {
    vertices: Coordinate[];
}

export interface Coordinate {
    x: number;
    y: number;
}

export interface Source {
    type: SourceType;
    name: string;
    overviewPin: Coordinate;
    zone: Zone;
    requirements: Requirement[];
    phase: number;
    confirmed: boolean;
    popularity: number;
    comments: string;
    pins: Coordinate[];
    areas: Area[];
    seeAlso: string[][];
    userPreference: UserPreference;
}

export enum UserPreference {
    Tracked,
    Normal,
    Abandoned
}

export interface NavigationHierarchy {
    category: Category;
    item: Item;
    source: Source;
}

export interface SimplifiedNavigationHierarchy {
    category: string;
    item: string;
    source: string;
}

export interface FilterSettings {
    permittedTypes: string[];
    permittedZones: string[];
    permittedRequirements: string[];
    earliestPhase: number;
    highestPopularity: number;
}

export function parseNavigationHierarchy(rawCategory: string, rawItem: string, rawSource: string, dataset: Dataset): NavigationHierarchy {
    let category: Category;
    let item: Item;
    let source: Source;

    if (rawCategory) {
        for (const currCategory of dataset.categories) {
            const trimmedCategory = rawCategory.trim();
            if (currCategory.name === trimmedCategory) {
                category = currCategory;
                break;
            }
        }
    }

    if (category && rawItem) {
        const trimmedItem = rawItem.trim();
        for (const currItem of category.items) {
            if (currItem.name === trimmedItem) {
                item = currItem;
                break;
            }
        }
    }

    if (item && rawSource) {
        const trimmedSource = rawSource.trim();
        for (const currSource of item.sources) {
            if (currSource.name === trimmedSource) {
                source = currSource;
                break;
            }
        }
    }

    return {
        category,
        item,
        source
    }
}