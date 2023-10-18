<script lang="ts">
    export let data;
    import Game from "$lib/components/Game.svelte";

    // Sort games by start time
    data.nflGamesToday.sort((a, b) => {
        const a_date = new Date(a.start_time)
        const b_date = new Date(b.start_time)
        return a_date > b_date ? 1 : -1
    });

    let conferenceFilter: "AFC" | "NFC" | undefined = undefined
    let divisionFilter: "North" | "South" | "East" | "West" | undefined = undefined
    
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

    function updateGameFilter(newconferenceFilter:  "AFC" | "NFC" | undefined, newDivisionFilter: "North" | "South" | "East" | "West" | undefined){
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
        <button on:click={() => {updateGameFilter('AFC', undefined)}}>AFC</button>
        <div class="flex gap-4">
            <button on:click={() => {updateGameFilter('AFC', 'North')}}>North</button>
            <button on:click={() => {updateGameFilter('AFC', 'South')}}>South</button>
            <button on:click={() => {updateGameFilter('AFC', 'East')}}>East</button>
            <button on:click={() => {updateGameFilter('AFC', 'West')}}>West</button>
        </div>
    </div>
    <!-- <div>
        <button>Clear Filters</button>
    </div> -->
    <div class="flex flex-col items-center w-1/3">
        <button on:click={() => {updateGameFilter('NFC', undefined)}}>NFC</button>
        <div class="flex gap-4">
            <button on:click={() => {updateGameFilter('NFC', 'North')}}>North</button>
            <button on:click={() => {updateGameFilter('NFC', 'South')}}>South</button>
            <button on:click={() => {updateGameFilter('NFC', 'East')}}>East</button>
            <button on:click={() => {updateGameFilter('NFC', 'West')}}>West</button>
        </div>
    </div>
</div>

<div class="flex justify-center w-full">
    <div class="p-4 w-3/4">
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
            <p class="text-center">No NFL games today</p>
        {/each}    
    </div>
</div>