<script lang="ts">
     export let homeTeamName: string;
     export let homeTeamLogo: string;
     export let awayTeamName: string;
     export let awayTeamLogo: string;
     export let startTime: Date;
     export let watchPageLink: string;
     export let viewPriceDollars: number;
</script>

<div class="flex justify-between items-center card variant-ghost p-4 m-4">
    <div class="flex items-center font-semibold gap-2 w-2/3">
        <div class="flex gap-1 w-1/2">
            <img class="h-6 w-6" src={homeTeamLogo} alt="Home team logo"/>
            <p>{homeTeamName}</p>
        </div>
        <div class="flex gap-1 w-1/2 justify-start items-center">
            <p class="font-normal">at</p>
            <img class="h-6 w-6" src={awayTeamLogo} alt="Away team logo"/>
            <p>{awayTeamName}</p>
        </div>
    </div>
    <div class="flex justify-end items-center gap-3 w-1/3">
        <p>${viewPriceDollars}</p>
        <a href='{watchPageLink}' class="btn variant-filled-secondary">Watch</a>
        <p class="text-sm">{startTime.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})}</p>
    </div>
</div>
