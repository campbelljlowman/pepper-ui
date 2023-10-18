<script lang="ts">
     export let homeTeamName: string;
     export let homeTeamLogo: string;
     export let awayTeamName: string;
     export let awayTeamLogo: string;
     export let startTime: Date;
     export let watchPageLink: string;
     export let viewPriceDollars: number;
</script>

<div class="flex justify-between items-center border-4 rounded p-4 m-4">
    <div class="flex items-center font-semibold gap-2">
        <div class="flex gap-1">
            <img class="h-6 w-6" src={homeTeamLogo} alt="Home team logo"/>
            <p>{homeTeamName}</p>
        </div>
        <p class="font-normal">at</p>
        <div class="flex gap-1 items-center">
            <img class="h-6 w-6" src={awayTeamLogo} alt="Away team logo"/>
            <p>{awayTeamName}</p>
        </div>
    </div>
    <div class="flex items-center gap-3">
        <p>${viewPriceDollars}</p>
        <a href='{watchPageLink}' class="hover:bg-[var(--background-hover)] rounded">Watch</a>
        <p class="text-sm">{startTime.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})}</p>
    </div>
</div>
