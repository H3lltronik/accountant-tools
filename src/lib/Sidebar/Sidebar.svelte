<!-- Sidebar.svelte -->
<script>
  import { onMount } from "svelte";
  import styles from "./Sidebar.module.scss";
  import SidebarButton from "./SidebarButton.svelte";
  import logo from '@/images/218_Made-in-Abyss_logo_V1.webp'

  import { isSidebarOpened } from "@/store/sidebar.store";
</script>

<div class={`${styles.sidebar} ${$isSidebarOpened? '' : styles['sidebar--shrunk']}`}>
  <!-- <button on:click={toggleSidebar}>Toggle</button> -->
  <header class={`${styles.sidebar__header}`}>
    <!-- <h2 class={`${styles.sidebar__header__title}`}>Herramientas</h2> -->
    <div class={`${styles.sidebar__header__image}`}>
      <img  src={logo} alt="">
    </div>
    <SidebarButton/>
  </header>
  <div class={styles.content}>
    <div class={styles.content__item}>{$isSidebarOpened? 'Opened':'Closed'}</div>
  </div>
</div>
