<script lang="ts">
    import type {Dataset, Item, SimplifiedNavigationHierarchy, Source} from "../constants/interfaces";
    import {UserPreference} from "../constants/interfaces";
    import IconComponent from "./IconComponent.svelte";
    import SeeAlsoLink from "./SeeAlsoLink.svelte";
    import {ABANDONED_SOURCES, LOCAL_STORAGE_ENABLED, navigationHierarchy, TRACKED_SOURCES} from "../constants/stores";

    export let item: Item;
    export let source: Source;
    export let dataset: Dataset;

    const sharePhrases: string[] = [
        'Did somebody say [$item, Blessed Blade of the Windseeker]? $url',
        'OMG guyz check this phat method making me 13373 gph just farming $item: $url',
        'Scottejaye won\'t tell you about this $item farm: $url',
        'How can I afford to spend 100k each week in GDKPs? Obviously, farming $item for an hour a week! $url',
        'Can\'t find any $item? Don\'t worry, I am an engineer! $url',
        'Beat the bots, save WoW, and finally get a girlfriend by outfarming them for $item: $url',
        'Please wake up. We don\t know where this will pop up, they say it may be related to your weird game Farm $item super fast! $url',
        'Step 1: Farm thousands of $item. Step 2: Wait for phase release. Step 3: It\'s worthless because everyone tried to do this? At least I can do it efficiently with the method at $url',
        'Chuck Norris doesn\'t farm $item. He goes where the Northrend Crafting Almanac says and waits for it to come to him out of fear. $url',
        'The virgin GDKP raider vs. the chad $item farmer: $url',
        'You go out with friends? Later, loser, I\'ll be busy getting rich with $item: $url',
        'They farmed how much $item per hour? Whaaaat? No way! *shocked reaction face* $url',
        '?w Thex check out this $item farm i found but dont tell anyone about it $url',
        'But first, a word from today\'s sponsor: $item farming! $url',
        'Your farm is legit and Imma let you finish, but this is the best $item farm of ALL TIME! $url',
        'Badger badger badger badger badger badger $item! $url',
        'Alright guys I know we wiped 30 times on Anub\'rekhan but if we all consume and do our best we can do it! Look here to farm the $item you\'ll need: $url',
        'You see, I farm $item, then I send it through my production network of six alts and sell the products for an extra 10 silver profit! $url',
        '$item farming: Paladins tested, Light approved! $url',
        'They made me find my own url shortener to share this, but it\'s okay because the $item farm is legit! $url',
        '$item farming made so simple even a Paladin can do it! $url',
        'Did you ever hear the tragedy of Darth Toraka the Wise? I thought not. It\'s not a story the Paladins would tell you. ' +
        'It\'s a Warrior legend. Darth Toraka the Wise was a rich lord of the Warriors, so powerful and so wise he could use ' +
        'the Northrend Crafting Almanac to influence the game to farm $item. He had such a knowledge of the farms he could ' +
        'even keep the ones he cared about from poverty. The dark side of the Northrend Crafting Almanac is a pathway to many ' +
        'farms some consider to be unnatural. He became so wealthy, the only thing he was afraid of was everyone finding his ' +
        'farming routes, which eventually of course, they did. Unfortunately, he put all his farming routes online, then everyone ' +
        'could do it themselves. Ironic. He could save others from poverty, but not himself. $url',
        'Easier to farm 500 $item this way than a single glaive out of Black Temple: $url',
        'Math makes my Paladin brain hurt, so instead I just farm $item: $url',
        'Didn\'t get Shadowmourne prio for your Paladin? That\'s okay, just farm some $item and buy it instead! $url',
        'New drinking game: Farm $item every time Blizzard says "In the coming weeks": $url',
        'Guys I found Mankrik\'s wife while farming $item: $url',
        '"Glad you could make it, Uther." "Watch your tone with me, boy. You may be my prince but I am still your superior ' +
        'as a Paladin." "As if I could forget. Listen, there\'s something about the $item you should know. Oh no, we\'re too late. ' +
        'These people have all read the Northrend Crafting Almanac. They may look fine now, but it\'s only a matter of time ' +
        'until they begin farming $item." "What?" "Look here, at $url!"'
    ]

    let sharePhrase: string = '';

    function toggleSourceTracked(): void {
        if (!LOCAL_STORAGE_ENABLED) {
            return;
        }
        if (source.userPreference === UserPreference.Tracked) {
            source.userPreference = UserPreference.Normal;
            removeSourceFromLocalStorageIfPresent(TRACKED_SOURCES);
        }
        else {
            if (source.userPreference === UserPreference.Abandoned) {
                removeSourceFromLocalStorageIfPresent(ABANDONED_SOURCES);
            }
            source.userPreference = UserPreference.Tracked;
            addSourceToLocalStorageIfAbsent(TRACKED_SOURCES);
        }
    }

    function toggleSourceAbandoned(): void {
        if (!LOCAL_STORAGE_ENABLED) {
            return;
        }
        if (source.userPreference === UserPreference.Abandoned) {
            source.userPreference = UserPreference.Normal;
            removeSourceFromLocalStorageIfPresent(ABANDONED_SOURCES);
        }
        else {
            if (source.userPreference === UserPreference.Tracked) {
                removeSourceFromLocalStorageIfPresent(TRACKED_SOURCES);
            }
            source.userPreference = UserPreference.Abandoned;
            addSourceToLocalStorageIfAbsent(ABANDONED_SOURCES);
        }
    }

    function removeSourceFromLocalStorageIfPresent(localStorageKey: string): void {
        const sources: SimplifiedNavigationHierarchy[] = JSON.parse(localStorage.getItem(localStorageKey));
        const reference: SimplifiedNavigationHierarchy = createNavigationReference();

        if (sources) {
            const sourcesWithoutReference: SimplifiedNavigationHierarchy[] = sources.filter((snh) => {
                snh.category === reference.category && snh.item === reference.item && snh.source === reference.source;
            });
            localStorage.setItem(localStorageKey, JSON.stringify(sourcesWithoutReference));
        }
    }

    function addSourceToLocalStorageIfAbsent(localStorageKey: string): void {
        const sources: SimplifiedNavigationHierarchy[] = JSON.parse(localStorage.getItem(localStorageKey));
        const reference: SimplifiedNavigationHierarchy = createNavigationReference();

        if (sources && !sources.some((snh) => snh.category === reference.category && snh.item === reference.item && snh.source === reference.source)) {
            sources.push(reference);
            localStorage.setItem(localStorageKey, JSON.stringify(sources));
        }
    }

    function createNavigationReference(): SimplifiedNavigationHierarchy {
        return {
            category: $navigationHierarchy["category"].name,
            item: $navigationHierarchy["item"].name,
            source: $navigationHierarchy["source"].name
        };
    }

    function recreateSharePhrase(): void {
        const randomIndex: number = Math.floor(Math.random() * sharePhrases.length);
        sharePhrase = sharePhrases[randomIndex];
        sharePhrase = sharePhrase.replace('$item', item.name).replace('$url', window.location.href);
    }
