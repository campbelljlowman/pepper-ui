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

<!-- TODO: add error class on login error -->
<div class="flex justify-center items-center h-[80vh] w-full">
    <form class="flex flex-col items-center gap-3 card w-1/4 p-4" on:submit={login}>
        <h1 class="h3">Login</h1>
        <label class="label w-full">
            <p>Email</p>
            <input class="input" name='email' type="text" placeholder="Email" bind:value={email} class:input-error={loginError !== null}/>
        </label>
        <label class="label w-full">
            <p>Password</p>
            <input class="input" name='password' type="password" placeholder="Password" bind:value={password} class:input-error={loginError !== null}/>
        </label>
        <button class="btn variant-filled-primary">Login</button>

        {#if loginError !== null}
            <p class="text-error-500">{loginError.message}</p>
        {/if}
    </form>
</div>
