<script lang="ts">
    import {Zone} from "../constants/zone";
    import {filterSettings, matchesFilterSettings, navigationHierarchy} from "../constants/stores";
    import type {Item, Source} from "../constants/interfaces";
    import Map from "./Map.svelte";

    export let idSuffix: string;

    let zones: Zone[];
    let navItem: Item;
    let navSource: Source;
    let x: string = '0.0';
    let y: string = '0.0';
    let sortedSources: Source[];
    let filteredSources: Source[] = [];
    let maps = [];

    $: if ($filterSettings) {
        navItem = $navigationHierarchy["item"];
        if (navItem) {
            filteredSources = navItem.sources.filter(s => matchesFilterSettings(s));
        }
        else {
            filteredSources = [];
        }
    }

    $: {
        sortedSources = filteredSources.sort((s1, s2) => {
            return s1.userPreference - s2.userPreference;
        });
    }

    $: navSource = $navigationHierarchy["source"];

    $: {
        const nullableZones = navSource?.zones;
        zones = nullableZones && nullableZones.length > 0 ? nullableZones : [Zone.NORTHREND];
    }
</script>

{#each zones as zone, index}
    <Map modalId="enlargedMapModal" idSuffix="{idSuffix}" index="{index}" on:setModalMap/>
{/each}