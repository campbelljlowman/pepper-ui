<script>
    import "../app.css";
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