<script lang="ts">
    export let data;
</script>

{#if data.nhl_game_today === null}
    <p>Error getting game stream</p>
{:else}
    <div>Game: {data.nhl_game_today?.title}</div>
    <p>${data.nhl_game_today?.view_price_dollars}</p>
    <p>{data.nhl_game_today?.stream_link}</p>
{/if}