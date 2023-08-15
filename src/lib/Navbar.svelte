<script lang="ts">
    import {navigationHierarchy, canvasesNeedingRedraws} from "../constants/stores.js";
    import type {Category, Dataset, Item, Source} from '../constants/interfaces';

    export let dataset: Dataset;

    function setNavigation(category: Category, item: Item, source: Source): void {
        if (!source || !$navigationHierarchy["source"] || source != $navigationHierarchy["source"]) {
            const canvases = [];
            for (let canvas of document.getElementsByTagName("canvas")) {
                canvases.push(canvas.id);
            }
            $canvasesNeedingRedraws = canvases;
        }
        navigationHierarchy.set({
            category,
            item,
            source
        });
    }

    function setNavigationToCategory(category: Category): void {
        setNavigation(category, null, null);
    }

    function setNavigationToItem(item: Item): void {
        setNavigation($navigationHierarchy["category"], item, null);
    }

    function setNavigationToSource(source: Source): void {
        setNavigation($navigationHierarchy["category"], $navigationHierarchy["item"], source);
    }
</script>

<nav class="navbar navbar-expand-lg navbar-dark px-3 rounded-2">
    <div class="btn-group border border-light rounded-2">
        <button type="button" class="btn rounded-2" on:click={() => navigationHierarchy.reset()}>The Cataclysm</button>
        <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item rounded-2" on:click={() => navigationHierarchy.reset()}>The Cataclysm</a></li>
            <li><a class="dropdown-item rounded-2" href="https://northrend-crafting-almanac.vercel.app/">Northrend</a></li>
        </ul>
    </div>
    {#if $navigationHierarchy["category"]}
        <div class="btn-group border border-light ms-2 rounded-2">
            <button type="button" class="btn" on:click={() => setNavigationToCategory($navigationHierarchy["category"])}>{$navigationHierarchy["category"].name}</button>
            <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul class="dropdown-menu">
                {#each dataset.categories as category}
                    <li><a class="dropdown-item rounded-2" on:click={() => setNavigationToCategory(category)}>{category.name}</a></li>
                {/each}
            </ul>
        </div>
        {#if $navigationHierarchy["item"]}
            <div class="btn-group border border-light ms-2 rounded-2">
                <button type="button" class="btn" on:click={() => setNavigationToItem($navigationHierarchy["item"])}>{$navigationHierarchy["item"].name}</button>
                <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
                        aria-expanded="false">
                    <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu">
                    {#each $navigationHierarchy["category"].items as item}
                        <li class="dropdown-item rounded-2" on:click={() => setNavigationToItem(item)}>{item.name}</li>
                    {/each}
                </ul>
            </div>

            {#if $navigationHierarchy["source"]}
                <div class="btn-group border border-light ms-2 rounded-2">
                    <button type="button" class="btn" on:click={() => setNavigationToSource($navigationHierarchy["source"])}>{$navigationHierarchy["source"].name}</button>
                    <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        <span class="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu">
                        {#each $navigationHierarchy["item"].sources as source}
                            <li class="dropdown-item rounded-2" on:click={() => setNavigationToSource(source)}>{source.name}</li>
                        {/each}
                    </ul>
                </div>
            {/if}
        {/if}
    {/if}
</nav>

<style>
    .navbar, .dropdown-menu {
        background: var(--button-red) var(--bs-gradient);
    }
    .dropdown-item:hover {
        background: var(--button-red-hover) var(--bs-gradient);
    }
    .btn-group:hover .dropdown-menu {
        display: block;
    }
</style>