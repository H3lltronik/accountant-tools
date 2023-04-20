<script lang="ts">
  import PageLayout from "@/lib/Layout/PageLayout.svelte";
  import PdfViewer from "./PdfViewer.svelte";
  import Home from "./Home.svelte";
  import { step } from "./store";

  
</script>

<PageLayout title="Extractor PDF a Excel">
  <h3>
    <span>En esta seccion</span>
  </h3>

  <div class="mt-5" />
  <hr />

  {#if $step === 1}
  <PdfViewer />
  {:else}
    <Home />
  {/if}

</PageLayout>