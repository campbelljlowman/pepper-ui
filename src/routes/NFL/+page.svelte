<script lang="ts">
    export let data;
    import Game from "$lib/components/Game.svelte";

    // Sort games by start time
    data.nfl_games_today.sort((a, b) => {
        const a_date = new Date(a.start_time)
        const b_date = new Date(b.start_time)
        return a_date > b_date ? 1 : -1
    });

    let conferenceFilter: "AFC" | "NFC" | undefined = undefined
    let divisionFilter: "North" | "South" | "East" | "West" | undefined = undefined
    
    $: filteredNFLGames = data.nfl_games_today.filter((nflGame) => {
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
        {#each filteredNFLGames as nfl_game}
            {#if nfl_game.home_team !== null && nfl_game.away_team !== null}
                    <Game 
                        home_team_name={nfl_game.home_team.display_name}
                        home_team_logo={nfl_game.home_team.logo}
                        away_team_name={nfl_game.away_team.display_name}
                        away_team_logo={nfl_game.away_team.logo}
                        start_time={new Date(nfl_game.start_time)}
                        game_stream_id={nfl_game.game_stream?.id}
                        game_stream_price={nfl_game.game_stream?.view_price}
                    />
            {/if}
        {:else}
            <p class="text-center">No NFL games today</p>
        {/each}    
    </div>
</div>