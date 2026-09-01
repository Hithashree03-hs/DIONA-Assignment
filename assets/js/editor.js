/* =====================================================================
   Live data editor drawer (screen only — never printed).

   Opens from the "Edit Data" toolbar button. Shows the currently
   rendered dataset as editable JSON; Apply re-renders the document
   from the edited data instantly. This is a demo aid — the canonical
   datasets still live in each exercise's data.js.
   ===================================================================== */

function initDataEditor({ getCurrent, onApply }) {
  const drawer = document.createElement("aside");
  drawer.className = "editor-drawer no-print";
  drawer.hidden = true;
  drawer.innerHTML = `
    <div class="ed-head">
      <span>Data Editor <small>(JSON)</small></span>
      <button class="ed-close" title="Close">&times;</button>
    </div>
    <p class="ed-hint">Edit any value below, then click <b>Apply</b> — the document
      regenerates instantly. Add or remove rows inside the arrays to watch the
      pages and page numbers adapt.</p>
    <textarea class="ed-text" spellcheck="false"></textarea>
    <div class="ed-error" hidden></div>
    <div class="ed-actions">
      <button class="ed-apply">Apply</button>
      <button class="ed-reset">Reset</button>
      <span class="ed-status"></span>
    </div>`;
  document.body.appendChild(drawer);

  const text = drawer.querySelector(".ed-text");
  const errBox = drawer.querySelector(".ed-error");
  const status = drawer.querySelector(".ed-status");

  function load() {
    text.value = JSON.stringify(getCurrent(), null, 2);
    errBox.hidden = true;
    status.textContent = "";
  }

  function open() {
    load();
    drawer.hidden = false;
    text.focus();
  }

  function close() {
    drawer.hidden = true;
  }

  drawer.querySelector(".ed-close").addEventListener("click", close);
  drawer.querySelector(".ed-reset").addEventListener("click", load);
  drawer.querySelector(".ed-apply").addEventListener("click", () => {
    let obj;
    try {
      obj = JSON.parse(text.value);
    } catch (e) {
      errBox.hidden = false;
      errBox.textContent = "Invalid JSON: " + e.message;
      return;
    }
    try {
      onApply(obj);
      errBox.hidden = true;
      status.textContent = "Applied ✓";
      setTimeout(() => { status.textContent = ""; }, 1800);
    } catch (e) {
      errBox.hidden = false;
      errBox.textContent = "Data error: " + e.message;
    }
  });

  return { open, close };
}
