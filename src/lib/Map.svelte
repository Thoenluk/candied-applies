<script lang="ts">
    import {Zone} from "../constants/zone";
    import {
        canvasesNeedingRedraws,
        filterSettings,
        matchesFilterSettings,
        navigationHierarchy
    } from "../constants/stores";
    import {afterUpdate, createEventDispatcher, onMount} from "svelte";
    import IconComponent from "./IconComponent.svelte";
    import type {Item, Source} from "../constants/interfaces";
    import {UserPreference} from "../constants/interfaces";
    import {hoveredSource, zoneIsTable} from "../constants/stores.js";

    export let idSuffix: string;
    export let modalId: string = '';
    export let index: number = 0;

    let zone: Zone;
    let navItem: Item;
    let navSource: Source;
    let x: string = '0.0';
    let y: string = '0.0';
    let sortedSources: Source[];
    let filteredSources: Source[] = [];
    const dispatch = createEventDispatcher();

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
        zone = nullableZones && nullableZones.length > 0 ? nullableZones[index] : Zone.NORTHREND;
    }

    onMount(async () => {
        document.getElementById('map' + idSuffix + index).onmousemove = (event: MouseEvent) => {
            const rect: DOMRect = (event.currentTarget as Element).getBoundingClientRect();
            x = (100 * (event.clientX - rect.left) / rect.width).toFixed(1);
            y = (100 * (event.clientY - rect.top) / rect.height).toFixed(1);
        }
        $canvasesNeedingRedraws.push('areasCanvas' + idSuffix + index);
    });

    afterUpdate(async () => {
        drawAreas();
    });

    export function drawAreas(): void {
        if (navSource) {
            const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector<HTMLCanvasElement>('#map' + idSuffix + index + ' canvas');
            if (canvas && $canvasesNeedingRedraws.indexOf(canvas.id) > -1) {
                $canvasesNeedingRedraws = $canvasesNeedingRedraws.filter(id => id !== canvas.id);
                const context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);

                if (!navSource.areas[index]) {
                    return;
                }

                context.beginPath();
                context.fillStyle = '#F88F00B2';
                context.strokeStyle = '#FF5F09FF';
                context.shadowColor = '#FF5F09FF';
                context.lineWidth = 4;

                for (const area of navSource.areas[index]) {
                    context.beginPath();
                    context.shadowBlur = 0;
                    context.moveTo(area.vertices[0].x * canvas.width / 100, area.vertices[0].y * canvas.height / 100);

                    for (const vertex of area.vertices) {
                        context.lineTo(vertex.x * canvas.width / 100, vertex.y * canvas.height / 100);
                    }

                    context.closePath()
                    context.fill();
                    context.shadowBlur = 3;
                    context.stroke();
                }
            }
        }
    }

    function setNavigationToSource(source: Source): void {
        $navigationHierarchy["source"] = source;
    }

    function getClassForUserPreference(source: Source): string {
        switch (source.userPreference) {
            case UserPreference.Tracked:
                return 'tracked';
            case UserPreference.Normal:
                return '';
            case UserPreference.Abandoned:
                return 'abandoned';
        }
    }

    function setModalMap(): void {
        dispatch('setModalMap', {
           'index': index
        });
    }
</script>

<div class="position-relative" id="{'map' + idSuffix + index}">
    <img src="images/mapImages/{zone.mapImage}" alt="{zone.name}" class="img-fluid rounded-2"  data-bs-toggle="{modalId ? 'modal' : ''}" data-bs-target="{modalId ? '#' + modalId : ''}">
    <div class="coordinates p-1 ps-2 {zoneIsTable(zone) ? 'd-none' : ''}">
        {x + ', ' + y}
    </div>
    {#if navItem && !navSource}
        {#each sortedSources as pinSource, index}
            {#if pinSource.overviewPin}
                <div class="overview-pin" style="{'position: absolute; top: calc(' + pinSource.overviewPin.y + '% - ' + ($hoveredSource === pinSource ? '20px' : '16px') + ');' +
                 ' left: calc(' + pinSource.overviewPin.x + '% - ' + ($hoveredSource === pinSource ? '20px' : '16px') + '); ' +
                  ($hoveredSource === pinSource ? 'z-index: 999;' : '')}"
                     on:mouseenter={() => $hoveredSource = pinSource} on:mouseleave={() => $hoveredSource = null} on:click={() => {$hoveredSource = null; setNavigationToSource(pinSource)}}>
                    <IconComponent icon="{pinSource.type.icon}" height="{$hoveredSource === pinSource ? '40px' : '32px'}"
                                   width="{$hoveredSource === pinSource ? '40px' : '32px'}" title="{pinSource.type.name + ' from ' + pinSource.name}" />
                    <div class="position-absolute top-0 start-50 fs-5 overview-pin-index {getClassForUserPreference(pinSource)}">
                        {index + 1}
                    </div>
                </div>
            {/if}
        {/each}
    {:else if navSource}
        <canvas id="{'areasCanvas' + idSuffix + index}" width="1920" height="1080" data-bs-toggle="{modalId ? 'modal' : ''}" data-bs-target="{modalId ? '#' + modalId : ''}"
            on:click={setModalMap}>
        </canvas>
        {#each navSource.pins as pin}
            <div style="{'position: absolute; top: calc(' + pin.y + '% - 16px); ; left: calc(' + pin.x + '% - 16px);'}">
                <IconComponent icon="{navItem.icon}" height="32px" width="32px" title="{pin.x + ', ' + pin.y}" />
            </div>
        {/each}
    {/if}
</div>

<style>
    .coordinates {
        position: absolute;
        top: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
        border-left: 2px solid silver;
        border-bottom: 2px solid silver;
        border-radius: 0 0 0 8px;
    }

    canvas {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }
</style>