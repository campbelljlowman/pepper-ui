<script lang="ts">
    export let data;
</script>

{#if data.nfl_game_today === null}
    <p>Error getting game stream</p>
{:else}
    <div>Game: {data.nfl_game_today?.title}</div>
    <p>${data.nfl_game_today?.view_price_dollars}</p>

    {#if data.nfl_game_today.stream_link === null}
        <p>You need to purchase this game!</p>
    {:else}
        <p>{data.nfl_game_today?.stream_link.title}</p>
    {/if}
{/if}