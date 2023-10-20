<script context="module" lang="ts">
    export type mlbLeague = "American League" | "National League" | undefined
    export type mlbDivision = "Central" | "East" | "West" | undefined
</script>

<script lang="ts">
    export let league: mlbLeague
    export let division: mlbDivision
    export let leagueFilter: mlbLeague
    export let divisionFilter: mlbDivision

    function updateGameFilter(newleagueFilter: mlbLeague, newDivisionFilter: mlbDivision){
        // Clear filters if same one is clicked twice
        if (leagueFilter === newleagueFilter && divisionFilter === newDivisionFilter) {
            leagueFilter = undefined
            divisionFilter = undefined
        } else {
            leagueFilter = newleagueFilter
            divisionFilter = newDivisionFilter
        }
    }
</script>

<button class="btn btn-sm variant-filled-tertiary" 
    on:click={() => {updateGameFilter(league, division)}}
    class:!variant-filled-primary={leagueFilter === league && divisionFilter === division}>
    {#if division}
        {division}
    {:else}
        {league}
    {/if}
</button>