<script>
  import { isAppLoading } from "@/store/app.store";
  import Icon from "svelte-icons-pack/Icon.svelte";
  import HiIcon from "svelte-icons-pack/hi/HiSolidCog";
  import styles from "./PageLayout.module.scss";

  export let title = "";
</script>

<div class={styles.page}>
  <header class={styles.page__header}>
    <div class={styles.page__header__title}>
      <h1 tabindex="-1" class={styles.page__title}>{title}</h1>
    </div>

    <nav class="border-l-2 h-full flex items-center justify-center w-16">
      <ul>
        <li>
          <button>
            <Icon src={HiIcon} title="Carga batch" />
          </button>
        </li>
      </ul>
    </nav>
  </header>

  <section class={`${styles.page__content} flex flex-col`}>
    <slot />
  </section>

  {#if $isAppLoading}
    <div class={styles.page__loader}>
      <div class={styles.page__loader__icon}>
        <div class={styles.page__loader__icon__bar} />
        <div class={styles.page__loader__icon__bar} />
        <div class={styles.page__loader__icon__bar} />
      </div>
    </div>
  {/if}
</div>
