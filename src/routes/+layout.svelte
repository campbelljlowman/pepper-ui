<script lang="ts">
    import "../app.css";
    import { invalidate } from '$app/navigation'
    import { onMount } from 'svelte'

    export let data

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

<h1 class="flex items-center justify-between w-full whitespace-nowrap h-20 text-2xl font-bold">
    <a href='/'>Pepper Sports</a>
    <nav class="flex justify-center w-full">
        <a href='/NFL'>NFL</a>
        <a href='/CFB'>CFB</a>
        <a href='/NBA'>NBA</a>
        <a href='/NHL'>NHL</a>
        <a href='/MLB'>MLB</a>
        <a href='/MLS'>MLS</a>
        <a href='/F1'>F1</a>
    </nav>
    {#if !data.supabaseAuthSession}
        <div class="m-2 p-1">
            <a href='/auth/sign-up'>Sign up</a>
            <a href='/auth/login'>Login</a>
        </div>
    {:else}
        <div class="m-2 p-1">
            <button on:click={logout}>Logout</button>
        </div> 
    {/if}
</h1>
<slot />

<style>
    a {
        float: left;
        margin: 0.5rem;
        padding: 0.25rem;
        text-decoration: none;
        color: var(--text-primary);
        border-radius: 12px;
    }
    a:hover {
        background-color: var(--background-hover);
    }

</style>