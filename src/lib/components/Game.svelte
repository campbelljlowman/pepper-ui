<script lang="ts">
     export let home_team_name: string;
     export let home_team_logo: string;
     export let away_team_name: string;
     export let away_team_logo: string;
     export let start_time: Date;
     export let game_stream_id: number | undefined;
     export let game_stream_price: number | undefined;
</script>

<div class="flex justify-between items-center border-4 rounded p-4 m-4">
    <div class="flex items-center font-semibold gap-2">
        <div class="flex gap-1">
            <img class="h-6 w-6" src={home_team_logo} alt="Home team logo"/>
            <p>{home_team_name}</p>
        </div>
        <p class="font-normal">at</p>
        <div class="flex gap-1 items-center">
            <img class="h-6 w-6" src={away_team_logo} alt="Away team logo"/>
            <p>{away_team_name}</p>
        </div>
    </div>
    <div class="flex items-center gap-3">
        {#if game_stream_price !== undefined}
        <p>${game_stream_price}</p>
        {/if}
        {#if game_stream_id !== undefined}
        <a href='/watch/{game_stream_id}' class="hover:bg-[var(--background-hover)] rounded">Watch</a>
        {/if}
        <p class="text-sm">{start_time.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})}</p>
    </div>
</div>
