<script lang="ts">
  import PageLayout from "@/lib/Layout/PageLayout.svelte";
  import { openModal } from "@/store/modal.store";
  import * as scripts from "./DiotBatch";
  import TutorialModal from "./TutorialModal.svelte";

  let selectedFolder = "";
  let selectedFiles: string[] = [];
  let selectedFilesString = "";

  const handleSelectFolder = async () => {
    selectedFolder = await scripts.handleSelectFolder(
      "Selecciona la carpeta donde se guardaran los archivos"
    );
  };

  const handleSelectFile = async (append: Boolean) => {
    const filters = [{ name: "Excel Files", extensions: ["xlsx", "xls"] }];
    const _selectedFiles = (await scripts.handleSelectFile({
      filters,
      multiple: true,
    })) as string[];

    if (append) {
      selectedFiles = Array.from(
        new Set([...selectedFiles, ..._selectedFiles])
      );
    } else {
      selectedFiles = _selectedFiles;
    }

    if (Array.isArray(_selectedFiles)) {
      selectedFilesString = selectedFiles.join(",");
    }
  };

  const handleBeginProcess = async () => {
    if (
      selectedFolder === "" ||
      selectedFilesString === "" ||
      selectedFolder === null ||
      selectedFilesString === null ||
      selectedFolder === undefined ||
      selectedFilesString === undefined
    ) {
      openModal({
        message: "Selecciona un archivo y una carpeta",
        title: "Error",
        type: "error",
      });
      return;
    }
    await scripts.handleBeginProcess(selectedFolder, selectedFilesString);
  };

  let showTutorial = false;
  const toggleTutorial = () => {
    showTutorial = !showTutorial;
  };
</script>

<TutorialModal isOpen={showTutorial} on:close={toggleTutorial} />

<PageLayout title="Carga batch DIOT">
  <p>
    <span
      >En esta seccion podras convertir tu Excel a un txt listo para ser subido
      al programa
    </span>
    <a
      href="https://tramitesdigitales.sat.gob.mx/InformativaDeTerceros.Internet/Login.aspx?ReturnUrl=%2fInformativaDeTerceros.Internet%2fDefault.aspx"
      >DIOT</a
    >
  </p>

  <div class="mt-5" />

  <p>
    ¿Aun no estas seguro de como hacerlo? Revisa <button
      on:click={toggleTutorial}
      class="inline-btn">este tutorial</button
    >
  </p>
  {#if selectedFolder !== "" && selectedFolder !== null && selectedFolder !== undefined}
    <p>El archivo se guardara en: {selectedFolder}</p>
  {/if}
  {#if selectedFiles !== undefined && selectedFiles !== null && selectedFiles.length > 0}
    <p>Los archivos a convertir son:</p>
    <ul>
      {#each selectedFiles as file}
        <li>{file}</li>
      {/each}
    </ul>
  {/if}

  <div class="flex flex-col gap-2 items-center mt-2">
    <button class="form__button" on:click={handleSelectFolder}
      >Elegir destino</button
    >
    <button class="form__button" on:click={() => handleSelectFile(false)}
      >Elegir archivo</button
    >

    {#if selectedFiles.length > 0}
      <button class="form__button" on:click={() => handleSelectFile(true)}
        >Añadir archivos</button
      >
    {/if}

    <button
      class="form__button form__button--primary"
      on:click={handleBeginProcess}>Convertir</button
    >
  </div>
</PageLayout>
