<script>
    import { Router, Link, Route } from "svelte-routing";
    import { routes } from "@/router/routes";

    const routesArray = Object.values(routes);;
    export let url = "";
</script>

<Router basepath="/" url="{url}">
    <slot></slot>
    <main class="container">
        {#each routesArray as route}
            <Route path={route.path} component="{route.component}" />
        {/each}
    </main>
</Router>