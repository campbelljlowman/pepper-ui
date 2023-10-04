<script lang="ts">
     export let home_team_name: string;
     export let home_team_logo: string;
     export let away_team_name: string;
     export let away_team_logo: string;
     export let timeimestamptz: Date;
</script>

<div class="flex justify-around items-center border-4 rounded p-4 m-4">
    <div class="font-semibold w-1/2">
        <p>{home_team_name}</p>
        <p>{away_team_name}</p>
    </div>
    <div class="flex flex-col justify-around items-center w-1/2">
        <p class="text-sm">{timeimestamptz}</p>
        <a href='/watch/asdf' class="hover:bg-[var(--background-hover)] rounded">Watch</a>
    </div>
</div>
