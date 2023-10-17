<script lang="ts">
    export let data;
    import Game from "$lib/components/Game.svelte";

    // Sort games by start time
    data.mlb_games_today.sort((a, b) => {
        const a_date = new Date(a.start_time)
        const b_date = new Date(b.start_time)
        return a_date > b_date ? 1 : -1
    });

    let leagueFilter: "American League" | "National League" | undefined = undefined
    let divisionFilter: "Central" | "East" | "West" | undefined = undefined
    
    $: filteredMLBGames = data.mlb_games_today.filter((mlbGame) => {
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

    function updateGameFilter(newLeagueFilter: "American League" | "National League" | undefined, newDivisionFilter: "Central" | "East" | "West" | undefined){
        // Clear filters if same one is clicked twice
        if (leagueFilter === newLeagueFilter && divisionFilter === newDivisionFilter) {
            leagueFilter = undefined
            divisionFilter = undefined
        } else {
            leagueFilter = newLeagueFilter
            divisionFilter = newDivisionFilter
        }
    }
</script>

<div class="flex justify-around w-full">
    <div class="flex flex-col items-center w-1/3">
        <button on:click={() => {updateGameFilter('American League', undefined)}}>American League</button>
        <div class="flex gap-4">
            <button on:click={() => {updateGameFilter('American League', 'West')}}>West</button>
            <button on:click={() => {updateGameFilter('American League', 'Central')}}>Central</button>
            <button on:click={() => {updateGameFilter('American League', 'East')}}>East</button>
        </div>
    </div>
    <!-- <div>
        <button>Clear Filters</button>
    </div> -->
    <div class="flex flex-col items-center w-1/3">
        <button on:click={() => {updateGameFilter('National League', undefined)}}>National League</button>
        <div class="flex gap-4">
            <button on:click={() => {updateGameFilter('National League', 'West')}}>West</button>
            <button on:click={() => {updateGameFilter('National League', 'Central')}}>Central</button>
            <button on:click={() => {updateGameFilter('National League', 'East')}}>East</button>
        </div>
    </div>
</div>

<div class="flex justify-center w-full">
    <div class="p-4 w-3/4">
        {#each filteredMLBGames as mlb_game}
            {#if mlb_game.home_team !== null && mlb_game.away_team !== null}
                <Game 
                    home_team_name={mlb_game.home_team.display_name}
                    home_team_logo={mlb_game.home_team.logo}
                    away_team_name={mlb_game.away_team.display_name}
                    away_team_logo={mlb_game.away_team.logo}
                    start_time={new Date(mlb_game.start_time)}
                    watch_page_link='/MLB/watch/{mlb_game.id}'
                    view_price_dollars={mlb_game.view_price_dollars}
                />
            {/if}
        {:else}
            <p class="text-center">No MLB games today</p>
        {/each}
    </div>
</div>