<script lang="ts">
    import type {Dataset, NavigationHierarchy, SimplifiedNavigationHierarchy} from "./constants/interfaces";
    import {parseNavigationHierarchy, UserPreference} from "./constants/interfaces";
    import CategoryList from "./lib/CategoryList.svelte";
    import SourceList from "./lib/SourceList.svelte";
    import SourceDetailView from "./lib/SourceDetailView.svelte";
    import {
        ABANDONED_SOURCES,
        navigationHierarchy,
        areaRedrawsRequired,
        TRACKED_SOURCES,
        LOCAL_STORAGE_ENABLED
    } from "./constants/stores";
    import Navbar from "./lib/Navbar.svelte";
    import Map from "./lib/Map.svelte";

    let data = getData();

    if (LOCAL_STORAGE_ENABLED) {
        if (!localStorage.getItem(TRACKED_SOURCES)) {
            localStorage.setItem(TRACKED_SOURCES, '[]');
        }

        if (!localStorage.getItem(ABANDONED_SOURCES)) {
            localStorage.setItem(ABANDONED_SOURCES, '[]');
        }
    }

    async function getData(): Promise<Dataset> {
        const annie = await fetch('/dataset.json');
        const text = await annie.text();

        if (annie.ok) {
            const data: Dataset = JSON.parse(text);

            const updateHierarchy = () => {
                const [rawCategory, rawItem, rawSource] = getUrlNavigationHierarchy();
                const newNavigationHierarchy: NavigationHierarchy = parseNavigationHierarchy(rawCategory, rawItem, rawSource, data);
                $areaRedrawsRequired = !newNavigationHierarchy.source || $navigationHierarchy["source"] != newNavigationHierarchy.source ? 2 : 0;
                navigationHierarchy.setWithoutUpdatingUrl(newNavigationHierarchy);
            }

            window.onpopstate = updateHierarchy;
            updateHierarchy();

            if (LOCAL_STORAGE_ENABLED) {
                parseTrackedSources(data);
                parseAbandonedSources(data);
            }

            return data;
        }
        else {
            throw new Error('Failed fetching data: ' + text);
        }
    }

    function getUrlNavigationHierarchy(): string[] {
        const params: URLSearchParams = new URLSearchParams(window.location.search);
        return [
            params.get('cat'),
            params.get('item'),
            params.get('source')
        ];
    }

    function parseTrackedSources(data: Dataset): void {
        const trackedSources: SimplifiedNavigationHierarchy[] = JSON.parse(localStorage.getItem(TRACKED_SOURCES));
        for (const trackedSource of trackedSources) {
            const trackedNavigationHierarchy: NavigationHierarchy = parseNavigationHierarchy(trackedSource.category, trackedSource.item, trackedSource.source, data);
            trackedNavigationHierarchy.source.userPreference = UserPreference.Tracked;
        }
    }

    function parseAbandonedSources(data: Dataset): void {
        const abandonedSources: SimplifiedNavigationHierarchy[] = JSON.parse(localStorage.getItem(ABANDONED_SOURCES));
        for (const abandonedSource of abandonedSources) {
            const abandonedNavigationHierarchy: NavigationHierarchy = parseNavigationHierarchy(abandonedSource.category, abandonedSource.item, abandonedSource.source, data);
            abandonedNavigationHierarchy.source.userPreference = UserPreference.Abandoned;
        }
    }
</script>

<main>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1>Northrend Crafting Almanac</h1>
            </div>
        </div>
        {#await data}
            <div class="row">
                <div class="col">
                    Loading data...
                </div>
            </div>
        {:then dataset}
            <div class="row">
                <div class="col-12 col-lg-6">
                    <div class="row">
                        <div class="col">
                            <Navbar {dataset} />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <Map modalId="enlargedMapModal" idSuffix="Base"/>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-6">
                    {#if !$navigationHierarchy.item}
                        <CategoryList {dataset}/>
                    {:else if !$navigationHierarchy.source}
                        <SourceList item={$navigationHierarchy.item} />
                    {:else}
                        <SourceDetailView item="{$navigationHierarchy.item}" source={$navigationHierarchy.source} {dataset} />
                    {/if}
                </div>
            </div>
        {:catch error}
            <p class="text-danger">Failed to load data :&lt; Try again later.</p>
        {/await}
        <div class="row">
            <div class="col">
                Made by /u/Torakaa with love.
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                This site doesn't use cookies. At all.
                <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#localStorageModal">
                    Learn more
                </button>
            </div>
        </div>
    </div>

    <div class="modal" id="enlargedMapModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-body position-relative p-0">
                    <Map idSuffix="Modal"/>
                    <button type="button" class="btn btn-light position-absolute end-0 bottom-0" data-bs-dismiss="modal" aria-label="Close">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="localStorageModal" tabindex="-1" aria-labelledby="localStorageModalLabel" aria-hidden="true">
        <div class="modal-dialog bg-light">
            <div class="modal-content bg-light">
                <div class="modal-header">
                    <h5 class="modal-title">Data storage?</h5>
                </div>
                <div class="modal-body">
                    <p>
                        This site does not store any cookies on your machine or read them.
                    </p>
                    <p>
                        For full disclosure, it does use local storage in your browser to store your tracked and abandoned
                        sources for later. This data is local only and never sent anywhere by your browser.
                    </p>
                    <p>
                        You may disable local data storage in your browser, in which case you can still use the Northrend
                        Crafting Almanac normally, except you cannot track or abandon (favorite or hide) any sources.
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light ms-auto" data-bs-dismiss="modal" aria-label="Close">Close</button>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
</style>
