<script lang="ts">
    import type { AuthError } from '@supabase/supabase-js';
    import { goto } from '$app/navigation';

    export let data;
    let { supabase } = data
    $: ({ supabase } = data)

    let email: string
    let password: string
    let loginError: AuthError | null = null

    const login = async () => {
        let { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        loginError = error
        if (loginError){
            console.log(loginError)
        } else {
            goto('/')
        }
        
    }

</script>

<form on:submit={login}>
    <input name='email' bind:value={email} />
    <input name='password' type="password" bind:value={password} />
    <button >Login</button>
</form>
{#if loginError !== null}
    <p>{loginError.message}</p>
{/if}