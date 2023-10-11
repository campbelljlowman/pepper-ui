<script lang="ts">
    import "../app.css";
    import { invalidate } from '$app/navigation'
    import { onMount } from 'svelte'

    export let data

    let { supabase, session } = data
    $: ({ supabase, session } = data)

    onMount(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, _session) => {
            if (_session?.expires_at !== session?.expires_at) {
                invalidate('supabase:auth')
            }
        })
        return () => subscription.unsubscribe()
    });
</script>

<h1 class="flex items-center justify-between w-full whitespace-nowrap h-20 text-2xl font-bold">
    <a href='/'>Pepper Sports</a>
    <nav class="flex justify-center w-full">
        <a href='/NFL'>NFL</a>
        <a href='/CFB'>CFB</a>
        <a href='/NBA'>NBA</a>
        <a href='/MLB'>MLB</a>
        <a href='/NHL'>NHL</a>
        <a href='/MLS'>MLS</a>
        <a href='/F1'>F1</a>
    </nav>
    <div class="m-2 p-1">
        <button>Sign up</button>
        <button>Login</button>
    </div>
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