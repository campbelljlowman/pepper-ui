<script>
    import Game from "$lib/components/Game.svelte";

    export let data;
    console.log(data);
</script>

{#each data.mlb_games_today as mlb_game}
    {#if mlb_game.home_team !== null && mlb_game.away_team !== null}
        <Game 
            home_team_name={mlb_game.home_team.display_name}
            home_team_logo={mlb_game.home_team.logo}
            away_team_name={mlb_game.away_team.display_name}
            away_team_logo={mlb_game.away_team.logo}
            timeimestamptz={new Date(mlb_game.timestamptz)}
        />
    {/if}
{/each}
<h1>MLB</h1>