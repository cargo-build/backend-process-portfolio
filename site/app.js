(() => {
  "use strict";

  const dialog = document.getElementById("diagram-dialog");
  if (!dialog || typeof dialog.showModal !== "function") return;

  const viewport = document.getElementById("diagram-viewport");
  const canvas = document.getElementById("diagram-canvas");
  const fullImage = document.getElementById("diagram-full");
  const title = document.getElementById("diagram-title");
  const counter = document.getElementById("diagram-counter");
  const zoomLabel = document.getElementById("diagram-zoom");
  const originalLink = document.getElementById("diagram-original");
  const previous = document.getElementById("diagram-previous");
  const next = document.getElementById("diagram-next");
  const zoomOut = document.getElementById("diagram-zoom-out");
  const zoomIn = document.getElementById("diagram-zoom-in");
  const fit = document.getElementById("diagram-fit");
  if ([viewport, canvas, fullImage, title, counter, zoomLabel, originalLink,
    previous, next, zoomOut, zoomIn, fit].some((element) => !element)) return;

  const diagrams = [...document.querySelectorAll("figure[data-diagram]")].map((figure) => {
    const image = figure.querySelector("img");
    const heading = figure.querySelector("h3");
    if (!image || !heading) return null;
    const width = Number(image.getAttribute("width"));
    const height = Number(image.getAttribute("height"));
    const source = image.getAttribute("src");
    if (!source || !Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return null;
    return {
      key: figure.dataset.diagram,
      title: heading.textContent.trim(),
      source,
      alt: image.alt,
      width,
      height
    };
  });
  if (!diagrams.length || diagrams.some((diagram) => !diagram)) return;

  let current = 0;
  let scale = 1;
  let fitMode = true;
  let openingLink = null;
  let resizeFrame = 0;
  const padding = 48;
  const minimumScale = 0.05;
  const maximumScale = 3;

  function fitScale() {
    const diagram = diagrams[current];
    const availableWidth = Math.max(viewport.clientWidth - padding, 1);
    const availableHeight = Math.max(viewport.clientHeight - padding, 1);
    return Math.min(availableWidth / diagram.width, availableHeight / diagram.height, 1);
  }

  function drawScale(center = true) {
    const diagram = diagrams[current];
    const oldWidth = canvas.offsetWidth;
    const oldHeight = canvas.offsetHeight;
    const relativeX = oldWidth ? (viewport.scrollLeft + viewport.clientWidth / 2) / oldWidth : 0.5;
    const relativeY = oldHeight ? (viewport.scrollTop + viewport.clientHeight / 2) / oldHeight : 0.5;
    const imageWidth = Math.round(diagram.width * scale);
    const imageHeight = Math.round(diagram.height * scale);
    fullImage.style.width = `${imageWidth}px`;
    fullImage.style.height = `${imageHeight}px`;
    canvas.style.width = `${Math.max(imageWidth + padding, viewport.clientWidth)}px`;
    canvas.style.height = `${Math.max(imageHeight + padding, viewport.clientHeight)}px`;
    zoomLabel.textContent = `${fitMode ? "Fit · " : ""}${Math.round(scale * 100)}%`;
    zoomOut.disabled = scale <= minimumScale;
    zoomIn.disabled = scale >= maximumScale;
    viewport.scrollLeft = center ? (canvas.offsetWidth - viewport.clientWidth) / 2 : relativeX * canvas.offsetWidth - viewport.clientWidth / 2;
    viewport.scrollTop = center ? (canvas.offsetHeight - viewport.clientHeight) / 2 : relativeY * canvas.offsetHeight - viewport.clientHeight / 2;
  }

  function fitToView() {
    fitMode = true;
    scale = fitScale();
    drawScale();
  }

  function showDiagram(index) {
    current = (index + diagrams.length) % diagrams.length;
    const diagram = diagrams[current];
    title.textContent = diagram.title;
    counter.textContent = `Diagram ${current + 1} of ${diagrams.length}`;
    fullImage.src = diagram.source;
    fullImage.alt = diagram.alt;
    originalLink.href = diagram.source;
    viewport.setAttribute("aria-label", `Scrollable diagram: ${diagram.title}`);
    fitToView();
  }

  function zoomBy(factor) {
    fitMode = false;
    scale = Math.min(maximumScale, Math.max(minimumScale, scale * factor));
    drawScale(false);
  }

  document.querySelectorAll("a[data-view-diagram]").forEach((link) => {
    const index = diagrams.findIndex((diagram) => diagram.key === link.dataset.viewDiagram);
    if (index < 0) return;
    link.addEventListener("click", (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      openingLink = link;
      if (!dialog.open) dialog.showModal();
      showDiagram(index);
    });
  });

  previous.addEventListener("click", () => showDiagram(current - 1));
  next.addEventListener("click", () => showDiagram(current + 1));
  zoomOut.addEventListener("click", () => zoomBy(0.8));
  zoomIn.addEventListener("click", () => zoomBy(1.25));
  fit.addEventListener("click", fitToView);

  dialog.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key === "[") showDiagram(current - 1);
    else if (event.key === "]") showDiagram(current + 1);
    else if (event.key === "+" || event.key === "=") zoomBy(1.25);
    else if (event.key === "-" || event.key === "−") zoomBy(0.8);
    else if (event.key === "0") fitToView();
    else return;
    event.preventDefault();
  });

  dialog.addEventListener("close", () => {
    if (openingLink && openingLink.isConnected) openingLink.focus({ preventScroll: true });
    openingLink = null;
  });

  window.addEventListener("resize", () => {
    if (!dialog.open) return;
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => {
      if (fitMode) fitToView();
      else drawScale(false);
    });
  });
})();
