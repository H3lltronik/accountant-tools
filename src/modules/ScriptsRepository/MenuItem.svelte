<script>
  import { Link } from "svelte-routing";
  import styles from "@/lib/Sidebar/Sidebar.module.scss";

  import { routes } from "@/router/routes";

  import Icon from "svelte-icons-pack/Icon.svelte";
  import HiIcon from "svelte-icons-pack/hi/HiSolidInbox";
</script>

<Link to={routes.scriptsRepository.path} class={styles.content__item}>
  <div class={styles.content__item__icon}>
    <Icon src={HiIcon} title="Repositorio de scripts" />
  </div>
  <span class={styles.content__item__text}>Repositorio de scripts</span>
</Link>
