<script>
  import { Link } from "svelte-routing";
  import styles from "./Sidebar.module.scss";
  import SidebarButton from "./SidebarButton.svelte";
  import logo from '@/images/218_Made-in-Abyss_logo_V1.webp'

  import Icon from "svelte-icons-pack/Icon.svelte";
  import HiSolidUpload from "svelte-icons-pack/hi/HiSolidUpload";

  import { isSidebarOpened } from "@/store/sidebar.store";
  import { routes } from "@/router/routes";
</script>

<div class={`${styles.sidebar} ${$isSidebarOpened? '' : styles['sidebar--shrunk']}`}>
  <header class={`${styles.sidebar__header}`}>
    <div class={`${styles.sidebar__header__image}`}>
      <img  src={logo} alt="">
    </div>
    <SidebarButton/>
  </header>
  <div class={styles.content}>

    <Link to={routes.batchUpload.path} class={styles.content__item}>
      <div class={styles.content__item__icon}>
        <Icon src={HiSolidUpload} title="Carga batch"/>
      </div>
      <span class={styles.content__item__text}>Carga Batch DIOT</span>
    </Link>
    
  </div>
</div>
