<script lang="ts">
    export let data;
    import Game from "$lib/components/Game.svelte";
    import NbaFilter from "./NBAFilter.svelte";
    import type { nbaConference, nbaDivision } from "./NBAFilter.svelte";

    // Sort games by start time
    data.nbaGamesToday.sort((a, b) => {
        const a_date = new Date(a.start_time)
        const b_date = new Date(b.start_time)
        return a_date > b_date ? 1 : -1
    });

    let conferenceFilter: nbaConference = undefined
    let divisionFilter: nbaDivision = undefined
    
    $: filteredNBAGames = data.nbaGamesToday.filter((nbaGame) => {
        let gameConferenceMatchesFilter: boolean = true;
        let gameDivisionMatchesFilter: boolean = true;

        if (conferenceFilter !== undefined && nbaGame.home_team?.conference !== conferenceFilter && nbaGame.away_team?.conference !== conferenceFilter){
            gameConferenceMatchesFilter = false;
        }
        if (divisionFilter !== undefined && nbaGame.home_team?.division !== divisionFilter && nbaGame.away_team?.division !== divisionFilter){
            gameDivisionMatchesFilter = false;
        }

        return gameConferenceMatchesFilter && gameDivisionMatchesFilter;
    })

    function updateGameFilter(newconferenceFilter: nbaConference, newDivisionFilter: nbaDivision){
        // Clear filters if same one is clicked twice
        if (conferenceFilter === newconferenceFilter && divisionFilter === newDivisionFilter) {
            conferenceFilter = undefined
            divisionFilter = undefined
        } else {
            conferenceFilter = newconferenceFilter
            divisionFilter = newDivisionFilter
        }
    }
</script>

<div class="grid grid-cols-[1fr,3fr,1fr]">
    <div></div>
    <div class="flex justify-center w-full">
        <div class="p-4 w-full">
            {#each filteredNBAGames as nbaGame}
                {#if nbaGame.home_team !== null && nbaGame.away_team !== null}
                        <Game 
                            homeTeamName={nbaGame.home_team.display_name}
                            homeTeamLogo={nbaGame.home_team.logo}
                            awayTeamName={nbaGame.away_team.display_name}
                            awayTeamLogo={nbaGame.away_team.logo}
                            startTime={new Date(nbaGame.start_time)}
                            watchPageLink='/NBA/watch/{nbaGame.id}'
                            viewPriceDollars={nbaGame.view_price_dollars}
                        />
                {/if}
            {:else}
                <p class="text-center">No NBA games found</p>
            {/each}    
        </div>
    </div>

    <div class="flex flex-col justify-around items-center mt-4 fixed right-0 w-1/5 gap-6">
        <div class="flex items-center justify-around w-5/6">
            <p>Team Filters</p>
            <button class="btn btn-sm variant-filled-tertiary" on:click={() => {conferenceFilter = undefined, divisionFilter = undefined}}>Clear Filter</button>
        </div>
        
        <div class="flex flex-col justify-center w-2/3 card variant-filled-surface p-4 gap-2">
            <NbaFilter conference="Western" division={undefined} bind:conferenceFilter bind:divisionFilter/>
            <NbaFilter conference="Western" division="Northwest" bind:conferenceFilter bind:divisionFilter/>
            <NbaFilter conference="Western" division="Pacific" bind:conferenceFilter bind:divisionFilter/>
            <NbaFilter conference="Western" division="Southwest" bind:conferenceFilter bind:divisionFilter/>
        </div>

        <div class="flex flex-col justify-center w-2/3 card variant-filled-surface p-4 gap-2">
            <NbaFilter conference="Eastern" division={undefined} bind:conferenceFilter bind:divisionFilter/>
            <NbaFilter conference="Eastern" division="Atlantic" bind:conferenceFilter bind:divisionFilter/>
            <NbaFilter conference="Eastern" division="Central" bind:conferenceFilter bind:divisionFilter/>
            <NbaFilter conference="Eastern" division="Southeast" bind:conferenceFilter bind:divisionFilter/>
        </div>
    </div>
</div>