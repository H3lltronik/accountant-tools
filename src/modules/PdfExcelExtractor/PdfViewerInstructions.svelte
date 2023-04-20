<script>
    import styles from "./PdfExcelExtractor.module.scss";

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
      <span>Una vez haya terminado de seleccionar todos los elementos de la columna, presiona ENTER para comenzar a llenar la siguiente columa</span>
      <ul>
        <li>Si presionas ENTER en la ultima columa que hayas elegido, se tomara como si haya presionado el boton de TERMINAR</li>
      </ul>
    </li>

    <li>
      <span>Cuando termine de seleccionar, haga click en "Terminar"</span>
    </li>
    
  </ol>

  <div class="">Si lo prefieres, tambien puedes eliminar manualmente el registro de algun elemento de manera manual al hacer click en "Ver progreso"</div>
  <br>
  <div class=""><i>CTRL + Z</i> -> <strong>Retroceder seleccion</strong></div>
  <div class=""><i>ENTER</i> -> <strong>Siguiente/Finalizar seleccion de columna(s)</strong></div>
</div>