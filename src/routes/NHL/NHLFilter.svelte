<script context="module" lang="ts">
    export type nhlDivision = "Central" | "Atlantic" | "Metropolitan" | "Pacific" | undefined
    export type nhlConference = "Eastern" | "Western" | undefined
</script>

<script lang="ts">
    export let conference: nhlConference
    export let division: nhlDivision
    export let conferenceFilter: nhlConference
    export let divisionFilter: nhlDivision

    function updateGameFilter(newconferenceFilter: nhlConference, newDivisionFilter: nhlDivision){
        // Clear filters if same one is clicked twice
        if (conferenceFilter === newconferenceFilter && divisionFilter === newDivisionFilter) {
            conferenceFilter = undefined
            divisionFilter = undefined
        } else {
            conferenceFilter = newconferenceFilter
            divisionFilter = newDivisionFilter
        }
    }
</script>

<button class="btn btn-sm variant-filled-tertiary" 
    on:click={() => {updateGameFilter(conference, division)}}
    class:!variant-filled-primary={conferenceFilter === conference && divisionFilter === division}>
    {#if division}
        {division}
    {:else}
        {conference} Conference
    {/if}
</button>