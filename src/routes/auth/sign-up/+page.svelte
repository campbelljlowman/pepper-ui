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

<!-- <form on:submit={signUp}>
    <input name="email" bind:value={email}/>
    <input name="password" type="password" bind:value={password}/>
    <button>Sign up</button>
</form> -->


<!-- TODO: add error class on login error -->
<div class="flex justify-center items-center h-[80vh] w-full">
    <form class="flex flex-col items-center gap-3 card w-1/4 p-4" on:submit={signUp}>
        <h1 class="h3">Sign Up</h1>
        <label class="label w-full">
            <p>Email</p>
            <input class="input" name='email' type="text" placeholder="Email" bind:value={email} class:input-error={signUpError !== null}/>
        </label>
        <label class="label w-full">
            <p>Password</p>
            <input class="input" name='password' type="password" placeholder="Password" bind:value={password} class:input-error={signUpError !== null}/>
        </label>
        <button class="btn variant-filled-primary">Sign Up</button>

        {#if signUpError !== null}
            <p class="text-error-500">{signUpError.message}</p>
        {/if}
    </form>
</div>