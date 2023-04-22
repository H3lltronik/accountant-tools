<script>
  import { isAppLoading } from '@/store/app.store';
    import styles from './PageLayout.module.scss';
    import Icon from "svelte-icons-pack/Icon.svelte";
    import HiIcon from "svelte-icons-pack/hi/HiSolidCog";

    export let title = '';
</script>

<div class={styles.page}>
    <header class={styles.page__header}>
        <div class={styles.page__header__title}>
            <h1 tabindex="-1" class={styles.page__title}>{title}</h1>
        </div>

        <nav class={styles.page__header__options}>
            <ul>
                <li>
                    <button>
                        <Icon src={HiIcon} title="Carga batch" />
                    </button>
                </li>
            </ul>
        </nav>
    </header>

    <section class={styles.page__content}>
        <slot />
    </section>

    {#if $isAppLoading}
        <div class={styles.page__loader}>
            <div class={styles.page__loader__icon}>
                <div class={styles.page__loader__icon__bar}></div>
                <div class={styles.page__loader__icon__bar}></div>
                <div class={styles.page__loader__icon__bar}></div>
            </div>
        </div>
    {/if}

</div>