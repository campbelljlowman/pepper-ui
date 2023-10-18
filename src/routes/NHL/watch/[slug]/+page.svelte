<script lang="ts">
    export let data;
</script>

{#if data.nhl_game_today === null}
    <p>Error getting game stream</p>
{:else}
    <div>Game: {data.nhl_game_today?.title}</div>
    <p>${data.nhl_game_today?.view_price_dollars}</p>

    {#if data.nhl_game_today.stream_link === null}
        <p>You need to purchase this game!</p>
    {:else}
        <p>{data.nhl_game_today?.stream_link.title}</p>
    {/if}
{/if}