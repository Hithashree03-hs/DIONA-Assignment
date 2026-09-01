/* =====================================================================
   Exercise 2 — renderer.

   Generates the Worker Progress Report from the selected scenario:
   header, Return to Work section, Recovery section, Other Information,
   and the declaration page. Checkbox states, dates, comments and the
   pain rating all come from the data; the paginator decides where
   pages break and stamps "Page X of Y" in every footer.
   ===================================================================== */

(() => {
  const { el, esc, fmtDate, fmtDateTime, logoSVG } = WCB;

  const WORKING_OPTS = [
    ["full-regular", "Full duties, regular hours"],
    ["full-reduced", "Full duties, reduced hours"],
    ["modified-regular", "Modified duties, regular hours"],
    ["modified-reduced", "Modified duties, reduced hours"]
  ];

  const cb = (checked) => `<span class="cb${checked ? " checked" : ""}"></span>`;

  /* Underlined value with an optional caption below it */
  function fill(value, caption, minWidth, grow) {
    const style = minWidth ? ` style="min-width:${minWidth}px"` : "";
    return `<span class="fill-wrap${grow ? " grow" : ""}">` +
      `<span class="fill dv"${style}>${value ? esc(value) : "&nbsp;"}</span>` +
      (caption ? `<span class="fill-caption">${esc(caption)}</span>` : "") +
      `</span>`;
  }

  function commentBox(question, answer, extraCls) {
    return el("div", "comment-box" + (extraCls ? " " + extraCls : ""),
      `<p class="q">${question}</p>` + (answer ? `<p class="a dv">${esc(answer)}</p>` : ""));
  }

  function buildHeader(meta) {
    const h = el("div", "doc-header");
    h.innerHTML = `
      <div class="dh-logo">${logoSVG()}</div>
      <div class="dh-addr">333 Broadway<br>Winnipeg, MB R3C 4W3<br>Phone: (204) 954-4321<br>Toll Free: 1-855-954-4321<br>wcb.mb.ca</div>
      <div class="dh-right">
        <div class="dh-doc-title plain">Worker Progress Report</div>
        <span class="claim-box">Claim No. ${esc(meta.claimNo)}</span><span class="wp-box">WP</span>
      </div>`;
    return h;
  }

  let currentData = null;

  function renderData(data) {
    currentData = data;
    const rtw = data.returnToWork;
    const rec = data.recovery;
    const paper = document.getElementById("paper");
    paper.innerHTML = "";

    const doc = createPagedDoc({
      mount: paper,
      footerLeft: "Worker App ID: " + data.meta.workerAppId,
      submitted: "Submitted: " + fmtDateTime(data.meta.submitted)
    });

    doc.addBlock(buildHeader(data.meta));
    doc.addBlock(el("p", "doc-intro",
      `<span class="dv">${esc(data.meta.workerName)}</span> provided the following updates in relation to their claim:`));

    /* ---------------- Return to Work ---------------- */

    const rtwStatus = el("div", "fbox", `
      <div class="fbox-label">Select one:</div>
      <div class="opt-row">
        <span class="opt opt-25">${cb(rtw.status === "notMissed")}<span>I have not missed time from work</span></span>
        <span class="opt opt-25">${cb(rtw.status === "notReturned")}<span>I have not returned to work</span></span>
        <span class="opt opt-50">${cb(rtw.status === "returned")}<span>I returned to work on: ${fill(fmtDate(rtw.returnedDate), "Date", 150)}</span></span>
      </div>`);

    doc.addGroup([el("h2", "sec-h", "Return to Work"), rtwStatus]);

    doc.addBlock(el("div", "fbox", `
      <div class="fbox-label">I am working:</div>
      <div class="opt-row">` +
      WORKING_OPTS.map(([k, label]) =>
        `<span class="opt opt-25">${cb(rtw.working === k)}<span>${label}</span></span>`).join("") +
      `</div>
      <div class="opt-row" style="margin-top:8px">
        <span class="opt opt-grow">${cb(rtw.working === "other")}<span style="flex:none">Other:</span>${fill(rtw.otherText, "", 0, true)}</span>
      </div>`));

    doc.addBlock(commentBox("My return to work is going:", rtw.goingComment, "short"));

    doc.addBlock(el("div", "field-line",
      `I expect to return to work on: ${fill(fmtDate(rtw.expectedReturnDate), "Date", 170)}`));

    doc.addBlock(commentBox("I have the following concerns about returning to work:", rtw.concerns));

    doc.addBlock(el("div", "field-line",
      `I was most recently in contact with: ${fill(rtw.contactName, "(Name of employer contact)", 200)} on ${fill(fmtDate(rtw.contactDate), "Date", 170)}`));

    /* ---------------- Recovery ---------------- */

    const recStatus = el("div", "fbox", `
      <div class="fbox-label">Select one:</div>
      <div class="opt-row">
        <span class="opt opt-50">${cb(rec.fullyRecovered === false)}<span>I have not fully recovered from my workplace injury.</span></span>
        <span class="opt opt-50">${cb(rec.fullyRecovered === true)}<span>I have fully recovered from my workplace injury.</span></span>
      </div>`);

    doc.addGroup([el("h2", "sec-h", "Recovery"), recStatus]);

    doc.addBlock(commentBox("I have provided the following comments about my recovery:", rec.comments));

    let painCells = "";
    for (let i = 1; i <= 10; i++) {
      painCells += `<span class="pain-opt">${cb(rec.painRating === i)}<span>${i}</span></span>`;
    }
    doc.addBlock(el("div", "pain-row", `
      <div class="pain-label">I rate my current pain/discomfort on a scale of 1-10, where 1 is no pain and 10 is severe pain out of 10.</div>
      <div class="pain-grid">${painCells}</div>`));

    doc.addBlock(el("div", "fbox", `
      <div class="fbox-label">Select one:</div>
      <div class="opt-row">
        <span class="opt opt-40">${cb(rec.receivingTreatment === false)}<span>I am not continuing to receive medical treatment for my workplace injury.</span></span>
        <span class="opt opt-35">${cb(rec.receivingTreatment === true)}<span>I am continuing to receive medical treatment for my workplace injury from:</span></span>
        <span class="opt-fill">${fill(rec.providerType, "(Medical Provider Type)", 170)}</span>
      </div>`));

    doc.addBlock(el("div", "field-line",
      `My last medical treatment was ${fill(fmtDate(rec.lastTreatment.date), "Date", 170)} from ${fill(rec.lastTreatment.name, "(Medical Provider Name)", 190)}`));

    doc.addBlock(el("div", "field-line",
      `My next medical treatment is ${fill(fmtDate(rec.nextTreatment.date), "Date", 170)} from ${fill(rec.nextTreatment.name, "(Medical Provider Name)", 190)}`));

    doc.addBlock(el("div", "field-line",
      `I am attending a Chiropractor or Physiotherapist ${fill(rec.frequency, "(Frequency)", 210)}`));

    doc.addBlock(el("div", "fbox", `
      <div class="fbox-label">Select one:</div>
      <div class="opt-row">
        <span class="opt opt-33">${cb(rec.takingMedication === false)}<span>I am not taking medication for my workplace injury.</span></span>
        <span class="opt opt-33">${cb(rec.takingMedication === true)}<span>I am taking medication for my workplace injury:</span></span>
        <span class="opt-fill">${fill(rec.medicationName, "(Name of prescribed medication)", 200)}</span>
      </div>`));

    doc.addBlock(el("div", "fbox", `
      <div class="fbox-label">Select one:</div>
      <div class="opt-row">
        <span class="opt opt-50">${cb(rec.doingExercises === false)}<span>I am not doing home exercises for my workplace injury.</span></span>
        <span class="opt opt-50">${cb(rec.doingExercises === true)}<span>I am doing home exercises for my workplace injury.</span></span>
      </div>`));

    doc.addBlock(commentBox("List the exercises you are doing:", rec.exerciseList));

    /* ---------------- Other Information ---------------- */

    doc.addGroup([
      el("h2", "sec-h", "Other Information"),
      commentBox("I would like to provide the following additional information about my claim/injury:", data.otherInfo)
    ]);

    /* ---------------- Declarations (own page, like the PDF) ---------------- */

    doc.breakPage();

    doc.addBlock(el("div", "decl",
      cb(data.declarations.certify) +
      `<p>I certify that the information given on this form is true, correct and complete to the best of my
       knowledge. I agree to notify the Workers Compensation Board of Manitoba (WCB) immediately once I
       return to any form of work and/or employment. I understand that it is an offence to knowingly make
       a false statement to the WCB. I also understand that it is an offence to withhold information from
       WCB which affects my entitlement to compensation (e.g., full or partial recovery from injury, ability to
       return to work, sources of additional income, etc.). I understand that refusing to co-operate with, or
       follow my treatment, may result in the WCB reducing or suspending my benefits.</p>`));

    doc.addBlock(el("div", "decl",
      cb(data.declarations.privacy) +
      `<p>I understand that the <span class="link">Privacy Notice</span> applies to the personal information collected in this document.</p>`));

    const pageCount = doc.finalize();
    document.getElementById("tbStat").textContent =
      `${pageCount} page${pageCount > 1 ? "s" : ""} · ${data.meta.workerName}`;
  }

  function render(setKey) {
    renderData(EX2_DATASETS[setKey]);
  }

  /* Toolbar wiring */
  const seg = document.getElementById("datasetSeg");
  seg.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-set]");
    if (!btn) return;
    seg.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b === btn));
    render(btn.dataset.set);
  });
  document.getElementById("btnPrint").addEventListener("click", () => window.print());

  /* Live data editor: edit the current scenario as JSON in the browser */
  const editor = initDataEditor({
    getCurrent: () => currentData,
    onApply: (obj) => {
      seg.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      renderData(obj);
    }
  });
  document.getElementById("btnEdit").addEventListener("click", editor.open);

  render("sample");
})();
