<script context="module" lang="ts">
    export type nbaConference = "Eastern" | "Western" | undefined
    export type nbaDivision = "Central" | "Atlantic" | "Southeast" | "Northwest" | "Pacific" | "Southwest" | undefined
</script>

<script lang="ts">
    export let conference: nbaConference
    export let division: nbaDivision
    export let conferenceFilter: nbaConference
    export let divisionFilter: nbaDivision

    function updateGameFilter(newconferenceFilter: nbaConference, newDivisionFilter: nbaDivision){
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