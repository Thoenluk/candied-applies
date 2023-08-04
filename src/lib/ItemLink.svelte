<script lang="ts">
    import type {Item} from "../constants/interfaces";
    import IconComponent from "./IconComponent.svelte";

    export let item: Item;
</script>

<div class="row align-items-center border border-dark rounded-3 p-2">
    <div class="col-auto">
        <IconComponent icon="{item.icon}" />
    </div>
    <div class="col me-auto">
        <h3 class="mb-0">{item.name}</h3>
    </div>
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