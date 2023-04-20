export function wrapTextNodes(node) {
  if (node.nodeType == Node.TEXT_NODE) {
    var span = document.createElement("span");
    node.parentNode.insertBefore(span, node);
    // node.classList.add("test-xd");
    span.classList.add("test-xd");
    span.appendChild(node);
  } else {
    var children = node.childNodes;
    for (var i = 0, len = children.length; i < len; ++i) {
      wrapTextNodes(children[i]);
    }
  }
}

export function zoomIn() {
  const htmlFile = document.getElementById("html-file");
  const currentScale = parseFloat(
    getComputedStyle(htmlFile).transform.slice(7, -1).split(", ")[0]
  );
  const newScale = currentScale + 0.2;
  htmlFile.style.transform = `scale(${newScale})`;
}












let isDragging = false;
let lastX: number, lastY: number;
let accumulatedDeltaX = 0, accumulatedDeltaY = 0;

export function onMouseDown(event: MouseEvent) {
  event.preventDefault();
  isDragging = true;
  lastX = event.clientX;
  lastY = event.clientY;
}

export function onMouseMove(event: MouseEvent) {
  event.preventDefault();
  if (isDragging) {
    const deltaX = event.clientX - lastX;
    const deltaY = event.clientY - lastY;
    accumulatedDeltaX += deltaX;
    accumulatedDeltaY += deltaY;
    const htmlFile = document.getElementById("html-file");
    htmlFile.style.transform = `translate(${accumulatedDeltaX}px, ${accumulatedDeltaY}px) scale(${parseFloat(getComputedStyle(htmlFile).transform.slice(7, -1).split(', ')[0])})`;
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
  const htmlFile = document.getElementById("html-file");
  htmlFile.style.transform = `translate(0px, 0px) scale(1)`;
}