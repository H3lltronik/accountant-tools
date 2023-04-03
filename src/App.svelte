<script lang="ts">
  import "@/styles/main.scss";
  import Sidebar from "./lib/Sidebar/Sidebar.svelte";
  import AppRouter from "./router/AppRouter.svelte";
</script>

<main class="container">
  <AppRouter>
    <Sidebar />
  </AppRouter>
</main>