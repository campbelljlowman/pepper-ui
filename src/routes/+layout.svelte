<script lang="ts">
    import "../app.css";
    import { invalidate } from '$app/navigation'
    import { onMount } from 'svelte'
    import { AppShell, AppBar } from '@skeletonlabs/skeleton';

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

<AppShell>
	<svelte:fragment slot="header">
        <AppBar gridColumns='grid-cols-3' slotDefault="place-self-center" slotTrail="place-content-end">
            <svelte:fragment slot="lead"><a class="h2 text-primary-500 font-semibold" href='/'>Pepper Sports</a></svelte:fragment>

            <nav class="btn-group variant-filled">
                <a href='/NFL'>NFL</a>
                <a href='/CFB'>CFB</a>
                <a href='/NBA'>NBA</a>
                <a href='/NHL'>NHL</a>
                <a href='/MLB'>MLB</a>
                <!-- <a href='/MLS'>MLS</a>
                <a href='/F1'>F1</a> -->
            </nav>

            <svelte:fragment slot="trail">
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
    </svelte:fragment>
	<svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment>
	<svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment>
	<!-- <svelte:fragment slot="pageHeader"></svelte:fragment>	 -->
    <!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
	<svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>
