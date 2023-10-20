<script lang="ts">
    export let data;
    import Game from "$lib/components/Game.svelte";
    import NhlFilter from "./NHLFilter.svelte";
    import type { nhlConference, nhlDivision } from "./NHLFilter.svelte";

    // Sort games by start time
    data.nhlGamesToday.sort((a, b) => {
        const a_date = new Date(a.start_time)
        const b_date = new Date(b.start_time)
        return a_date > b_date ? 1 : -1
    });

    let conferenceFilter: nhlConference = undefined
    let divisionFilter: nhlDivision = undefined
    
    $: filteredNHLGames = data.nhlGamesToday.filter((nhlGame) => {
        let gameConferenceMatchesFilter: boolean = true;
        let gameDivisionMatchesFilter: boolean = true;
        if (conferenceFilter !== undefined && nhlGame.home_team?.conference !== conferenceFilter && nhlGame.away_team?.conference !== conferenceFilter){
            gameConferenceMatchesFilter = false;
        }
        if (divisionFilter !== undefined && nhlGame.home_team?.division !== divisionFilter && nhlGame.away_team?.division !== divisionFilter){
            gameDivisionMatchesFilter = false;
        }

        return gameConferenceMatchesFilter && gameDivisionMatchesFilter;
    })

</script>

<div class="grid grid-cols-[1fr,3fr,1fr]">
    <div></div>
    <div class="flex justify-center w-full">
        <div class="p-4 w-full">
            {#each filteredNHLGames as nhlGame}
                {#if nhlGame.home_team !== null && nhlGame.away_team !== null}
                        <Game 
                            homeTeamName={nhlGame.home_team.display_name}
                            homeTeamLogo={nhlGame.home_team.logo}
                            awayTeamName={nhlGame.away_team.display_name}
                            awayTeamLogo={nhlGame.away_team.logo}
                            startTime={new Date(nhlGame.start_time)}
                            watchPageLink='/NHL/watch/{nhlGame.id}'
                            viewPriceDollars={nhlGame.view_price_dollars}
                        />
                {/if}
            {:else}
                <p class="text-center">No NHL games found</p>
            {/each}    
        </div>
    </div>

    <div class="flex flex-col justify-around items-center mt-4 fixed right-0 w-1/5 gap-6">
        <div class="flex items-center justify-around w-5/6">
            <p>Team Filters</p>
            <button class="btn btn-sm variant-filled-tertiary" on:click={() => {conferenceFilter = undefined, divisionFilter = undefined}}>Clear Filter</button>
        </div>

        <div class="flex flex-col justify-center w-2/3 card variant-filled-surface p-4 gap-2">
            <NhlFilter conference="Eastern" division={undefined}  bind:conferenceFilter bind:divisionFilter />
            <NhlFilter conference="Eastern" division="Atlantic"  bind:conferenceFilter bind:divisionFilter />
            <NhlFilter conference="Eastern" division="Metropolitan"  bind:conferenceFilter bind:divisionFilter />
        </div>
        
        <div class="flex flex-col justify-center w-2/3 card variant-filled-surface p-4 gap-2">
            <NhlFilter conference="Western" division={undefined}  bind:conferenceFilter bind:divisionFilter />
            <NhlFilter conference="Western" division="Pacific"  bind:conferenceFilter bind:divisionFilter />
            <NhlFilter conference="Western" division="Central" bind:conferenceFilter bind:divisionFilter />
        </div>
    </div>
</div>

