import DiotBatchUpload from '@/modules/DiotBatch/DiotBatch.svelte';
import DiotBatchUploadMenu from '@/modules/DiotBatch/MenuItem.svelte';

import ScriptsRepository from '@/modules/ScriptsRepository/ScriptsRepository.svelte';
import ScriptsRepositoryMenu from '@/modules/ScriptsRepository/MenuItem.svelte';

import PdfExcelExtractor from '@/modules/PdfExcelExtractor/PdfExcelExtractor.svelte';
import PdfExcelExtractorMenu from '@/modules/PdfExcelExtractor/MenuItem.svelte';

import type { RouteItem, Routes } from './types';



const batchUpload: RouteItem = {
    path: '/',
    enabled: true,
    component: DiotBatchUpload,
    menuItem: DiotBatchUploadMenu,
}

const pdfExcelExtractor: RouteItem = {
    path: '/pdf-excel-extractor',
    enabled: true,
    component: PdfExcelExtractor,
    menuItem: PdfExcelExtractorMenu,
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
    pdfExcelExtractor,
}