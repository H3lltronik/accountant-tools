<script>
  import Icon from "svelte-icons-pack/Icon.svelte";
  import AiOutlineMenu from "svelte-icons-pack/hi/HiSolidMenu";
  import HiOutlineCross from "svelte-icons-pack/hi/HiSolidX";

  import styles from "./Sidebar.module.scss";
  import { isSidebarOpened } from "@/store/sidebar.store";

  function dispatchClick() {
    isSidebarOpened.update(value => !value);
  }

</script>

<button on:click={dispatchClick} class={`form__button ${styles.sidebar__header__button}`}>
  <Icon
    src={$isSidebarOpened? HiOutlineCross : AiOutlineMenu}
    title="Alternar menú"
  />
</button>
