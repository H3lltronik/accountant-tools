import { open, type OpenDialogOptions } from "@tauri-apps/api/dialog";
import { convertedFile, step, STEPS } from "./store";
import { invoke } from "@tauri-apps/api/tauri";
import * as store from "./store";
export const goToStepTwo = async (selectedPdfPath: String) => {
  const result = (await invoke("convert_pdf_to_html", {
    path: selectedPdfPath,
  })) as string;
  convertedFile.set(result);
  step.set(STEPS.PDF_HANDLING);
};

export function wrapTextNodes(node) {
  if (node.nodeType == Node.TEXT_NODE) {
    const span = document.createElement("span") as HTMLSpanElement;
    node.parentNode.insertBefore(span, node);
    span.classList.add("test-xd");
    span.style.zIndex = "100";
    span.addEventListener("click", handleValueClick);
    span.appendChild(node);
    let parent = span.parentNode as HTMLElement;
    while (parent !== null && parent.tagName !== "BODY") {
      parent.style.zIndex = "100";
      parent = parent.parentNode as HTMLElement;
    }
  } else {
    const children = node.childNodes;
    for (let i = 0, len = children.length; i < len; ++i) {
      wrapTextNodes(children[i]);
    }
  }
}

const handleValueClick = (e: MouseEvent) => {
  const color = store.getCurrentColor();
  if (!color) {
    addToast({
      title: "No working column",
      message: "Debes agregar una columna primero",
      type: "error",
    });
    return;
  }

  const target = e.target as HTMLElement;
  const elementValue = target.innerText;

  if (target.hasAttribute("data-id")) {
    target.removeAttribute("data-id");
    store.removeValue(target.getAttribute("data-id"));
    target.style.backgroundColor = "transparent";
    target.style.color = "initial";
    return;
  }

  const newValue = store.makeValue(elementValue);
  target.setAttribute("data-id", newValue.id);

  target.style.backgroundColor = color.backgroundColor as string;
  target.style.color = color.textColor as string;
};

export const handleSelectFile = async (options: OpenDialogOptions) => {
  try {
    const selectedFile = (await open(options)) as string | string[];
    if (!selectedFile) return;
    return selectedFile as string;
  } catch (error) {
    console.error(error);
  }
};

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ZOOM SECTION
// ----------------------------------------------------------------
// ----------------------------------------------------------------

export function zoomIn() {
  const htmlFile = document.getElementById("html-file");
  const currentScale = parseFloat(
    getComputedStyle(htmlFile).transform.slice(7, -1).split(", ")[0]
  );
  const newScale = currentScale + 0.2;
  htmlFile.style.transform = `scale(${newScale})`;
}

let initial = true;
let isDragging = false;
let lastX: number, lastY: number;
let accumulatedDeltaX = 0,
  accumulatedDeltaY = 0;

export function onMouseDown(event: MouseEvent) {
  event.preventDefault();
  isDragging = true;
  lastX = event.clientX;
  lastY = event.clientY;
}

export function onMouseMove(event: MouseEvent) {
  event.preventDefault();
  if (isDragging) {
    if (initial) initial = false;
    const deltaX = event.clientX - lastX;
    const deltaY = event.clientY - lastY;
    accumulatedDeltaX += deltaX;
    accumulatedDeltaY += deltaY;
    const htmlFile = document.getElementById("html-file");
    htmlFile.style.transform = `translate(${accumulatedDeltaX}px, ${accumulatedDeltaY}px) scale(${parseFloat(
      getComputedStyle(htmlFile).transform.slice(7, -1).split(", ")[0]
    )})`;
    lastX = event.clientX;
    lastY = event.clientY;
  }
}

export function onMouseUp(event: MouseEvent) {
  event.preventDefault();
  isDragging = false;
}

export function onMouseLeave(event: MouseEvent) {
  event.preventDefault();
  isDragging = false;
}

export function restartZoom() {
  isDragging = false;
  initial = true;
  const htmlFile = document.getElementById("html-file");
  htmlFile.style.transform = `translate(0px, 0px) scale(1)`;
}

function addToast(arg0: { title: string; message: string; type: string; }) {
throw new Error("Function not implemented.");
}
