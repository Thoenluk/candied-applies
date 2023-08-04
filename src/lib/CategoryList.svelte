<script lang="ts">
    import type {Category, Dataset, Item} from "../constants/interfaces";
    import IconComponent from "./IconComponent.svelte";
    import ItemLink from "./ItemLink.svelte";
    import {navigationHierarchy} from "../constants/stores";
    import {onMount} from "svelte";

    export let dataset: Dataset;

    let itemsMatchingFilter: {[category: Category]: Item[]};
    let filter: string = '';

    $: itemsMatchingFilter = createItemsMatchingFilter(filter);

    onMount(() => {
        const categoryAccordion = document.getElementById('categoryAccordion');
        categoryAccordion.addEventListener('shown.bs.collapse', (event) => {
            const targetCollapse: HTMLElement = event.target as HTMLElement;
            targetCollapse.parentElement.scrollIntoView({
                behavior: "smooth"
            });
        });

        const openCategoryCollapse: Element = document.getElementsByClassName('show')?.item(0);
        if (openCategoryCollapse) {
            openCategoryCollapse.parentElement.scrollIntoView({
                behavior: "smooth"
            });
        }
    });

    function setNavigationCategory(category: Category): void {
        $navigationHierarchy["category"] = category;
    }

    function setNavigationItem(item: Item): void {
        $navigationHierarchy["item"] = item;
    }

    function createItemsMatchingFilter(nameFilter: string): {[category: Category]: Item[]} {
        const newIMF = {};
        nameFilter = nameFilter.trim().toLowerCase();

        for (const category of dataset.categories) {
            const matchingItems: Item[] = category.items.filter((item) => !nameFilter || item.name.toLowerCase().includes(nameFilter));
            if (matchingItems.length > 0) {
                newIMF[category.name] = matchingItems;
            }
        }

        return newIMF;
    }
</script>

<input class="form-control form-control-sm bg-dark text-light mb-2" type="text" placeholder="Filter items" aria-label="Filter items" bind:value={filter}>
<div class="accordion" id="categoryAccordion">
    {#each dataset.categories as category, index}
        <div class="accordion-item {itemsMatchingFilter[category.name] ? '' : 'd-none'}">
            <h2 class="accordion-header">
                <button on:click={() => setNavigationCategory(category)} class="accordion-button {$navigationHierarchy.category === category ? '' : 'collapsed'}"
                        type="button" data-bs-toggle="collapse" data-bs-target="{'#categoryCollapse' + index}" aria-expanded="false">
                    <div class="row w-100">
                        <div class="col">
                            <div class="row ">
                                <div class="col-auto">
                                    <IconComponent icon="{category.icon}" />
                                </div>
                                <div class="col">
                                    <h2 class="m-0">{category.name}</h2>
                                </div>
                            </div>
                            <div class="row mt-1">
                                <div class="col">
                                    <div class="w-100" style:height="{'5px'}" style:background="{category.colour}"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </button>
            </h2>
            <div class="accordion-collapse collapse {$navigationHierarchy.category === category ? 'show' : ''}"
                 aria-labelledby="{'categoryHeader' + index}" data-bs-parent="#categoryAccordion" id="{'categoryCollapse' + index}">
                <div class="accordion-body">
                    {#each category.items as item, index}
                        <div class:mb-2="{index < category.items.length - 1}" class:d-none="{!itemsMatchingFilter[category.name]?.includes(item)}" on:click={() => setNavigationItem(item)}>
                            <ItemLink {item} />
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    {/each}
</div>

<style>
    .row {
        text-shadow:
                -1px -1px 0 #000,
                1px -1px 0 #000,
                -1px 1px 0 #000,
                1px 1px 0 #000;
    }
</style>