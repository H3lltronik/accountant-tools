<script lang="ts">
    import { invoke } from "@tauri-apps/api/tauri";
    import { open } from '@tauri-apps/api/dialog'
  
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
  
  <main class="container">
    <div class="page">
      <label class="form__label" for="excel-upload">Excel batch</label>
      <button class="form__button" on:click={handleFileClick}>Elegir  archivo</button>
    </div>
  </main>
  
  <style>
  </style>
  