<script>
  import * as commonScripts from "../../common";
  import { pickedExcel1, pickedExcel2 } from "../store";
  import styles from '../ExcelDiffer.module.scss'
  const filters = [{ name: "Excel Files", extensions: ["xlsx", "xls"] }];

  const handleSelectExcel1 = async () => {
    const selected = await commonScripts.handleSelectFile({ filters });
    pickedExcel1.set(selected);
  };
  const handleSelectExcel2 = async () => {
    const selected = await commonScripts.handleSelectFile({ filters });
    pickedExcel2.set(selected);
  };
  const handleNext = async () => {
  };
</script>

<div class="page">
  <h1>Excel Differ</h1>
  <p>
    <span>Esta seccion te permitira subir dos archivos Excel y comparar registros que no se encuentren en uno u otro dependiendo de la configuracion que desees.</span>
  </p>

  <div class="mt-5" />

  <p>¿Aun no estas seguro de como hacerlo? Revisa este tutorial</p>

  <section class={styles.excel_picker}>
    <button class="form__button" on:click={handleSelectExcel1}>Elegir Excel 1</button>
    <button class="form__button" on:click={handleSelectExcel2}>Elegir Excel 2</button>
</section>

  <button class="form__button form__button--primary"on:click={handleNext}>Convertir</button>
</div>
