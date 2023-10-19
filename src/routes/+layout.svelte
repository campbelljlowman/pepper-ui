<script lang="ts">
    import "../app.css";
    import { invalidate } from '$app/navigation'
    import { onMount } from 'svelte'
    import { AppShell, AppBar } from '@skeletonlabs/skeleton';
    import { LightSwitch } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';  

    export let data

    const sports = ['NFL', 'CFB', 'NBA', 'NHL', 'MLB'] // MLS, F1?

    let { supabase, supabaseAuthSession } = data
    $: ({ supabase, supabaseAuthSession } = data)

    onMount(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, _session) => {
            if (_session?.expires_at !== supabaseAuthSession?.expires_at) {
                invalidate('supabase:auth')
            }
        })
        return () => subscription.unsubscribe()
    });

    const logout = async () => {
        supabase.auth.signOut()
    }
</script>

<div class="mt-20"></div>
<AppBar gridColumns='grid-cols-3' slotDefault="place-self-center" slotTrail="place-content-end" class="fixed w-full top-0 left-0 bg-surface-100-800-token h-20">
    <svelte:fragment slot="lead"><a class="h2 text-primary-500 font-semibold" href='/'>Pepper Sports</a></svelte:fragment>

    <nav class="flex gap-2">
        {#each sports as sport}
            <a href='/{sport}' class="btn variant-filled" class:variant-filled-primary={$page.url.pathname === '/' + sport}>{sport} </a>
        {/each}
    </nav>

    <svelte:fragment slot="trail">
        <LightSwitch />
        {#if !data.supabaseAuthSession}
            <div class="btn-group variant-ringed-primary">
                <a href='/auth/sign-up'>Sign up</a>
                <a href='/auth/login'>Login</a>
            </div>
        {:else}
            <button class="btn variant-ringed" on:click={logout}>Logout</button>
        {/if}
    </svelte:fragment>
</AppBar>

<slot />
