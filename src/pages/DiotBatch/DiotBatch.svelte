<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { open } from "@tauri-apps/api/dialog";

  async function handleFileClick() {
    try {
      const path = await open();
      if (!path) return;
      const result = await invoke("excel", { fullPath: path });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
</script>

<div class="page">
  <h1>Carga batch DIOT</h1>
  <p>
    <span
      >En esta seccion podras convertir tu Excel a un txt listo para ser subido
      al programa
    </span>
    <a href="https://www.sat.gob.mx/aplicacion/07152/descarga-e-instala-en-tu-equipo-de-computo-el-programa-dim-y-su-anexo-5.">DIOT</a>
  </p>

  <div class="mt-5"></div>

  <p>¿Aun no estas seguro de como hacerlo? Revisa este tutorial</p>
  <button class="form__button" on:click={handleFileClick}>Elegir archivo</button
  >
</div>
