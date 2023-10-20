<script lang="ts">
    export let data;
    import Game from "$lib/components/Game.svelte";
    import type { mlbLeague, mlbDivision } from "./MLBFilter.svelte";
    import MlbFilter from "./MLBFilter.svelte";

    // Sort games by start time
    data.mlbGamesToday.sort((a, b) => {
        const a_date = new Date(a.start_time)
        const b_date = new Date(b.start_time)
        return a_date > b_date ? 1 : -1
    });

    let leagueFilter: mlbLeague = undefined
    let divisionFilter: mlbDivision = undefined
    
    $: filteredMLBGames = data.mlbGamesToday.filter((mlbGame) => {
        let gameLeagueMatchesFilter: boolean = true;
        let gameDivisionMatchesFilter: boolean = true;
        if (leagueFilter !== undefined && mlbGame.home_team?.league !== leagueFilter && mlbGame.away_team?.league !== leagueFilter){
            gameLeagueMatchesFilter = false;
        }
        if (divisionFilter !== undefined && mlbGame.home_team?.division !== divisionFilter && mlbGame.away_team?.division !== divisionFilter){
            gameDivisionMatchesFilter = false;
        }

        return gameLeagueMatchesFilter && gameDivisionMatchesFilter;
    })
</script>


<div class="grid grid-cols-[1fr,3fr,1fr]">
    <div></div>
    <div class="flex justify-center w-full">
        <div class="p-4 w-full">
            {#each filteredMLBGames as mlbGame}
                {#if mlbGame.home_team !== null && mlbGame.away_team !== null}
                    <Game 
                        homeTeamName={mlbGame.home_team.display_name}
                        homeTeamLogo={mlbGame.home_team.logo}
                        awayTeamName={mlbGame.away_team.display_name}
                        awayTeamLogo={mlbGame.away_team.logo}
                        startTime={new Date(mlbGame.start_time)}
                        watchPageLink='/MLB/watch/{mlbGame.id}'
                        viewPriceDollars={mlbGame.view_price_dollars}
                    />
                {/if}
            {:else}
                <p class="text-center">No MLB games found</p>
            {/each}  
        </div>
    </div>

    <div class="flex flex-col justify-around items-center mt-4 fixed right-0 w-1/5 gap-6">
        <div class="flex items-center justify-around w-5/6">
            <p>Team Filters</p>
            <button class="btn btn-sm variant-filled-tertiary" on:click={() => {leagueFilter = undefined, divisionFilter = undefined}}>Clear Filter</button>
        </div>
        
        <div class="flex flex-col justify-center w-2/3 card variant-filled-surface p-4 gap-2">
            <MlbFilter league="American League" division={undefined} bind:leagueFilter bind:divisionFilter/>
            <MlbFilter league="American League" division="East" bind:leagueFilter bind:divisionFilter/>
            <MlbFilter league="American League" division="Central" bind:leagueFilter bind:divisionFilter/>
            <MlbFilter league="American League" division="West" bind:leagueFilter bind:divisionFilter/>
        </div>

        <div class="flex flex-col justify-center w-2/3 card variant-filled-surface p-4 gap-2">
            <MlbFilter league="National League" division={undefined} bind:leagueFilter bind:divisionFilter/>
            <MlbFilter league="National League" division="East" bind:leagueFilter bind:divisionFilter/>
            <MlbFilter league="National League" division="Central" bind:leagueFilter bind:divisionFilter/>
            <MlbFilter league="National League" division="West" bind:leagueFilter bind:divisionFilter/>
        </div>
    </div>
</div>