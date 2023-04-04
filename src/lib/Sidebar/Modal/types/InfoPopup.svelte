<script>
  import { closeModal } from "@/store/modal.store";
  import Icon from "svelte-icons-pack/Icon.svelte";
  import HiSolidUpload from "svelte-icons-pack/hi/HiSolidInformationCircle";

  export let message = "Hi";

  const doClosePopup = () => {
    closeModal();
  };
</script>

<div>
    <i>
        <Icon src={HiSolidUpload} title="Carga batch"/>
    </i>
    <h2>{message}</h2>
</div>
<nav>
    <button class="form__button" on:click={doClosePopup}>Cerrar</button>
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

</style>
