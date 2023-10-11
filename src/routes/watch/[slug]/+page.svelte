<script lang="ts">
    export let data;

    // TODO: Maybe change this to a promise block, or preload game on page.ts to keep undefined from flashing
    let game_stream: {
        created_at: string;
        id: number;
        name: string;
        stream_link: string;
        view_price: number;
    } | null

    async function loadGameStream() {
        const { data: result, error } = await data.supabase.from('game_stream').select().eq('id', +data.game_stream_id!).limit(1).single()
        if (error) {
            console.log(`Error getting stream: ${error}`)
        }
        game_stream = result
    }

    loadGameStream()

    // $: if (data.session) {
    //     loadGameStream()
    // }
</script>

{#if data.game_stream_id === null}
    <div>Invalid game id</div>
{:else}
    <div>Game: {game_stream?.name}</div>
    <p>${game_stream?.view_price}</p>
    <p>{game_stream?.stream_link}</p>
{/if}