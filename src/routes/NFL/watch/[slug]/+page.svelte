<script lang="ts">
    export let data

</script>

{#if data.nfl_game_today === null}
    <p>Error getting game stream</p>
{:else}
    <div>Game: {data.nfl_game_today?.title}</div>
    <p>${data.nfl_game_today?.view_price_dollars}</p>
    <p>{data.nfl_game_today?.stream_link_id}</p>
{/if}