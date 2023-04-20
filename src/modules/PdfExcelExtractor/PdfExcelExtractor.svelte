<script lang="ts">
  import PageLayout from "@/lib/Layout/PageLayout.svelte";
  import PdfViewer from "./PdfViewer/PdfViewer.svelte";
  import Home from "./Home.svelte";
  import { step } from "./store";

  
</script>

<PageLayout title="Extractor PDF a Excel">
  {#if $step === 1}
  <PdfViewer />
  {:else}
    <Home />
  {/if}

</PageLayout>