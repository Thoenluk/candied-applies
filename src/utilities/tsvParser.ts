import type {Area, Category, Coordinate, Dataset, Item, Source} from "../constants/interfaces";
import {UserPreference} from "../constants/interfaces";
import {Icon} from "../constants/icon";
import {Zone} from "../constants/zone";
import {SourceType} from "../constants/sourceType";
import {Requirement} from "../constants/requirement";
import * as fs from 'fs';

function parse(): Dataset {
    const table: string[][] = readTSV();
    const lineGroups: LineGroup[] = groupLines(table, 0);

    const dataset: Dataset = {
        categories: [

        ]
    };

    for (const lineGroup of lineGroups) {
        dataset.categories.push(createCategory(lineGroup));
    }

    return dataset;

}

function readTSV(): string[][] {
    const lines: string[] = fs.readFileSync('dataset.tsv', 'utf-8').split('\n');
    const table: string[][] = [];

    for (const line of lines.slice(1)) {
        table.push(line.split('\t'));
    }

    return table;
}

function groupLines(table: string[][], index: number): LineGroup[] {
    const groups: LineGroup[] = [];

    for (const tableElement of table) {
        if (tableElement[index] != '') {
            groups.push({
                header: tableElement,
                content: []
            });
        }
        else {
            groups[groups.length - 1].content.push(tableElement);
        }
    }

    return groups;
}

function writeToFile(dataset: Dataset): void {
    fs.writeFileSync('public/dataset.json', JSON.stringify(dataset, null, 4), 'utf-8');
}

function createCategory(lineGroup: LineGroup): Category {
    const category: Category = {
        name: lineGroup.header[0],
        icon: getIcon(lineGroup.header[1]),
        colour: lineGroup.header[2],
        items: []
    };

    console.log('Parsed category ' + category.name);

    const itemLineGroups: LineGroup[] = groupLines(lineGroup.content, 3);

    for (const itemLineGroup of itemLineGroups) {
        category.items.push(createItem(itemLineGroup));
    }

    return category;
}

function createItem(lineGroup: LineGroup): Item {
    const item: Item = {
        name: lineGroup.header[3],
        icon: getIcon(lineGroup.header[3]),
        sources: []
    };

    console.log('\t Parsed item ' + item.name);

    for (const sourceLine of lineGroup.content) {
        const source: Source = createSource(sourceLine);
        item.sources.push(source);
        console.log('\t\t Parsed source ' + source.name);
    }

    return item;
}

function createSource(sourceLine: string[]): Source {
    return {
        type: getSourceType(sourceLine[4]),
        name: sourceLine[5],
        overviewPin: createCoordinate(sourceLine[6]),
        zones: getZones(sourceLine[7]),
        requirements: getRequirements(sourceLine[8], sourceLine[9]),
        phase: getPhase(sourceLine[10]),
        confirmed: getConfirmed(sourceLine[10]),
        popularity: +sourceLine[11],
        comments: sourceLine[12],
        pins: createPins(sourceLine[13]),
        areas: createAreas(sourceLine[14]),
        seeAlso: createSeeAlsos(sourceLine[15]),
        userPreference: UserPreference.Normal
    };
}

function getIcon(rawIcon: string): Icon {
    const icon: Icon = Icon[enumify(rawIcon)];
    if (icon === undefined) {
        throw new Error("Could not find Icon by name of " + rawIcon);
    }
    return icon;
}

function getSourceType(rawSourceType: string): SourceType {
    const key = keyify(rawSourceType);
    return SourceType.fromString(key);
}

function createCoordinate(rawCoordinate: string): Coordinate {
    if (!isSet(rawCoordinate)) {
        return null;
    }

    const elements: string[] = rawCoordinate.split(/[, ]+/);

    return {
        x: +elements[0],
        y: +elements[1]
    }
}

function getZones(rawZones: string): Zone[] {
    if (!isSet(rawZones) || rawZones === 'Any') {
        return [];
    }

    const zones = [];
    const elements: string[] = rawZones.split(/; */);

    for (const element of elements) {
        const key = keyify(element);
        zones.push(Zone.fromString(key));
    }

    return zones;
}

function getRequirements(rawRequirements: string, rawRequiresFlying: string): Requirement[] {
    const requirements = [];

    if (isSet(rawRequirements)) {
        const elements: string[] = rawRequirements.split(/, */);
        for (const element of elements) {
            const key = keyify(element);
            requirements.push(Requirement.fromString(key));
        }
    }

    if (rawRequiresFlying === 'TRUE') {
        requirements.push(Requirement.FLYING);
    }

    return requirements;
}

function getPhase(rawPhase: string): number {
    return +rawPhase.replace(/\D/g, '');
}

function getConfirmed(rawPhase: string): boolean {
    return rawPhase.indexOf('?') === -1;
}

function createPins(rawPins: string): Coordinate[][] {
    if (!isSet(rawPins)) {
        return [];
    }

    const pins: Coordinate[][] = [];
    const elements: string[] = rawPins.split(/\| */)

    for (const element of elements) {
        pins.push(createCoordinates(element));
    }

    return pins;
}

function createCoordinates(rawCoordinates: string): Coordinate[] {
    if (!isSet(rawCoordinates)) {
        return [];
    }

    const elements: string[] = rawCoordinates.split(/; */);
    const coordinates: Coordinate[] = [];

    for (const element of elements) {
        coordinates.push(createCoordinate(element));
    }

    return coordinates;
}

function createAreas(rawAreas: string): Area[][] {
    if (!isSet(rawAreas)) {
        return [];
    }

    const elements: string[] = rawAreas.split(/\| */);
    const areas: Area[][] = [];

    for (const element of elements) {
        areas.push(createAreasForMap(element));
    }

    return areas;
}

function createAreasForMap(rawAreasForMap: string): Area[] {
    if (!isSet(rawAreasForMap)) {
        return [];
    }

    const elements: string[] = rawAreasForMap.split(/\| */);
    const areasForMap: Area[] = [];

    for (const element of elements) {
        areasForMap.push({
            vertices: createCoordinates(element)
        });
    }

    return areasForMap;
}

function createSeeAlsos(rawSeeAlsos: string): string[][] {
    if (!isSet(rawSeeAlsos)) {
        return [];
    }

    const elements: string[] = rawSeeAlsos.split(/; */);
    const seeAlsos: string[][] = [];

    for (const element of elements) {
        const rawHierarchy: string[] = element.split(/, */);
        const hierarchy: string[] = [];

        for (const rawStep of rawHierarchy) {
            hierarchy.push(rawStep);
        }

        seeAlsos.push(hierarchy);
    }

    return seeAlsos;
}

function enumify(rawEnumString: string): string {
    let enumified = rawEnumString.replace(/'/g, '');
    enumified = enumified.replace(/-/g, ' ');
    enumified = enumified.toLowerCase().trim();
    const words = enumified.split(' ');
    let result = '';
    for (const word of words) {
        result += word.charAt(0).toUpperCase() + word.slice(1);
    }
    return result;
}

function keyify(rawEnumString: string) {
    let keyified = rawEnumString.toUpperCase();
    keyified = keyified.replace(/ /g, '_');
    keyified = keyified.replace(/['-:]/g, '');
    return keyified;
}

function isSet(entry: string) {
    return entry && entry.trim() && entry != '~';
}

interface LineGroup {
    header: string[];
    content: string[][];
}

writeToFile(parse());