<script>
    import { Router, Link, Route } from "svelte-routing";
    import { routes } from "@/router/routes";

    const routesArray = Object.values(routes);;
    export let url = "";

    const handleClick = function () {
        alert("as")
    }
</script>

<Router basepath="/" url="{url}">
    <slot></slot>
    <main class="container">
        {#each routesArray as route}
            <Route path={route.path} component="{route.component}" on:click={handleClick} />
        {/each}
    </main>
</Router>