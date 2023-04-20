<script>
  import * as store from "../../store";
  import { createEventDispatcher } from "svelte";
  import Icon from "svelte-icons-pack/Icon.svelte";
  import HiSolidUpload from "svelte-icons-pack/hi/HiSolidInformationCircle";
  import HiSolidCross from "svelte-icons-pack/hi/HiSolidTrash";
  import HiSolidAdd from "svelte-icons-pack/hi/HiSolidPlay";

  export let message = "Hi";
  let columns = [];

  store.columns.subscribe((value) => {
    console.log("updating columns")
    columns = value;
  });

  const doClosePopup = () => {
    store.columnsModalOpen.set(false);
  };

  const addColumn = () => {
    const randomWord = Math.random().toString(36).substring(2, 10);
    store.makeColumn(randomWord);
  };

  const handleSelectWorkingColumn = (e) => {
    const column = e.target.closest(".column");
    const columnId = column.dataset.columnId;
    store.selectColumn(columnId);
  };

  const handleRemoveColumn = (e) => {
    const column = e.target.closest(".column");
    const columnId = column.dataset.columnId;
    store.removeColumn(columnId);
  };

  const handleNameClick = (e) => {
    const nameEl = e.target;
    const columnEl = nameEl.closest(".column");
    const columnId = columnEl.dataset.columnId;
    const column = columns.find((c) => c.id === columnId);
    if (!column) return;

    const oldName = column.name;
    nameEl.contentEditable = true;
    nameEl.focus();

    nameEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const newName = nameEl.textContent.trim();
        console.log(newName);
        if (newName && newName !== oldName) {
          store.editColumn(columnId, newName);
        }
        nameEl.contentEditable = false;
      }
    });

    nameEl.addEventListener("blur", (event) => {
      const newName = nameEl.textContent.trim();
      console.log(newName);
      if (newName && newName !== oldName) {
        store.editColumn(columnId, newName);
      }
      nameEl.contentEditable = false;
    });
  };
</script>

<div>
  <i><Icon src={HiSolidUpload} title="Columnas" /></i>
  <h2>Columnas</h2>
</div>

<div class="columns">
  {#each columns as column}
    <div
      class="column"
      data-column-id={column.id}
      style={`background-color: ${column.color.backgroundColor}`}
    >
      <h3 style={`color: ${column.color.textColor}`} on:click={handleNameClick}>
        {column.name}
      </h3>
      <button class="form__button form__button--smaller form__button--danger" on:click={handleRemoveColumn}>
        <Icon src={HiSolidCross} title="Remover" />
      </button>
      <button class="form__button form__button--smaller form__button--primary" on:click={handleSelectWorkingColumn}>
        <Icon src={HiSolidAdd} title="Llenar esta columna" />
      </button>
    </div>
  {/each}
</div>


<nav>
  <button class="form__button" on:click={doClosePopup}>Cerrar</button>
  <button class="form__button form__button--primary" on:click={addColumn}>Agregar</button>
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
