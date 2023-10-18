<script lang="ts">
    export let data;
    import Game from "$lib/components/Game.svelte";

    // Sort games by start time
    data.nhlGamesToday.sort((a, b) => {
        const a_date = new Date(a.start_time)
        const b_date = new Date(b.start_time)
        return a_date > b_date ? 1 : -1
    });

    let conferenceFilter: "Eastern" | "Western" | undefined = undefined
    let divisionFilter: "Central" | "Atlantic" | "Metropolitan" | "Pacific" | undefined = undefined
    
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

    function updateGameFilter(newconferenceFilter: "Eastern" | "Western" | undefined, newDivisionFilter: "Central" | "Atlantic" | "Metropolitan" | "Pacific" | undefined){
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
        <button on:click={() => {updateGameFilter('Western', undefined)}}>Western Conference</button>
        <div class="flex gap-4">
            <button on:click={() => {updateGameFilter('Western', 'Pacific')}}>Pacific</button>
            <button on:click={() => {updateGameFilter('Western', 'Central')}}>Central</button>
        </div>
    </div>
    <!-- <div>
        <button>Clear Filters</button>
    </div> -->
    <div class="flex flex-col items-center w-1/3">
        <button on:click={() => {updateGameFilter('Eastern', undefined)}}>Eastern Conference</button>
        <div class="flex gap-4">
            <button on:click={() => {updateGameFilter('Eastern', 'Atlantic')}}>Atlantic</button>
            <button on:click={() => {updateGameFilter('Eastern', 'Metropolitan')}}>Metropolitan</button>
        </div>
    </div>
</div>

<div class="flex justify-center w-full">
    <div class="p-4 w-3/4">
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
            <p class="text-center">No NHL games today</p>
        {/each}    
    </div>
</div>