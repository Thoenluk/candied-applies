<script lang="ts">
    import type {Source} from "../constants/interfaces";
    import IconComponent from "./IconComponent.svelte";
    import {UserPreference} from "../constants/interfaces.js";
    import {Icon} from "../constants/icon.js";
    import {hoveredSource} from "../constants/stores.js";

    export let source: Source;
    export let index: number;

    const difficultyColours: string[] = [
        'green',
        'yellow',
        'yellow',
        'orange',
        'red',
        'red'
    ];

    function getClassForUserPreference(): string {
        switch (source.userPreference) {
            case UserPreference.Tracked:
                return 'tracked';
            case UserPreference.Normal:
                return '';
            case UserPreference.Abandoned:
                return 'abandoned';
        }
    }
</script>

<div class="row align-items-center border border-dark rounded-3 p-2 {$hoveredSource === source ? 'hovered' : ''}"
    on:mouseenter={() => $hoveredSource = source} on:mouseleave={() => $hoveredSource = null} on:click={() => $hoveredSource = null}>
    <div class="col-auto">
        <div class="position-relative">
            <IconComponent icon="{source.type.icon}" title="{source.type.name}"/>
            <div class="position-absolute top-0 start-50 fs-5 overview-pin-index {getClassForUserPreference()}">
                {index + 1}
            </div>
        </div>
    </div>
    <div class="col">
        <h4 class="mb-0 difficulty-{difficultyColours[source.popularity]}">
            {source.name}
        </h4>
    </div>
    {#if source.userPreference === UserPreference.Tracked}
        <div class="col-auto px-1 me-4">
            <IconComponent icon="{Icon.Tracked}" title="Tracked"/>
        </div>
    {:else if source.userPreference === UserPreference.Abandoned}
        <div class="col-auto px-1 me-4">
            <IconComponent icon="{Icon.Abandoned}" title="Abandoned"/>
        </div>
    {/if}
    {#if source.requirements.length > 0}
        <div class="col-auto ms-auto px-0">
            {#each source.requirements as requirement}
                <span class="ms-1">
                    <IconComponent icon="{requirement.icon}" title="{requirement.name}"/>
                </span>
            {/each}
        </div>
    {/if}
</div>

<style>
    .row {
        text-shadow:
                -1px -1px 0 #000,
                1px -1px 0 #000,
                -1px 1px 0 #000,
                1px 1px 0 #000;
    }

    .hovered {
        background: var(--bs-body-bg) var(--bs-gradient);
    }

    .difficulty-green {
        color: #58cc58;
    }

    .difficulty-yellow {
        color: #ffff00;
    }

    .difficulty-orange {
        color: #ff9658;
    }

    .difficulty-red {
        color: #ec0000;
    }
</style>