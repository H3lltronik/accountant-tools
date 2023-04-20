<script lang="ts">
  import PageLayout from "@/lib/Layout/PageLayout.svelte";
  import { invoke } from "@tauri-apps/api/tauri";
  import { onMount } from "svelte";
  import * as scripts from './PdfExcelExtractor';

  let htmlContents = "";

  onMount(async () => {
    htmlContents = await invoke("test_pdf", { path: "./assets/pdf.html" });
    const htmlFile = document.getElementById("html-file");
    htmlFile.addEventListener("mousedown", scripts.onMouseDown);
    htmlFile.addEventListener("mousemove", scripts.onMouseMove);
    htmlFile.addEventListener("mouseup", scripts.onMouseUp);
    htmlFile.addEventListener("onmouseout", scripts.onMouseLeave);
    htmlFile.innerHTML = htmlContents

    Array.from(htmlFile.querySelectorAll("div.pc")).map((x) => x.classList.add("opened"));

    scripts.wrapTextNodes(document.getElementById("page-container"));
  });
</script>

<PageLayout title="Extractor PDF a Excel">
  <h3>
    <span>En esta seccion</span>
  </h3>

  <div class="mt-5" />
  <hr />

  <div id="html-file-wrapper">
    <div class="html-file-controls">
      <button on:click={scripts.zoomIn}>Zoom In</button>
      <button on:click={scripts.restartZoom}>Restart</button>
    </div>

    <div id="html-file" />
  </div>
</PageLayout>

<style>
  #html-file-wrapper {
    height: 100%;
    overflow: hidden;
    position: relative;
    width: 100%;
  }
  #html-file {
    min-height: calc(100vh - 160px);
    overflow: auto;
    position: relative;
    width: 100%;
    transform-origin: top left;
    transform: scale(1);
    cursor: grab;
  }

  #html-file:active {
    cursor: grabbing;
  }

  .html-file-controls {
    position: absolute;
    top: 0;
    right: 20px;
    z-index: 1000;
  }
  
</style>
