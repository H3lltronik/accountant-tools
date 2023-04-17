<script>
// @ts-nocheck

  import { Link } from "svelte-routing";
  import styles from "@/lib/Sidebar/Sidebar.module.scss";

  import { routes } from "@/router/routes";

  import Icon from "svelte-icons-pack/Icon.svelte";
  import HiSolidUpload from "svelte-icons-pack/hi/HiSolidUpload";
</script>

<Link to={routes.batchUpload.path} class={styles.content__item} data-type="route_link">
  <div class={styles.content__item__icon}>
    <Icon src={HiSolidUpload} title="Carga batch" />
  </div>
  <span class={styles.content__item__text}>Carga Batch DIOT</span>
</Link>
