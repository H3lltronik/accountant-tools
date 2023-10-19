<script>
  // @ts-nocheck

  import styles from "@/lib/Sidebar/Sidebar.module.scss";
  import { Link } from "svelte-navigator";

  import { routes } from "@/router/routes";

  import Icon from "svelte-icons-pack/Icon.svelte";
  import HiSolidUpload from "svelte-icons-pack/hi/HiSolidUpload";

  import { isSidebarOpened } from "@/store/sidebar.store";
  isSidebarOpened.set(false);
</script>

<Link
  to={routes.chatbot.path}
  class={styles.content__item}
  data-type="route_link"
  on:click={() => isSidebarOpened.set(false)}
>
  <div class={styles.content__item__icon}>
    <Icon src={HiSolidUpload} title="Chatbot" />
  </div>
  <span class={styles.content__item__text}>Chatbot</span>
</Link>
