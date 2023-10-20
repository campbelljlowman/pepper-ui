<script lang="ts">
    export let data;
    import Game from "$lib/components/Game.svelte";
    import type { nflConference, nflDivision } from "./NFLFilter.svelte";
    import NflFilter from "./NFLFilter.svelte";

    // Sort games by start time
    data.nflGamesToday.sort((a, b) => {
        const a_date = new Date(a.start_time)
        const b_date = new Date(b.start_time)
        return a_date > b_date ? 1 : -1
    });

    let conferenceFilter: nflConference = undefined
    let divisionFilter: nflDivision = undefined
    
    $: filteredNFLGames = data.nflGamesToday.filter((nflGame) => {
        let gameConferenceMatchesFilter: boolean = true;
        let gameDivisionMatchesFilter: boolean = true;

        if (conferenceFilter !== undefined && nflGame.home_team?.conference !== conferenceFilter && nflGame.away_team?.conference !== conferenceFilter){
            gameConferenceMatchesFilter = false;
        }
        if (divisionFilter !== undefined && nflGame.home_team?.division !== divisionFilter && nflGame.away_team?.division !== divisionFilter){
            gameDivisionMatchesFilter = false;
        }

        return gameConferenceMatchesFilter && gameDivisionMatchesFilter;
    })

    function updateGameFilter(newconferenceFilter: nflConference, newDivisionFilter: nflDivision){
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
            {#each filteredNFLGames as nflGame}
                {#if nflGame.home_team !== null && nflGame.away_team !== null}
                        <Game 
                            homeTeamName={nflGame.home_team.display_name}
                            homeTeamLogo={nflGame.home_team.logo}
                            awayTeamName={nflGame.away_team.display_name}
                            awayTeamLogo={nflGame.away_team.logo}
                            startTime={new Date(nflGame.start_time)}
                            watchPageLink='/NFL/watch/{nflGame.id}'
                            viewPriceDollars={nflGame.view_price_dollars}
                        />
                {/if}
            {:else}
                <p class="text-center">No NFL games found</p>
            {/each}    
        </div>
    </div>

    <div class="flex flex-col justify-around items-center mt-4 fixed right-0 w-1/5 gap-6">
        <div class="flex items-center justify-around w-5/6">
            <p>Team Filters</p>
            <button class="btn btn-sm variant-filled-tertiary" on:click={() => {conferenceFilter = undefined, divisionFilter = undefined}}>Clear Filter</button>
        </div>
        
        <div class="flex flex-col justify-center w-2/3 card variant-filled-surface p-4 gap-2">
            <NflFilter conference="AFC" division={undefined}  bind:conferenceFilter bind:divisionFilter />
            <NflFilter conference="AFC" division="North"  bind:conferenceFilter bind:divisionFilter />
            <NflFilter conference="AFC" division="South" bind:conferenceFilter bind:divisionFilter />
            <NflFilter conference="AFC" division="East" bind:conferenceFilter bind:divisionFilter />
            <NflFilter conference="AFC" division="West" bind:conferenceFilter bind:divisionFilter />
        </div>

        <div class="flex flex-col justify-center w-2/3 card variant-filled-surface p-4 gap-2">
            <NflFilter conference="NFC" division={undefined}  bind:conferenceFilter bind:divisionFilter />
            <NflFilter conference="NFC" division="North"  bind:conferenceFilter bind:divisionFilter />
            <NflFilter conference="NFC" division="South"  bind:conferenceFilter bind:divisionFilter />
            <NflFilter conference="NFC" division="East"  bind:conferenceFilter bind:divisionFilter />
            <NflFilter conference="NFC" division="West"  bind:conferenceFilter bind:divisionFilter />
        </div>
    </div>
</div>