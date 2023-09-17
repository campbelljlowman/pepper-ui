<script>
    /**
     * @type {string}
     */
     export let home_team: string;
    /**
     * @type {string}
     */
     export let away_team;
    /**
     * @type {string}
     */
     export let time;
</script>

<div class="flex justify-around items-center m-4">
    <div class="font-semibold w-1/2">
        <p>{home_team}</p>
        <p>{away_team}</p>
    </div>
    <div class="flex flex-col justify-around items-center w-1/2">
        <p class="text-sm">{time}</p>
        <a href='/watch/asdf' class="hover:bg-[var(--background-hover)] rounded">Watch</a>
    </div>
</div>
