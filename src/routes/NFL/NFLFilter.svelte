<script context="module" lang="ts">
    export type nflConference = "AFC" | "NFC" | undefined
    export type nflDivision = "North" | "South" | "East" | "West" | undefined
</script>

<script lang="ts">
    export let conference: nflConference
    export let division: nflDivision
    export let conferenceFilter: nflConference
    export let divisionFilter: nflDivision

    function updateGameFilter(newconferenceFilter: nflConference, newDivisionFilter: nflDivision){
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
        {conference}
    {/if}
</button>