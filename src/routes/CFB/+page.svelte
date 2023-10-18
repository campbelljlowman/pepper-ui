<script lang="ts">
    export let data;
    import Game from "$lib/components/Game.svelte";

    // Sort games by start time
    data.cfbGamesToday.sort((a, b) => {
        const a_date = new Date(a.start_time)
        const b_date = new Date(b.start_time)
        return a_date > b_date ? 1 : -1
    });

    let conferenceFilter: "ACC" | "Mid-American" | "American" | "Mountain West" | "Pac-12" | "Big 12" | "SEC" | "Big Ten" | "Sun Belt" | "Conference USA" | "FBS Independents" | undefined = undefined
    
    $: filteredCFBGames = data.cfbGamesToday.filter((cfbGame) => {
        let gameConferenceMatchesFilter: boolean = true;

        if (conferenceFilter !== undefined && cfbGame.home_team?.conference !== conferenceFilter && cfbGame.away_team?.conference !== conferenceFilter){
            gameConferenceMatchesFilter = false;
        }

        return gameConferenceMatchesFilter;
    })

    function updateGameFilter(newConferenceFilter: "ACC" | "Mid-American" | "American" | "Mountain West" | "Pac-12" | "Big 12" | "SEC" | "Big Ten" | "Sun Belt" | "Conference USA" | "FBS Independents" | undefined){
        // Clear filters if same one is clicked twice
        if (conferenceFilter === newConferenceFilter) {
            conferenceFilter = undefined
        } else {
            conferenceFilter = newConferenceFilter
        }
    }
</script>

<div class="flex justify-center w-full">
    <div class="flex justify-center w-3/4 gap-4">
        <button on:click={() => {updateGameFilter('ACC')}}>ACC</button>
        <button on:click={() => {updateGameFilter('Mid-American')}}>Mid-American</button>
        <button on:click={() => {updateGameFilter('American')}}>American</button>
        <button on:click={() => {updateGameFilter('Mountain West')}}>Mountain West</button>
        <button on:click={() => {updateGameFilter('Pac-12')}}>Pac-12</button>
        <button on:click={() => {updateGameFilter('Big 12')}}>Big 12</button>
        <button on:click={() => {updateGameFilter('SEC')}}>SEC</button>
        <button on:click={() => {updateGameFilter('Big Ten')}}>Big Ten</button>
        <button on:click={() => {updateGameFilter('Sun Belt')}}>Sun Belt</button>
        <button on:click={() => {updateGameFilter('Conference USA')}}>Conference USA</button>
        <button on:click={() => {updateGameFilter('FBS Independents')}}>FBS Independents</button>
    </div>
</div>

<div class="flex justify-center w-full">
    <div class="p-4 w-3/4">
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
            <p class="text-center">No CFB games today</p>
        {/each}
    </div>
</div>