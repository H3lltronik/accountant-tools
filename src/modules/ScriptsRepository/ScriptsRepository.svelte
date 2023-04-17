<script lang="ts">
  import hljs from "highlight.js";
  import massiveDownloadLocation from "./massiveDownloadScript.txt";
  import { addToast } from "@/lib/Sidebar/Toasts/toasts";
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

<div class="page">
  <h2>Descarga masiva</h2>
  <hr />
  <!-- <pre><code class="language-javascript">{massiveDownloadScript}</code></pre> -->
  <div class="">{massiveDownloadScript}</div>

    <button on:click={() => copyToClipboard(massiveDownloadScript)} class="form__button form__button--primary">
        Copiar
    </button>
    
</div>
