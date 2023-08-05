<script lang="ts">
    import type {Dataset} from "../constants/interfaces";
    import IconComponent from "./IconComponent.svelte";
    import {canvasesNeedingRedraws, navigationHierarchy} from "../constants/stores";
    import {parseNavigationHierarchy} from "../constants/interfaces";

    export let dataset: Dataset = null;
    export let reference: string[] = [];

    const [rawCategory, rawItem, rawSource] = reference;
    const {category, item, source} = parseNavigationHierarchy(rawCategory, rawItem, rawSource, dataset);

    function setNavigation(): void {
        navigationHierarchy.set({
            category,
            item,
            source
        });
        const canvases = [];
        for (let canvas of document.getElementsByTagName("canvas")) {
            canvases.push(canvas.id);
        }
        $canvasesNeedingRedraws = canvases;
    }
</script>

<div on:click={setNavigation}>
    {#if category && !item}
        <IconComponent icon="{category.icon}" />
        Category: {category.name}
    {:else if item && !source}
        <IconComponent icon="{item.icon}" />
        Item: {item.name}
    {:else if source}
        <IconComponent icon="{source.type.icon}" />
        {item.name}: {source.name}
    {/if}
</div>