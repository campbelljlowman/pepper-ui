<script lang="ts">
    export let data;
    import Game from "$lib/components/Game.svelte";
    import CfbFilter from "./CFBFilter.svelte";
    import type { cfbConference } from "./CFBFilter.svelte";

    // Sort games by start time
    data.cfbGamesToday.sort((a, b) => {
        const a_date = new Date(a.start_time)
        const b_date = new Date(b.start_time)
        return a_date > b_date ? 1 : -1
    });

    let conferenceFilter: cfbConference = undefined

    $: filteredCFBGames = data.cfbGamesToday.filter((cfbGame) => {
        let gameConferenceMatchesFilter: boolean = true;

        if (conferenceFilter !== undefined && cfbGame.home_team?.conference !== conferenceFilter && cfbGame.away_team?.conference !== conferenceFilter){
            gameConferenceMatchesFilter = false;
        }

        return gameConferenceMatchesFilter;
    })
</script>

<div class="grid grid-cols-[1fr,3fr,1fr]">
    <div></div>
    <div class="flex justify-center w-full">
        <div class="p-4 w-full">
            {#each filteredCFBGames as cfbGame}
                {#if cfbGame.home_team !== null && cfbGame.away_team !== null}
                    <Game 
                        homeTeamName={cfbGame.home_team.display_name}
                        homeTeamLogo={cfbGame.home_team.logo}
                        awayTeamName={cfbGame.away_team.display_name}
                        awayTeamLogo={cfbGame.away_team.logo}
                        startTime={new Date(cfbGame.start_time)}
                        watchPageLink='/CFB/watch/{cfbGame.id}'
                        viewPriceDollars={cfbGame.view_price_dollars}
                    />
                {/if}
            {:else}
                <p class="text-center">No CFB games found</p>
            {/each}
        </div>
    </div>

    <div class="flex flex-col justify-around items-center mt-4 fixed right-0 w-1/5 gap-6">
        <div class="flex items-center justify-around w-5/6">
            <p>Team Filters</p>
            <button class="btn btn-sm variant-filled-tertiary" on:click={() => {conferenceFilter = undefined}}>Clear Filter</button>
        </div>
        
        <div class="flex flex-col justify-center w-2/3 card variant-filled-surface p-4 gap-2">
            <CfbFilter conference='ACC' bind:conferenceFilter />
            <CfbFilter conference='Mid-American' bind:conferenceFilter />
            <CfbFilter conference='American' bind:conferenceFilter />
            <CfbFilter conference='Mountain West' bind:conferenceFilter />
            <CfbFilter conference='Pac-12' bind:conferenceFilter />
            <CfbFilter conference='Big 12' bind:conferenceFilter />
            <CfbFilter conference='SEC' bind:conferenceFilter />
            <CfbFilter conference='Big Ten' bind:conferenceFilter />
            <CfbFilter conference='Sun Belt' bind:conferenceFilter />
            <CfbFilter conference='Conference USA' bind:conferenceFilter />
            <CfbFilter conference='FBS Independents' bind:conferenceFilter />
        </div>
    </div>
</div>