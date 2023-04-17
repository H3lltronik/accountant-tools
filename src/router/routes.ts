import DiotBatchUpload from '@/modules/DiotBatch/DiotBatch.svelte';
import DiotBatchUploadMenu from '@/modules/DiotBatch/MenuItem.svelte';

import ScriptsRepository from '@/modules/ScriptsRepository/ScriptsRepository.svelte';
import ScriptsRepositoryMenu from '@/modules/ScriptsRepository/MenuItem.svelte';

import type { RouteItem, Routes } from './types';



const batchUpload: RouteItem = {
    path: '/',
    enabled: true,
    component: DiotBatchUpload,
    menuItem: DiotBatchUploadMenu,
}

const scriptsRepository: RouteItem = {
    path: '/scripts-repository',
    enabled: true,
    component: ScriptsRepository,
    menuItem: ScriptsRepositoryMenu,
}


export const routes: Routes = {
    batchUpload,
    scriptsRepository,
}