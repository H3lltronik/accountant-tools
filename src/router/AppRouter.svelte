<script>
    import { Router, Link, Route } from "svelte-routing";
    import { routes } from "./routes";

    const routesArray = Object.keys(routes).map((key) => routes[key]);
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