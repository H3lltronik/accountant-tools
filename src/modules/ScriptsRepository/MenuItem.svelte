<script>
  // @ts-nocheck
  import { Link } from "svelte-navigator";
  import styles from "@/lib/Sidebar/Sidebar.module.scss";

  import { routes } from "@/router/routes";

  import Icon from "svelte-icons-pack/Icon.svelte";
  import HiIcon from "svelte-icons-pack/hi/HiSolidInbox";

  import { isSidebarOpened } from "@/store/sidebar.store";
</script>

<Link to={routes.scriptsRepository.path} class={styles.content__item} data-type="route_link" on:click={ () => isSidebarOpened.set(false) }>
  <div class={styles.content__item__icon}>
    <Icon src={HiIcon} title="Repositorio de scripts" />
  </div>
  <span class={styles.content__item__text}>Repositorio de scripts</span>
</Link>