</script>

<div class="row h-100 details text-black px-3 py-4">
    <div class="col">
        <div class="row">
            <div class="col">
                <h4>{item.name} ({source.name})</h4>
            </div>
        </div>
        <div class="row align-items-center">
            <div class="col">
                {#if source.zone && source.zone.name}
                    {source.type.name + ' in ' + source.zone.name + '.'}
                {:else}
                    {source.type.name + '.'}
                {/if} {'Added in phase ' + source.phase + (source.confirmed ? '' : ' (unconfirmed)') + '.'}
            </div>
        </div>
        <div class="row align-items-center">
            {#if source.requirements.length > 0}
                <div class="col-auto">
                    You require the following:
                </div>
                {#each source.requirements as requirement}
                    <div class="col-auto">
                        <IconComponent icon="{requirement.icon}" title="{requirement.name}" />
                    </div>
                {/each}
            {:else}
                <div class="col">
                    You require nothing in particular.
                </div>
            {/if}
            <div class="col-12 fst-italic">
                You know this because you are psychic.
            </div>
        </div>
        <div class="row mt-2 align-items-center">
            <div class="col fw-bold">
                Popularity: {source.popularity}/5
            </div>
        </div>
        <div class="row mt-3">
            <div class="col">
                <h5>
                    Description
                </h5>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col">
                {source.comments}
            </div>
        </div>
        {#if source.seeAlso.length > 0}
            <div class="row mt-3">
                <div class="col">
                    <h5>
                        See also
                    </h5>
                </div>
            </div>
            {#each source.seeAlso as reference}
                <div class="row my-2">
                    <div class="col-auto">
                        <SeeAlsoLink {dataset} {reference}/>
                    </div>
                </div>
            {/each}
        {/if}
        <div class="row mt-4">
            <div class="col">
                <button class="btn w-100" data-bs-toggle="tooltip" disabled="{!LOCAL_STORAGE_ENABLED}"
                        title="Hide this source, moving it to the bottom of the list for this item. You can always restore it later." on:click={toggleSourceAbandoned}>
                    {source.userPreference === UserPreference.Abandoned ? 'Abandoned!' : 'Abandon'}
                </button>
            </div>
            <div class="col" data-bs-toggle="tooltip" title="Share this cool source with your friends!">
                <button class="btn w-100" data-bs-toggle="modal" data-bs-target="#shareModal" on:click={recreateSharePhrase}>
                    Share
                </button>
            </div>
            <div class="col">
                <button class="btn w-100" data-bs-toggle="tooltip" disabled="{!LOCAL_STORAGE_ENABLED}"
                        title="Track this source, moving it to the top of the list for this item." on:click={toggleSourceTracked}>
                    {source.userPreference === UserPreference.Tracked ? 'Tracked!' : 'Track'}
                </button>
            </div>
        </div>
        <div class="row" class:d-none={LOCAL_STORAGE_ENABLED}>
            <div class="col">
                Please note that tracking and abandoning sources requires your browser's local data storage to be enabled.
                This data, by design, cannot be transmitted away from your local machine, but the rest of the page will still
                work if you choose not to enable it.
            </div>
        </div>
    </div>
</div>

<div class="modal" id="shareModal" tabindex="-1" aria-labelledby="shareModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content bg-body">
            <div class="modal-header border-0">
                <h5 class="modal-title" id="shareModalLabel">
                    Send this to your friends!
                </h5>
            </div>
            <div class="modal-body">
                {sharePhrase}
            </div>
            <div class="modal-footer border-0">
                <div class="row align-items-center">
                    <div class="col">
                        <span class="fw-light">
                            (BTW: You can copy and paste the URL at any point to share or bookmark that point. But then you don't get wonderful jokes like this one!)
                        </span>
                    </div>
                    <div class="col-auto">
                        <button type="button" class="btn btn-dark" data-bs-dismiss="modal" aria-label="Close">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    h5 {
      margin-bottom: 0;
    }

    .details {
        background-image: url('/questlog.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .details .btn {
        background: var(--button-red) var(--bs-gradient);
    }

    .details .btn:hover {
        background: var(--button-red-hover) var(--bs-gradient);
    }
</style>