<script lang="ts">
    import {SourceType} from "../constants/sourceType";
    import {filterSettings} from "../constants/stores";
    import {Zone} from "../constants/zone";
    import {Requirement} from "../constants/requirement";

    function toggleAll(zones: Zone[]): void {
        if ($filterSettings.permittedZones.includes(zones[0].name)) {
            removeAllZonesFromFilter(zones);
        }
        else {
            addAllZonesToFilter(zones);
        }
    }

    function removeAllZonesFromFilter(zones: Zone[]): void {
        const zoneNamesToRemove: string[] = zones.map(z => z.name);
        $filterSettings.permittedZones = $filterSettings.permittedZones.filter(zoneName => !zoneNamesToRemove.includes(zoneName));
    }

    function addAllZonesToFilter(zones: Zone[]): void {
        for (const zone of zones) {
            if (!$filterSettings.permittedZones.includes(zone.name)) {
                $filterSettings.permittedZones.push(zone.name);
            }
        }
        $filterSettings.permittedZones = $filterSettings.permittedZones;
    }
</script>

<div class="row align-items-center border border-dark rounded-3 py-1">
    <div class="col">
        <div class="dropdown">
            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                Type
            </button>
            <ul class="dropdown-menu dropdown-menu-dark p-2">
                {#each SourceType.values as type}
                    <li>
                        <div class="dropdown-item">
                            <label>
                                <input type="checkbox" class="me-2" name="type" value="{type.name}" bind:group={$filterSettings.permittedTypes} />
                                {type.name}
                            </label>
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
    <div class="col">
        <div class="dropdown ">
            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                Zone
            </button>
            <ul class="dropdown-menu dropdown-menu-dark p-2">
                <li class="d-flex justify-content-between">
                    <h6 class="dropdown-header ps-1">Open world</h6>
                    <button class="btn btn-light py-1 px-2" on:click={() => toggleAll(Zone.openWorld)}>
                        Toggle all
                    </button>
                </li>
                {#each Zone.openWorld as zone}
                    <li>
                        <div class="dropdown-item">
                            <label>
                                <input type="checkbox" class="me-2" name="zone" value="{zone.name}" bind:group={$filterSettings.permittedZones} />
                                {zone.name}
                            </label>
                        </div>
                    </li>
                {/each}
                <li class="d-flex justify-content-between">
                    <h6 class="dropdown-header ps-1">Dungeons</h6>
                    <button class="btn btn-light py-1 px-2"  on:click={() => toggleAll(Zone.dungeons)}>
                        Toggle all
                    </button>
                </li>
                {#each Zone.dungeons as zone}
                    <li>
                        <div class="dropdown-item">
                            <label>
                                <input type="checkbox" class="me-2" name="zone" value="{zone.name}" bind:group={$filterSettings.permittedZones} />
                                {zone.name}
                            </label>
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
    <div class="col">
        <div class="dropdown">
            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                Popularity
            </button>
            <ul class="dropdown-menu dropdown-menu-dark p-2">
                <li>
                    <div class="dropdown-header">
                        <label for="popularityRange" class="form-label">
                            Projected popularity is at most {$filterSettings.highestPopularity}
                        </label>
                    </div>
                </li>
                <li>
                    <div class="dropdown-item">
                        <input type="range" class="form-range" min="0" max="5" id="popularityRange" bind:value={$filterSettings.highestPopularity} />
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="col">
        <div class="dropdown">
            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                Phase
            </button>
            <ul class="dropdown-menu dropdown-menu-dark p-2">
                <li>
                    <div class="dropdown-header">
                        <label for="phaseRange" class="form-label">
                            Added in or before phase {$filterSettings.earliestPhase}
                        </label>
                    </div>
                </li>
                <li>
                    <div class="dropdown-item">
                        <input type="range" class="form-range" min="1" max="5" id="phaseRange" bind:value={$filterSettings.earliestPhase} />
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="col">
        <div class="dropdown">
            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                May require
            </button>
            <ul class="dropdown-menu dropdown-menu-dark p-2">
                {#each Requirement.values as requirement}
                    <li>
                        <div class="dropdown-item">
                            <label>
                                <input type="checkbox" class="me-2" name="requires" value="{requirement.name}" bind:group={$filterSettings.permittedRequirements} />
                                {requirement.name}
                            </label>
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</div>

<style>
    .dropdown-menu {
        max-height: 60vh;
        overflow-y: auto;
    }
</style>