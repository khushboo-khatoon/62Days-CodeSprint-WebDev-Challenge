(() => {
  const $ = (id) => document.getElementById(id);
  const demoRoot = $("demoRoot");
  const loading = $("loading");
  const tooltip = $("tooltip");
  let pickMode = false;
  let selected = null;

  const demos = {
    flex: () => `
      <h2 class="demo-title">Flex gallery</h2>
      <div class="flex-row">
        <div class="card"><strong>Card A</strong><p>flex: 1 1 120px</p></div>
        <div class="card"><strong>Card B</strong><p>wrap + gap 12px</p></div>
        <div class="card"><strong>Card C</strong><p>align-items stretch</p></div>
      </div>
      <div class="flex-row" style="justify-content:space-between;padding:20px;margin:8px;">
        <div class="card" style="margin:8px;padding:20px;">Spaced item</div>
        <div class="card" style="margin:8px;padding:10px;">Compact item</div>
      </div>`,
    grid: () => `
      <h2 class="demo-title">CSS Grid board</h2>
      <div class="grid-board">
        <div class="cell wide"><strong>Hero</strong><p>grid-column: span 2</p></div>
        <div class="cell"><strong>Aside</strong></div>
        <div class="cell"><strong>Tile</strong></div>
        <div class="cell"><strong>Tile</strong></div>
        <div class="cell"><strong>Tile</strong></div>
      </div>`,
    stack: () => `
      <article class="article">
        <h2 class="demo-title">Stacked article</h2>
        <p>Use outlines and rulers to compare margin vs padding on nested text blocks.</p>
        <p style="margin:24px 0;padding:16px;background:#e8f1ff;border-radius:8px;">Highlighted paragraph with larger spacing.</p>
        <p>Final paragraph for flow comparison.</p>
      </article>`,
    empty: () => `
      <div class="empty-state">
        <div>
          <strong>No demo content</strong>
          <span>Choose another sample from the toolbar to inspect layouts.</span>
        </div>
      </div>`,
  };

  function setStatus(msg) {
    $("status").textContent = msg;
  }

  function applyOverlay() {
    demoRoot.classList.toggle("debug", $("overlayToggle").checked);
  }

  function clearSelection() {
    if (selected) selected.classList.remove("selected-el", "ruler-pad", "ruler-mar");
    selected = null;
    $("inspectEmpty").hidden = false;
    $("inspectOut").hidden = true;
    $("inspectOut").textContent = "";
  }

  function describe(el) {
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    const lines = [
      `tag: <${el.tagName.toLowerCase()}${el.className ? "." + String(el.className).trim().replace(/\s+/g, ".") : ""}>`,
      `display: ${cs.display}`,
      `position: ${cs.position}`,
      `size: ${Math.round(rect.width)} × ${Math.round(rect.height)}`,
      `margin: ${cs.marginTop} ${cs.marginRight} ${cs.marginBottom} ${cs.marginLeft}`,
      `padding: ${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
      `border: ${cs.borderTopWidth} ${cs.borderStyle} ${cs.borderTopColor}`,
    ];
    if (cs.display.includes("flex")) {
      lines.push(
        `flex-direction: ${cs.flexDirection}`,
        `flex-wrap: ${cs.flexWrap}`,
        `justify-content: ${cs.justifyContent}`,
        `align-items: ${cs.alignItems}`,
        `gap: ${cs.gap}`,
        `children: ${el.children.length}`
      );
    }
    if (cs.display.includes("grid")) {
      lines.push(
        `grid-template-columns: ${cs.gridTemplateColumns}`,
        `grid-template-rows: ${cs.gridTemplateRows}`,
        `gap: ${cs.gap}`,
        `children: ${el.children.length}`
      );
    }
    if (cs.display !== "flex" && el.parentElement) {
      const p = getComputedStyle(el.parentElement);
      if (p.display.includes("flex")) {
        lines.push(`flex: ${cs.flexGrow} ${cs.flexShrink} ${cs.flexBasis}`, `align-self: ${cs.alignSelf}`);
      }
      if (p.display.includes("grid")) {
        lines.push(`grid-area: ${cs.gridArea}`, `justify-self: ${cs.justifySelf}`);
      }
    }
    return lines.join("\n");
  }

  function selectEl(el) {
    if (!demoRoot.contains(el) || el === demoRoot) return;
    clearSelection();
    selected = el;
    el.classList.add("selected-el");
    if ($("rulerToggle").checked) {
      el.classList.add("ruler-pad", "ruler-mar");
    }
    $("inspectEmpty").hidden = true;
    $("inspectOut").hidden = false;
    $("inspectOut").textContent = describe(el);
    setStatus(`Inspecting <${el.tagName.toLowerCase()}>`);
  }

  function loadDemo(name) {
    loading.classList.remove("hide");
    setStatus("Loading demo…");
    clearSelection();
    setTimeout(() => {
      demoRoot.innerHTML = demos[name]();
      applyOverlay();
      loading.classList.add("hide");
      setStatus($("overlayToggle").checked ? "Ready — outlines on" : "Ready — outlines off");
    }, 280);
  }

  demoRoot.addEventListener("click", (e) => {
    if (!pickMode && !e.altKey) return;
    e.preventDefault();
    e.stopPropagation();
    selectEl(e.target);
    if (pickMode) {
      pickMode = false;
      $("btnInspect").classList.remove("active");
    }
  });

  demoRoot.addEventListener("mousemove", (e) => {
    if (!pickMode) {
      tooltip.hidden = true;
      return;
    }
    const el = e.target;
    if (!demoRoot.contains(el) || el === demoRoot) {
      tooltip.hidden = true;
      return;
    }
    tooltip.hidden = false;
    tooltip.textContent = el.tagName.toLowerCase();
    tooltip.style.left = `${e.clientX + 12}px`;
    tooltip.style.top = `${e.clientY + 12}px`;
  });

  $("overlayToggle").addEventListener("change", () => {
    applyOverlay();
    setStatus($("overlayToggle").checked ? "Outlines enabled" : "Outlines disabled");
  });
  $("rulerToggle").addEventListener("change", () => {
    if (!selected) return;
    selected.classList.toggle("ruler-pad", $("rulerToggle").checked);
    selected.classList.toggle("ruler-mar", $("rulerToggle").checked);
  });
  $("demoSelect").addEventListener("change", (e) => loadDemo(e.target.value));
  $("breakpoint").addEventListener("change", (e) => {
    $("viewport").style.width = e.target.value;
    setStatus(`Viewport → ${e.target.value}`);
  });
  $("btnInspect").addEventListener("click", () => {
    pickMode = !pickMode;
    $("btnInspect").classList.toggle("active", pickMode);
    setStatus(pickMode ? "Pick mode: click an element" : "Pick mode off");
  });
  $("btnClear").addEventListener("click", () => {
    clearSelection();
    setStatus("Selection cleared");
  });
  $("btnExport").addEventListener("click", async () => {
    setStatus("Exporting annotated screenshot…");
    try {
      const canvas = await html2canvas($("viewport"), { backgroundColor: "#f4f7fb", scale: 2 });
      const link = document.createElement("a");
      link.download = `layout-debug-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setStatus("Screenshot exported");
    } catch (err) {
      console.error(err);
      setStatus("Export failed — check console");
    }
  });

  loadDemo("flex");
})();
