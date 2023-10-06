<script lang="ts">
    export let data;
</script>

{#if data.game_stream === null}
    <div>Invalid stream link</div>
{:else}
    <div>Game: {data.game_stream?.name}</div>
    <p>${data.game_stream.price}</p>
    <p>{data.game_stream.stream_link}</p>
{/if}