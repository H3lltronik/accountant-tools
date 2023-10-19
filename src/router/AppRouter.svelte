<script>
  import { routes } from "@/router/routes";
  import { Route, Router } from "svelte-navigator";

  const routesArray = Object.values(routes);
  console.log("routesArray", routesArray);
  export let url = "";

  $: console.log("url", url);
</script>

<Router basepath="/" {url}>
  <slot />
  <main class="w-full">
    {#each routesArray as route}
      <Route path={route.path} component={route.component} />
    {/each}
  </main>
</Router>
