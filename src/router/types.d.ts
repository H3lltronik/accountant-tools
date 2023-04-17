import type { SvelteComponent } from 'svelte';

interface RouteItem {
    path: string;
    enabled: boolean;
    component: typeof SvelteComponent;
    menuItem: typeof SvelteComponent;
}

interface Routes {
    [key: string]: RouteItem;
}