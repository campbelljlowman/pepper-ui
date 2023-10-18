<script lang="ts">
    export let data;
</script>

{#if data.cfbGameToday === null}
    <p>Error getting game stream</p>
{:else}
    <div>Game: {data.cfbGameToday?.title}</div>
    <p>${data.cfbGameToday?.view_price_dollars}</p>

    {#if data.cfbGameToday.stream_link === null}
        <p>You need to purchase this game!</p>
    {:else}
        <p>{data.cfbGameToday?.stream_link.title}</p>
    {/if}
{/if}