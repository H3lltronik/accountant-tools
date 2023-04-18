<script lang="ts">
  import hljs from "highlight.js";
  import massiveDownloadLocation from "./massiveDownloadScript.txt";
  import { addToast } from "@/lib/Sidebar/Toasts/toasts";
  import PageLayout from "@/lib/Layout/PageLayout.svelte";
  import {tauri} from "@tauri-apps/api";
  let massiveDownloadScript = "";

  fetch(massiveDownloadLocation)
    .then((res) => {
      if (res.ok) {
        return res.text();
      } else {
        throw new Error("Failed to fetch script");
      }
    })
    .then((text) => {
      massiveDownloadScript = text;
      setTimeout(() => {
        hljs.highlightAll();
      }, 1000);
    })
    .catch((error) => {
      console.error(error);
    });

  function copyToClipboard(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        addToast({
            message: "Script copiado al portapapeles",
            type: "success",
            title: "Listo",
        });
      })
      .catch((err) => console.error("Error copying text: ", err));
  }
</script>

<PageLayout title="Repositorio de scripts">
  <h3>
    <span>En esta seccion encontraras un conjunto de scripts en Javascript para ser usados en el navegador</span>
  </h3>

  <div class="mt-5"></div>
  <hr />
  <!-- <pre><code class="language-javascript">{massiveDownloadScript}</code></pre> -->
  <div class="">{massiveDownloadScript}</div>

  <button on:click={() => copyToClipboard(massiveDownloadScript)} class="form__button form__button--primary">
      Copiar
  </button>
</PageLayout>
