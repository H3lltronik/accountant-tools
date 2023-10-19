import DiotBatchUpload from "@/modules/DiotBatch/DiotBatch.svelte";
import DiotBatchUploadMenu from "@/modules/DiotBatch/MenuItem.svelte";

import ScriptsRepositoryMenu from "@/modules/ScriptsRepository/MenuItem.svelte";
import ScriptsRepository from "@/modules/ScriptsRepository/ScriptsRepository.svelte";

import PdfExcelExtractorMenu from "@/modules/PdfExcelExtractor/MenuItem.svelte";
import PdfExcelExtractor from "@/modules/PdfExcelExtractor/PdfExcelExtractor.svelte";

import Chatbot from "@/modules/Chatbot/Chatbot.svelte";
import ChatbotMenu from "@/modules/Chatbot/MenuItem.svelte";

import type { RouteItem } from "./types";

const batchUpload: RouteItem = {
  path: "/",
  enabled: true,
  component: DiotBatchUpload,
  menuItem: DiotBatchUploadMenu,
};

const pdfExcelExtractor: RouteItem = {
  path: "/pdf-excel-extractor",
  enabled: true,
  component: PdfExcelExtractor,
  menuItem: PdfExcelExtractorMenu,
};

const scriptsRepository: RouteItem = {
  path: "/scripts-repository",
  enabled: true,
  component: ScriptsRepository,
  menuItem: ScriptsRepositoryMenu,
};

const chatbot: RouteItem = {
  path: "/chatbot",
  enabled: true,
  component: Chatbot,
  menuItem: ChatbotMenu,
};

function defineRoutes<T extends { [key: string]: RouteItem }>(routes: T): T {
  return routes;
}

export const routes = defineRoutes({
  batchUpload,
  scriptsRepository,
  pdfExcelExtractor,
  chatbot,
});
