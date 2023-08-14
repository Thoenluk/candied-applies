<script lang="ts">
    import type {Item, Source} from "../constants/interfaces";
    import ItemLink from "./ItemLink.svelte";
    import SourceLink from "./SourceLink.svelte";
    import {navigationHierarchy, filterSettings, canvasesNeedingRedraws} from "../constants/stores";
    import {matchesFilterSettings} from "../constants/stores.js";
    import FilterBar from "./FilterBar.svelte";

    export let item: Item;

    let sortedSources: Source[] = [];

    let filteredSources: Source[] = [];

    $: if (item && $filterSettings) {
        filteredSources = item.sources.filter(s => matchesFilterSettings(s));
    }

    $: if (filteredSources) {
        sortedSources = filteredSources.sort((s1, s2) => {
            return s1.userPreference - s2.userPreference;
        });
    }

    function setNavigationSource(source: Source): void {
        $navigationHierarchy["source"] = source;
        const canvases = [];
        for (let i = 0; i < source.zones.length; i++) {
            canvases.push('areasCanvasBase' + i);
        }
        canvases.push('areasCanvasModal0');
        $canvasesNeedingRedraws = canvases;
    }

</script>

<div class="row">
    <div class="col-12">
        <ItemLink {item} />
    </div>
    <div class="col-12">
        <FilterBar />
    </div>
    <div class="col-10 offset-1">
        {#each sortedSources as source, index}
            <div class="row" on:click={() => setNavigationSource(source)}>
                <div class="col">
                    <SourceLink {source} {index} />
                </div>
            </div>
        {/each}
        {#if sortedSources.length < item.sources.length}
            <div class="row align-items-center border border-dark rounded-3 p-2">
                <div class="col">
                    ({item.sources.length - sortedSources.length} {item.sources.length - sortedSources.length > 1 ? 'sources are' : 'source is'} filtered out. Check the filter settings above.)
                </div>
            </div>
        {/if}
    </div>
</div>