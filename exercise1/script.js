/* =====================================================================
   Exercise 1 — renderer.

   Reads the selected dataset and generates the whole document:
   header (logo, address, title, claim no), intro line, one table per
   non-empty expense section, the privacy acknowledgement, and the
   footer with dynamic page numbers on every page.
   ===================================================================== */

(() => {
  const { el, esc, fmtDate, fmtDateTime, money, logoSVG } = WCB;

  /* Column layout, header labels and cell mapping for each section. */
  const SECTIONS = [
    {
      key: "prescriptionDrugs",
      title: "Prescription Drugs",
      cols: ["20%", "17%", "17%", "31%", "15%"],
      head: ["Drug Name", "Prescription Date", "Date Purchased", "Healthcare Provider Name", "Paid Amount"],
      row: (r) => [esc(r.drug), fmtDate(r.prescriptionDate), fmtDate(r.datePurchased), esc(r.provider), money(r.amount)]
    },
    {
      key: "otcDrugs",
      title: "Over-the-Counter Drugs",
      cols: ["20%", "17%", "13%", "25%", "25%"],
      head: ["Drug Name", "Date Purchased", "Paid Amount", "Seller's Name", "Reason for Purchasing"],
      row: (r) => [esc(r.drug), fmtDate(r.datePurchased), money(r.amount), esc(r.seller), esc(r.reason)]
    },
    {
      key: "medicalSupplies",
      title: "Bandages, Braces or Other Medical Supplies",
      cols: ["17%", "13%", "12%", "26%", "13%", "19%"],
      head: ["Item Purchased", "Date Purchased", "Was this Prescribed?", "Healthcare Provider Name", "Paid Amount", "Seller's Name"],
      row: (r) => [esc(r.item), fmtDate(r.datePurchased), esc(r.prescribed), esc(r.provider), money(r.amount), esc(r.seller)]
    },
    {
      key: "parking",
      title: "Parking for Medical Appointments",
      cols: ["40%", "17%", "13%", "13%", "17%"],
      head: ["Address of Healthcare Provider/Medical Facility", "Date", "Paid Amount", "Meter Used?", "Meter Number"],
      row: (r) => [esc(r.address), fmtDate(r.date), money(r.amount), esc(r.meterUsed), esc(r.meterNumber)]
    },
    {
      key: "mileage",
      title: "Mileage to Medical Appointments",
      note: "The WCB will generally reimburse only those transportation costs which are in excess of costs that would be incurred by the worker while travelling to and from work.",
      cols: ["15%", "34%", "32%", "19%"],
      head: ["Appointment Date", "Address of Healthcare Provider/Medical Facility", "Address of Workplace", "Number of km (Round Trip)"],
      row: (r) => [fmtDate(r.date), esc(r.provider), esc(r.workplace), esc(r.km) + " km"]
    },
    {
      key: "fares",
      title: "Bus or Taxi Fare for Medical Appointments<sup>*</sup>",
      note: "*Note: Pre-approval is required from your WCB representative to claim taxi fare(s).",
      cols: ["14%", "30%", "32%", "12%", "12%"],
      head: ["Appointment Date", "Address of Starting Point", "Address of Healthcare Provider/Medical Facility", "Bus or Taxi (indicate one)", "Total Fare Paid"],
      row: (r) => [fmtDate(r.date), esc(r.start), esc(r.provider), esc(r.mode), money(r.amount)]
    }
  ];

  function trFor(cells) {
    const tr = document.createElement("tr");
    cells.forEach((c) => {
      const td = document.createElement("td");
      td.innerHTML = c === "" || c == null ? "&nbsp;" : c;
      tr.appendChild(td);
    });
    return tr;
  }

  function buildHeader(meta) {
    const h = el("div", "doc-header");
    h.innerHTML = `
      <div class="dh-logo">${logoSVG()}</div>
      <div class="dh-addr">333 Broadway<br>Winnipeg, MB R3C 4W3<br>Phone: (204) 954-4321<br>Toll Free: 1-855-954-4321<br>wcb.mb.ca</div>
      <div class="dh-right">
        <div class="dh-doc-title">Medical &amp; Travel Expense Request</div>
        <span class="claim-box">Claim No. ${esc(meta.claimNo)}</span>
      </div>`;
    return h;
  }

  let currentData = null;

  function renderData(data) {
    currentData = data;
    const paper = document.getElementById("paper");
    paper.innerHTML = "";

    const doc = createPagedDoc({
      mount: paper,
      footerLeft: "Worker App ID: " + data.meta.workerAppId,
      submitted: "Submitted: " + fmtDateTime(data.meta.submitted)
    });

    doc.addBlock(buildHeader(data.meta));
    doc.addBlock(el("p", "doc-intro",
      `<span class="dv">${esc(data.meta.workerName)}</span> requested reimbursement for the following medical and/or travel expenses:`));

    let itemCount = 0;
    let total = 0;

    SECTIONS.forEach((sec) => {
      const rows = data[sec.key] || [];
      if (!rows.length) return; /* empty sections are omitted from the document */

      itemCount += rows.length;
      rows.forEach((r) => { if (typeof r.amount === "number") total += r.amount; });

      const leadEls = [el("h2", "doc-section-title", sec.title)];
      if (sec.note) leadEls.push(el("p", "doc-note", sec.note));

      doc.addTable({
        leadEls,
        colWidths: sec.cols,
        headHTML: sec.head,
        rows,
        renderRow: (r) => trFor(sec.row(r))
      });
    });

    /* Privacy acknowledgement */
    const divider = el("hr", "privacy-divider");
    const privacy = el("div", "privacy-line",
      `<span class="cb${data.privacyAcknowledged ? " checked" : ""}"></span>
       <p>I understand that the <span class="link">Privacy Notice</span> applies to the personal information collected in this document.</p>`);
    doc.addGroup([divider, privacy]);

    const pageCount = doc.finalize();
    document.getElementById("tbStat").textContent =
      `${pageCount} page${pageCount > 1 ? "s" : ""} · ${itemCount} line item${itemCount > 1 ? "s" : ""} · ${money(total)} claimed`;
  }

  function render(setKey) {
    renderData(EX1_DATASETS[setKey]);
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

  /* Live data editor: edit the current dataset as JSON in the browser */
  const editor = initDataEditor({
    getCurrent: () => currentData,
    onApply: (obj) => {
      seg.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      renderData(obj);
    }
  });
  document.getElementById("btnEdit").addEventListener("click", editor.open);

  render("standard");
})();
