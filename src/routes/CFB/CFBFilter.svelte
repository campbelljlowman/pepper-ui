<script context="module" lang="ts">
    export type cfbConference =  "ACC" | "Mid-American" | "American" | "Mountain West" | "Pac-12" | "Big 12" | "SEC" | "Big Ten" | "Sun Belt" | "Conference USA" | "FBS Independents" | undefined
</script>

<script lang="ts">

    export let conference: cfbConference
    export let conferenceFilter: cfbConference

    function updateGameFilter(newConferenceFilter: cfbConference){
        // Clear filters if same one is clicked twice
        if (conferenceFilter === newConferenceFilter) {
            conferenceFilter = undefined
        } else {
            conferenceFilter = newConferenceFilter
        }
    }
</script>

<button class="btn btn-sm variant-filled-tertiary" 
    on:click={() => {updateGameFilter(conference)}}
    class:!variant-filled-primary={conferenceFilter === conference}>
    {conference}
</button>