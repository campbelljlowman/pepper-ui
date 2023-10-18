<script lang="ts">
    export let data;
    import Game from "$lib/components/Game.svelte";

    // Sort games by start time
    data.nbaGamesToday.sort((a, b) => {
        const a_date = new Date(a.start_time)
        const b_date = new Date(b.start_time)
        return a_date > b_date ? 1 : -1
    });

    let conferenceFilter: "Eastern" | "Western" | undefined = undefined
    let divisionFilter: "Central" | "Atlantic" | "Southeast" | "Northwest" | "Pacific" | "Southwest" | undefined = undefined
    
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

    function updateGameFilter(newconferenceFilter:  "Eastern" | "Western" | undefined, newDivisionFilter: "Central" | "Atlantic" | "Southeast" | "Northwest" | "Pacific" | "Southwest" | undefined){
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

<div class="flex justify-around w-full">
    <div class="flex flex-col items-center w-1/3">
        <button on:click={() => {updateGameFilter('Western', undefined)}}>Western</button>
        <div class="flex gap-4">
            <button on:click={() => {updateGameFilter('Western', 'Northwest')}}>Northwest</button>
            <button on:click={() => {updateGameFilter('Western', 'Pacific')}}>Pacific</button>
            <button on:click={() => {updateGameFilter('Western', 'Southwest')}}>Southwest</button>
        </div>
    </div>
    <!-- <div>
        <button>Clear Filters</button>
    </div> -->
    <div class="flex flex-col items-center w-1/3">
        <button on:click={() => {updateGameFilter('Eastern', undefined)}}>Eastern</button>
        <div class="flex gap-4">
            <button on:click={() => {updateGameFilter('Eastern', 'Atlantic')}}>Atlantic</button>
            <button on:click={() => {updateGameFilter('Eastern', 'Central')}}>Central</button>
            <button on:click={() => {updateGameFilter('Eastern', 'Southeast')}}>Southeast</button>
        </div>
    </div>
</div>

<div class="flex justify-center w-full">
    <div class="p-4 w-3/4">
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
            <p class="text-center">No NBA games today</p>
        {/each}    
    </div>
</div>