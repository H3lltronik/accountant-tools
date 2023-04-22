<script lang="ts">
  import * as store from "../store";
  import { get } from "svelte/store";
  import * as scripts from "../PdfExcelExtractor";
  import styles from "../PdfExcelExtractor.module.scss";
  import SortList from 'svelte-sortlist'

  import Icon from "svelte-icons-pack/Icon.svelte";
  import HiSolidZoomIn from "svelte-icons-pack/hi/HiSolidZoomIn";
  import HiSolidZoomOut from "svelte-icons-pack/hi/HiSolidZoomOut";
  import HiSolidExit from "svelte-icons-pack/hi/HiSolidArrowCircleLeft";
  import HiSolidDefine from "svelte-icons-pack/hi/HiSolidPencil";
  import HiSolidEye from "svelte-icons-pack/hi/HiSolidEye";
  import HiSolidFinish from "svelte-icons-pack/hi/HiSolidCheckCircle";

  import DefineColumnsModal from "../Modals/ManageColumns/Modal.svelte";
  import PreviewModal from "../Modals/Preview/Modal.svelte";
  import { onMount } from "svelte";

  let selectedColumn: Column | null = null;
  store.workingColumnIdx.subscribe(() => {
    selectedColumn = store.getSelectedColumn();
  });
  let columns = [];
  store.columns.subscribe(() => {
    columns = get(store.columns);
    selectedColumn = store.getSelectedColumn();
  });

  const handleGoBack = async () => {
    const confirm = await window.confirm("¿Estas seguro de que quieres salir? Se perderan los cambios");
    console.log("confirm", confirm)

    if (confirm) {
      store.reset();
      store.step.set(store.STEPS.SELECT_FILE);
    }
  };

  const handleDefineColumns = () => {
    store.columnsModalOpen.set(true);
  };

  const handlePreview = () => {
    store.previewModalOpen.set(true);
  };

  onMount(async () => {
    scripts.enableNumberShortcuts();
  })
</script>

<DefineColumnsModal />
<PreviewModal />

<div class={styles.pdf_extractor_controls__container}>
  <div class={styles.pdf_extractor_controls}>
    <button
      class="form__button form__button--smaller"
      on:click={handleDefineColumns}
    >
      <Icon src={HiSolidDefine} title="Definir columnas" />
      <span>Definir columnas</span>
    </button>
    <button
      class="form__button form__button--primary form__button--smaller"
      on:click={handlePreview}
    >
      <Icon src={HiSolidEye} title="Ver progreso" />
      <span>Ver progreso</span>
    </button>
    <!-- <button
      class="form__button form__button--smaller form__button--primary"
      on:click={handleGoBack}
    >
      <Icon src={HiSolidFinish} title="Terminar extraccion" />
      <span>Terminar</span>
    </button> -->
  </div>

  {#if selectedColumn !== null && selectedColumn !== undefined}
    <div class={`${styles.pdf_extractor_controls} ${styles.pdf_extractor_controls__text}`}>
      <div>
        <span>Llenando columna: </span>
        <strong style={`background-color: ${selectedColumn.color.backgroundColor}; color: ${selectedColumn.color.textColor}`}>
            {selectedColumn.name}
        </strong>
      </div>
    </div>

    <div class={styles.pdf_extractor_controls__text}>Filas: {selectedColumn.values.length}</div>

    <span>Atajos:</span>
    <SortList bind:list={columns} let:item let:index>
      <div class={styles.pdf_extractor_controls__text} style={`background-color: ${item.color.backgroundColor}; color: ${item.color.textColor}`}>
        [{index+1}] {item.name} ({item.values.length})
      </div>
    </SortList>
    <!-- {#each columns as column, i}
      <div class={styles.pdf_extractor_controls__text} style={`background-color: ${column.color.backgroundColor}; color: ${column.color.textColor}`}>
        [{i+1}] {column.name} ({column.values.length})
      </div>
    {/each} -->
  {/if}

</div>

<div class={styles.html_file_controls__container}>
  <div class={styles.html_file_controls}>
    <button class="form__button form__button--smaller" on:click={scripts.zoomIn}>
      <Icon src={HiSolidZoomIn} title="Zoom in" />
      <span>Zoom In</span>
    </button>
    <button
      class="form__button form__button--smaller"
      on:click={scripts.restartZoom}
    >
      <Icon src={HiSolidZoomOut} title="Zoom Restart" />
      <span>Reiniciar Zoom</span>
    </button>
    <button
      class="form__button form__button--smaller form__button--danger"
      on:click={handleGoBack}
    >
      <Icon src={HiSolidExit} title="Terminar extraccion" />
      <span>Regresar</span>
    </button>
  </div>
</div>
