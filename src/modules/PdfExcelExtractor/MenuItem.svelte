<script>
  // @ts-nocheck
  import { Link } from "svelte-navigator";
  import styles from "@/lib/Sidebar/Sidebar.module.scss";

  import { routes } from "@/router/routes";

  import Icon from "svelte-icons-pack/Icon.svelte";
  import HiIcon from "svelte-icons-pack/hi/HiSolidPuzzle";

  import { isSidebarOpened } from "@/store/sidebar.store";
</script>

<Link to={routes.pdfExcelExtractor.path} class={styles.content__item} data-type="route_link" on:click={ () => isSidebarOpened.set(false) }>
  <div class={styles.content__item__icon}>
    <Icon src={HiIcon} title="Extractor PDF a Excel" />
  </div>
  <span class={styles.content__item__text}>Extractor PDF a Excel</span>
</Link>
