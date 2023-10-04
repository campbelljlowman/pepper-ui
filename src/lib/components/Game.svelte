<script lang="ts">
     export let home_team_name: string;
     export let home_team_logo: string;
     export let away_team_name: string;
     export let away_team_logo: string;
     export let timeimestamptz: Date;
     export let stream_link: string | null;
</script>

<div class="flex justify-around items-center border-4 rounded p-4 m-4">
    <div class="font-semibold w-2/3">
        <div class="flex gap-1">
            <img class="h-6 w-6" src={home_team_logo} alt="Home team logo"/>
            <p>{home_team_name}</p>
        </div>
        <div class="flex gap-1 items-center">
            <img class="h-6 w-6" src={away_team_logo} alt="Away team logo"/>
            <p>{away_team_name}</p>
        </div>
    </div>
    <div class="flex flex-col justify-around items-center w-1/3">
        <p class="text-sm">{timeimestamptz.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})}</p>
        {#if stream_link !== null && stream_link !== ''}
            <a href='/watch/{stream_link}' class="hover:bg-[var(--background-hover)] rounded">Watch</a>
        {/if}
    </div>
</div>
