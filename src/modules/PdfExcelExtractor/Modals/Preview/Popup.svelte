<script>
  import * as store from "../../store";
  import Icon from "svelte-icons-pack/Icon.svelte";
  import HiSolidUpload from "svelte-icons-pack/hi/HiSolidInformationCircle";
  import { Sheet } from "svelte-sheets";
  import { convertToTableData } from "./script";

  export let message = "Hi";
  let appColumns = [];
  let data = [];

  store.columns.subscribe((value) => {
    appColumns = value;
    data = convertToTableData(appColumns);
  });

  const doClosePopup = () => {
    store.previewModalOpen.set(false);
  };

  const doExport = () => {
    
  };

  let columns = appColumns.map(x => ({ width: "100px" }));
  console.log(columns);
</script>

<div>
  <i><Icon src={HiSolidUpload} title="Columnas" /></i>
  <h2>Vista previa</h2>
</div>

<Sheet {columns} {data} />

<nav>
  <button class="form__button" on:click={doClosePopup}>Cerrar</button>
  <button class="form__button form__button--primary" on:click={doExport}>Exportar</button>
</nav>

<style>
  div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  h2 {
    margin: 0;
    margin-left: 10px;
  }
  nav {
    margin-top: 20px;
  }
  i {
    font-size: 40px;
  }
  .columns {
    gap: 10px;
    display: flex;
    margin-top: 30px;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  /* elevation */
  .column {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    padding: 0px 10px;
    gap: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
</style>
