<h1>
    <a href='/'>Pepper Sports</a>
    <nav>
        <a href='/NFL'>NFL</a>
        <a href='/CFB'>CFB</a>
        <a href='/NBA'>NBA</a>
        <a href='/MLB'>MLB</a>
        <a href='/NHL'>NHL</a>
        <a href='/MLS'>MLS</a>
        <a href='/F1'>F1</a>
    </nav>
</h1>
<slot />

<style>
    :root{
        /* font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; */
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        background-color: var(--background-color);
    }
    h1 {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        white-space: nowrap;
    }
    nav {
        display: flex;
        justify-content: center;
        width: 100%;
    } 
    a {
        float: left;
        margin: 0.5rem;
        padding: 0.25rem;
        text-decoration: none;
        color: var(--text-primary);
        border-radius: 12px;
    }
    a:hover {

        background-color: #c2c1c1;
    }

    :global(:root){
        --text-primary: #7f1717;
        --background-color: #b1b0b0;
    }
</style>