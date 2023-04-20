<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { onMount } from "svelte";
  import * as scripts from "./PdfExcelExtractor";

  import Icon from "svelte-icons-pack/Icon.svelte";
  import HiIcon from "svelte-icons-pack/hi/HiSolidPuzzle";
  import { STEPS, convertedFile, step } from "./store";

  let htmlContents = "";

  onMount(async () => {
    // "./assets/pdf.html"
    const htmlContents = await invoke("test_pdf", { path: $convertedFile });
    const htmlFile = document.getElementById("html-file") as HTMLElement;
    htmlFile.addEventListener("mousedown", scripts.onMouseDown);
    htmlFile.addEventListener("mousemove", scripts.onMouseMove);
    htmlFile.addEventListener("mouseup", scripts.onMouseUp);
    htmlFile.addEventListener("onmouseout", scripts.onMouseLeave);
    htmlFile.innerHTML = htmlContents;

    Array.from(htmlFile.querySelectorAll("div.pc")).map((x) =>
      x.classList.add("opened")
    );

    scripts.wrapTextNodes(document.getElementById("page-container"));
  });

  const handleGoBack = () => {
    step.set(STEPS.SELECT_FILE);
  };
</script>

<div id="html-file-wrapper">
  <div class="html-file-controls">
    <button
      class="form__button form__button--smaller"
      on:click={scripts.zoomIn}
    >
      <Icon src={HiIcon} title="Extractor PDF a Excel" />
      <span>Zoom In</span>
    </button>
    <button class="form__button form__button--smaller" on:click={scripts.restartZoom}>Reiniciar</button>
    <button class="form__button form__button--smaller form__button--danger" on:click={handleGoBack}>Regresar</button>
  </div>

  <div id="html-file" />
</div>

<style>
  #html-file-wrapper {
    height: 100%;
    overflow: hidden;
    position: relative;
    width: 100%;
  }
  #html-file {
    height: 100%;
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
