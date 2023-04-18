<script>
  import styles from "./Sidebar.module.scss";
  import SidebarButton from "./SidebarButton.svelte";

  import { isSidebarOpened } from "@/store/sidebar.store";
  import { routes } from "@/router/routes";

  const sidebarItems = Object.values(routes);

  function dispatchClick() {
    isSidebarOpened.update(value => false);
  }
</script>

<aside class={`${styles.sidebar} ${$isSidebarOpened? '' : styles['sidebar--shrunk']}`}>
  <div>
    <header class={`${styles.sidebar__header}`}>
      <div class={`${styles.sidebar__header__image}`}>
        <!-- <img  src={logo} alt=""> -->
      </div>
      <SidebarButton/>
    </header>
    <div class={styles.content}>
  
      {#each sidebarItems as { menuItem }}
        <svelte:component this={menuItem} />
      {/each}
      
    </div>
  
  </div>
</aside>
<div class={`${styles.sidebar__outside} ${$isSidebarOpened? '' : styles['sidebar__outside--shrunk']}`} on:click={dispatchClick}></div>