<script lang="ts">
    export let data;
</script>

{#if data.nflGameToday === null}
    <p>Error getting game stream</p>
{:else}
    <div>Game: {data.nflGameToday?.title}</div>
    <p>${data.nflGameToday?.view_price_dollars}</p>

    {#if data.nflGameToday.stream_link === null}
        <p>You need to purchase this game!</p>
    {:else}
        <p>{data.nflGameToday?.stream_link.title}</p>
    {/if}
{/if}