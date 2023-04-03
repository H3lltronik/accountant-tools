<script lang="ts">
  import Sidebar from "./lib/Sidebar/Sidebar.svelte";
  import styles from "./styles/test.module.scss";
  import { invoke } from "@tauri-apps/api/tauri";
  import { open } from '@tauri-apps/api/dialog'

  async function handleFileClick() {
    try {
      const path = await open();
      const result = await invoke("excel", { fullPath: path });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
</script>

<main class="container">
  <Sidebar />

  <div class={styles.form_container}>
    <label class={styles.form_container__group__label} for="excel-upload"
      >Excel batch</label
    >
    <!-- <input
      class={styles.form_container__group__item__input}
      type="file"
      name="excel-upload"
      id="excel-upload"
      on:change={handleFileChange}
    /> -->
    <button on:click={handleFileClick}>Elegir  archivo</button>
  </div>
</main>

<style>
</style>
