<script lang="ts">
    import Game from "$lib/components/Game.svelte";
    export let data;

    data.mlb_games_today.sort((a, b) => {
        const a_date = new Date(a.timestamptz)
        const b_date = new Date(b.timestamptz)
        if (a_date > b_date) {
            return 1
        } else {
            return -1
        }
    });
    let leagueFilter: string = ''
    let divisionFilter: string = ''
    
    $: filteredMLBGames = data.mlb_games_today.filter((mlbGame) => {
        let leagueMatches: boolean = true;
        let divisionMatches: boolean = true;
        if (leagueFilter !== '' && mlbGame.home_team?.league !== leagueFilter && mlbGame.away_team?.league !== leagueFilter){
            leagueMatches = false;
        }
        if (divisionFilter !== '' && mlbGame.home_team?.division !== divisionFilter && mlbGame.away_team?.division !== divisionFilter){
            divisionMatches = false;
        }

        return leagueMatches && divisionMatches;
    })

    function updateGameFiter(newLeagueFilter: string, newDivisionFilter: string){
        if (leagueFilter === newLeagueFilter && divisionFilter === newDivisionFilter) {
            leagueFilter = ''
            divisionFilter = ''
        } else {
            leagueFilter = newLeagueFilter
            divisionFilter = newDivisionFilter
        }
    }
</script>

<div class="flex justify-around w-full">
    <div class="flex flex-col items-center w-1/3">
        <button on:click={() => {updateGameFiter('American League', '')}}>American League</button>
        <div class="flex gap-4">
            <button on:click={() => {updateGameFiter('American League', 'West')}}>West</button>
            <button on:click={() => {updateGameFiter('American League', 'Central')}}>Central</button>
            <button on:click={() => {updateGameFiter('American League', 'East')}}>East</button>
        </div>
    </div>
    <div class="flex flex-col items-centerw-1/3">
        <button on:click={() => {updateGameFiter('National League', '')}}>National League</button>
        <div class="flex gap-4">
            <button on:click={() => {updateGameFiter('National League', 'West')}}>West</button>
            <button on:click={() => {updateGameFiter('National League', 'Central')}}>Central</button>
            <button on:click={() => {updateGameFiter('National League', 'East')}}>East</button>
        </div>
    </div>
</div>

<div class="grid grid-cols-3 p-4">
    {#each filteredMLBGames as mlb_game}
        {#if mlb_game.home_team !== null && mlb_game.away_team !== null}
            <Game 
                home_team_name={mlb_game.home_team.display_name}
                home_team_logo={mlb_game.home_team.logo}
                away_team_name={mlb_game.away_team.display_name}
                away_team_logo={mlb_game.away_team.logo}
                timeimestamptz={new Date(mlb_game.timestamptz)}
                stream_link={mlb_game.stream_link}
            />
        {/if}
    {/each}
</div>