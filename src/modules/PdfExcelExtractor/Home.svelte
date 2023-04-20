<!-- select a pdf file section -->
<script>
  import * as scripts from "./PdfExcelExtractor";
  import { selectedFile } from "./store";

  let selected = $selectedFile;
  const handleSelectFile = async () => {
    const filters = [{ name: "PDF File", extensions: ["pdf"] }];
    selected = await scripts.handleSelectFile({ filters });
    selectedFile.set(selected);
  };

  const handleContinue = () => {
    scripts.goToStepTwo($selectedFile);
  };
</script>

<h3>
  <span>En esta seccion podras extraer el contenido de texto de un PDF a un archivo de Excel a tu gusto</span>
</h3>

<hr />
<div class="mt-5" />
<h2>Selecciona el PDF</h2>

{#if selected !== null && selected !== undefined && selected !== ""}
  <p>El archivo seleccionado es: {selected}</p>
{/if}

<button class="form__button" on:click={handleSelectFile}>Seleccionar</button>
{#if selected !== null && selected !== undefined && selected !== ""}
  <button class="form__button form__button--primary" on:click={handleContinue}
    >Continuar</button
  >
{/if}
