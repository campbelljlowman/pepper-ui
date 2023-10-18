<script lang="ts">
    export let data;
</script>

{#if data.nhlGameToday === null}
    <p>Error getting game stream</p>
{:else}
    <div>Game: {data.nhlGameToday?.title}</div>
    <p>${data.nhlGameToday?.view_price_dollars}</p>

    {#if data.nhlGameToday.stream_link === null}
        <p>You need to purchase this game!</p>
    {:else}
        <p>{data.nhlGameToday?.stream_link.title}</p>
    {/if}
{/if}