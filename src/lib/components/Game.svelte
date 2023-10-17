<script lang="ts">
     export let home_team_name: string;
     export let home_team_logo: string;
     export let away_team_name: string;
     export let away_team_logo: string;
     export let start_time: Date;
     export let watch_page_link: string;
     export let view_price_dollars: number;
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
        <p>${view_price_dollars}</p>
        <a href='{watch_page_link}' class="hover:bg-[var(--background-hover)] rounded">Watch</a>
        <p class="text-sm">{start_time.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})}</p>
    </div>
</div>
