<script>
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
</script>

<div class="grid grid-cols-3 p-4">
    {#each data.mlb_games_today as mlb_game}
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