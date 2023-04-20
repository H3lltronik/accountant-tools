<script>
    import styles from "../PdfExcelExtractor.module.scss";

    export let opened = true;

    const toggleOpen = () => { opened = !opened; }
</script>

<div class={styles.title}>
    <h3 >Instrucciones:</h3>
    <button class="form__button form__button--smaller" on:click={toggleOpen}>
        {#if opened}
            <span>Ocultar</span>
        {:else}
            <span>Mostrar</span>
        {/if}
    </button>
</div>
<div class={`${opened? styles.instructions : styles['instructions--hidden']}` }>
  <ol>
    <li>
      <span>Haz click en "Definir columnas"</span>
      <ul>
        <li>Ingresa las columnas que tendra el Excel resultante al ser exportado</li>
      </ul>
    </li>
    <li>
      <span>Haz click en los nodos de texto que cambian de color al pasar el mouse por encima de ellos.</span>
      <ul>
        <li>Ingresa las columnas que tendra el Excel resultante al ser exportado</li>
      </ul>
    </li>

    <li>
      <span>Seleccione POR COLUMNA todos los elementos que pertenezcan a la columa en progreso</span>
    </li>

    <li>
      <span>Cuando termine de seleccionar, haga click en "Ver progeso" en donde podras descargar tu Excel</span>
    </li>
    
  </ol>

  <div class="">Atajos:</div>
  <br>
  <div class=""><i>CTRL + Z</i> -> <strong>Retroceder seleccion</strong></div>
  <div class=""><i>0 - 9</i> -> <strong>Seleccion de columna(s)</strong></div>
</div>