<script lang="ts">
    export let data;
</script>

{#if data.mlbGameToday === null}
    <p>Error getting game stream</p>
{:else}
    <div>Game: {data.mlbGameToday?.title}</div>
    <p>${data.mlbGameToday?.view_price_dollars}</p>

    {#if data.mlbGameToday.stream_link === null}
        <p>You need to purchase this game!</p>
    {:else}
        <p>{data.mlbGameToday?.stream_link.title}</p>
    {/if}
{/if}