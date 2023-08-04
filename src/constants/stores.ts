import {writable} from "svelte/store";
import type {Category, FilterSettings, Item, NavigationHierarchy, Source} from "./interfaces";
import {Zone} from "./zone";
import {SourceType} from "./sourceType";
import {Requirement} from "./requirement";

const navigationHierarchyTemplate: NavigationHierarchy = {
    category: undefined,
    item: undefined,
    source: undefined
};

const urlParams: URLSearchParams = new URLSearchParams(window.location.search);

const { subscribe, set } = writable(navigationHierarchyTemplate);

export const navigationHierarchy = {
    subscribe,
    set: (v) => {
        set(v);
        updateUrl(v);
    },
    setWithoutUpdatingUrl: (v) => set(v),
    reset: () => {
        const freshHierarchy: NavigationHierarchy = {category: null, item: null, source: null};
        set(freshHierarchy);
        updateUrl(freshHierarchy);
    }
}

const filterSettingsTemplate: FilterSettings = {
    permittedTypes: SourceType.values.map(t => t.name),
    permittedZones: Zone.openWorld.concat(Zone.dungeons).map(z => z.name),
    permittedRequirements: Requirement.values.map(r => r.name),
    earliestPhase: 3,
    highestPopularity: 5
}

export const filterSettings = writable(filterSettingsTemplate);

export const areaRedrawsRequired = writable(2);

export const hoveredSource = writable(null as Source);

export const TRACKED_SOURCES = 'trackedSources';
export const ABANDONED_SOURCES = 'abandonedSources';

export const LOCAL_STORAGE_ENABLED = localStorageIsEnabled();

export function matchesFilterSettings(source: Source): boolean {
    let requirementsMatch: boolean = true;

    for (const requirement of source.requirements) {
        requirementsMatch = requirementsMatch && filterSettingsTemplate.permittedRequirements.includes(requirement.name);
    }

    for (const zone of source.zones) {
        requirementsMatch = requirementsMatch && (zoneIsNotDisplayedInFilters(zone) || filterSettingsTemplate.permittedZones.includes(zone.name));
    }

    return requirementsMatch
        && filterSettingsTemplate.permittedTypes.includes(source.type.name)
        && filterSettingsTemplate.earliestPhase >= source.phase
        && filterSettingsTemplate.highestPopularity >= source.popularity;
}

export function zoneIsTable(zone: Zone): boolean {
    return zone && [Zone.ENCHANTING.name, Zone.INSCRIPTION.name, Zone.TRANSMUTATION.name,
        Zone.PROSPECTING.name].includes(zone.name);
}

function zoneIsNotDisplayedInFilters(zone: Zone): boolean {
    return !zone ||
        [Zone.NORTHREND.name, Zone.ENCHANTING.name, Zone.INSCRIPTION.name, Zone.TRANSMUTATION.name,
        Zone.PROSPECTING.name, Zone.ELWYNN_FOREST.name, Zone.TIRISFAL_GLADES.name].includes(zone.name);
}

function localStorageIsEnabled(): boolean {
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
    } catch (e) {
        return false;
    }
}

function updateUrl(navigationHierarchy: NavigationHierarchy): void {
    setParameter('cat', navigationHierarchy.category);
    setParameter('item', navigationHierarchy.item);
    setParameter('source', navigationHierarchy.source);

    let newPath = window.location.pathname;
    const parameterString = urlParams.toString();

    if (parameterString) {
        newPath += '?' + parameterString;
    }

    window.history.pushState(null, '', newPath);
}

function setParameter(key: string, value: Category | Item | Source): void {
    if (value) {
        urlParams.set(key, value.name);
    }
    else {
        urlParams.delete(key);
    }
}