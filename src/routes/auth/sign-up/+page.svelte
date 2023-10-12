<script lang="ts">
    import type { AuthError } from '@supabase/supabase-js';
    import { goto } from '$app/navigation';

    export let data
    let { supabase } = data
    $: ({ supabase } = data)

    let email: string
    let password: string
    let signUpError: AuthError | null = null

    const signUp = async () => {
        let { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })

        signUpError = error
        if (signUpError) {
            console.log(signUpError);
        } else {
            goto('/')
        }
    }

    
</script>

<form on:submit={signUp}>
    <input name="email" bind:value={email}/>
    <input name="password" type="password" bind:value={password}/>
    <button>Sign up</button>
</form>

{#if signUpError !== null}
    <p>{signUpError.message}</p>
{/if}