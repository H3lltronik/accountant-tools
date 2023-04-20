<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { onMount } from "svelte";
  import * as scripts from "./PdfExcelExtractor";
  import styles from "./PdfExcelExtractor.module.scss";
  import * as store from "./store";
  import { get } from 'svelte/store';
  import PdfViewerInstructions from "./PdfViewerInstructions.svelte";
  import PdfViewerControls from "./PdfViewerControls.svelte";

  let htmlContents = "";
  onMount(async () => {
    const htmlContents = await invoke("test_pdf", { path: get(store.convertedFile) });
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

    setTimeout(() => store.makeColumn("Test"), 1000);
  });

  
</script>

<PdfViewerInstructions />
<hr />

<div id="html-file-wrapper" class={styles.html_file_wrapper}>
  <PdfViewerControls />

  <div id="html-file" class={styles.html_file} />
</div>

<style>
  
</style>
