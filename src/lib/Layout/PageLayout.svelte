<script>
    import styles from './PageLayout.module.scss';
    import Icon from "svelte-icons-pack/Icon.svelte";
    import HiSolidUpload from "svelte-icons-pack/hi/HiSolidUpload";

    export let title = '';
</script>

<div class={styles.page}>
    <header class={styles.page__header}>
        <div class={styles.page__header__title}>
            <h1 class={styles.page__title}>{title}</h1>
        </div>

        <nav class={styles.page__header__options}>
            <ul>
                <li>
                    <Icon src={HiSolidUpload} title="Carga batch" />
                </li>
            </ul>
        </nav>
    </header>

    <section class={styles.page__content}>
        <slot />
    </section>
</div>