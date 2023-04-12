<script lang="ts">
  import { isModalOpened, openModal } from "@/store/modal.store";
  import * as scripts from "./DiotBatch";

  let selectedFolder = "";
  let selectedFile = "";

  const handleSelectFolder = async () => {
    selectedFolder = await scripts.handleSelectFolder();
  };

  const handleSelectFile = async () => {
    const filters = [{ name: 'Excel Files', extensions: ['xlsx', 'xls'] }];
    selectedFile = await scripts.handleSelectFile({ filters });
  };

  const handleBeginProccess = async () => {
    if (selectedFolder === "" || selectedFile === "") {
      openModal({ message: "Selecciona un archivo y una carpeta", title: "Error", type: "error" });
      return;
    }
    await scripts.handleBeginProcess(selectedFolder, selectedFile);
  };

</script>

<div class="page">
  <h1>Carga batch DIOT</h1>
  <p>
    <span
      >En esta seccion podras convertir tu Excel a un txt listo para ser subido
      al programa
    </span>
    <a href="https://tramitesdigitales.sat.gob.mx/InformativaDeTerceros.Internet/Login.aspx?ReturnUrl=%2fInformativaDeTerceros.Internet%2fDefault.aspx">DIOT</a>
  </p>

  <div class="mt-5"></div>

  <p>¿Aun no estas seguro de como hacerlo? Revisa este tutorial</p>
  {#if selectedFolder !== ""}
    <p>El archivo se guardara en: {selectedFolder}</p>
  {/if}
  {#if selectedFile !== ""}
    <p>El archivo a convertir es: {selectedFile}</p>
  {/if}
  <button class="form__button" on:click={handleSelectFolder}>Elegir destino</button>
  <button class="form__button" on:click={handleSelectFile}>Elegir archivo</button>
  <button class="form__button form__button--primary" on:click={handleBeginProccess}>Convertir</button>
</div>
