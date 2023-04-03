<script lang="ts">
  import "@/styles/main.scss";
  import Sidebar from "./lib/Sidebar/Sidebar.svelte";
  import AppRouter from "./router/AppRouter.svelte";
  import AnchorClickInterceptor from "./utils/AnchorClickInterceptor.svelte";
</script>

<AppRouter>
  <Sidebar />
</AppRouter>

<AnchorClickInterceptor />