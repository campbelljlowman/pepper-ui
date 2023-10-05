<script lang="ts">
     export let home_team_name: string;
     export let home_team_logo: string;
     export let away_team_name: string;
     export let away_team_logo: string;
     export let timeimestamptz: Date;
     export let stream_link: string | null;
     export let price: number | null;
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
        {#if price !== null && price != undefined}
        <p>${price}</p>
        {/if}
        {#if stream_link !== null && stream_link !== ''}
        <a href='/watch/{stream_link}' class="hover:bg-[var(--background-hover)] rounded">Watch</a>
        {/if}
        <p class="text-sm">{timeimestamptz.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})}</p>
    </div>
</div>
