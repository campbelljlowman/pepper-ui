<script lang="ts">
    export let data;
</script>

{#if data.nbaGameToday === null}
    <p>Error getting game stream</p>
{:else}
    <div>Game: {data.nbaGameToday?.title}</div>
    <p>${data.nbaGameToday?.view_price_dollars}</p>

    {#if data.nbaGameToday.stream_link === null}
        <p>You need to purchase this game!</p>
    {:else}
        <p>{data.nbaGameToday?.stream_link.title}</p>
    {/if}
{/if}