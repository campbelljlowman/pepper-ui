<script lang="ts">
    import Game from '$lib/components/Game.svelte';
    export let data;    
</script>

<!-- <h1>CFB</h1> -->
<div class="grid grid-cols-3 p-4">
    {#each data.games as game}
        <Game {...game}/>
    {/each}
</div>

<!-- Show games based on differnt views (conference, schedule). Get some sample data in json -->