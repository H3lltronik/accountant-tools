<script>
  import styles from "./Sidebar.module.scss";
  import SidebarButton from "./SidebarButton.svelte";
  import logo from '@/images/218_Made-in-Abyss_logo_V1.webp'

  import { isSidebarOpened } from "@/store/sidebar.store";
  import { routes } from "@/router/routes";

  const sidebarItems = Object.values(routes);
</script>

<div class={`${styles.sidebar} ${$isSidebarOpened? '' : styles['sidebar--shrunk']}`}>
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
