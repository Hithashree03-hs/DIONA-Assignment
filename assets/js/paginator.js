/* =====================================================================
   Pagination engine.

   Renders content into fixed-size Letter pages (.page > .page-content)
   and measures real DOM overflow (scrollHeight vs clientHeight) to
   decide when to start a new page. This is what makes the documents
   behave like a PDF for ANY amount of data:

     - addBlock(el)   : atomic block; moved to a fresh page if it
                        does not fit on the current one.
     - addGroup(els)  : elements that must START on the same page
                        (e.g. a section heading with its first box).
     - addTable(cfg)  : table that splits across pages row by row,
                        repeating its header row on every new page and
                        never leaving the heading orphaned at a page end.
     - breakPage()    : force the next content onto a new page.
     - finalize()     : stamps "Page X of Y" into every footer.

   Every page automatically receives the document footer
   (Worker App ID on the left, Submitted + page number on the right).
   ===================================================================== */

function createPagedDoc({ mount, footerLeft, submitted }) {
  const pages = [];
  let content = null; // .page-content of the current page

  function newPage() {
    const page = document.createElement("div");
    page.className = "page";
    page.innerHTML =
      '<div class="page-content"></div>' +
      '<div class="page-footer">' +
      '<span class="pf-left"></span>' +
      '<span class="pf-right"><span class="pf-submitted"></span>' +
      '<span class="pf-num"></span></span>' +
      "</div>";
    page.querySelector(".pf-left").textContent = footerLeft;
    page.querySelector(".pf-submitted").textContent = submitted;
    mount.appendChild(page);
    pages.push(page);
    content = page.querySelector(".page-content");
    return page;
  }

  const overflows = () => content.scrollHeight > content.clientHeight + 1;

  /* Elements that must start together on one page. */
  function addGroup(els) {
    const hadPrior = content.childElementCount > 0;
    els.forEach((e) => content.appendChild(e));
    if (overflows() && hadPrior) {
      els.forEach((e) => e.remove());
      newPage();
      els.forEach((e) => content.appendChild(e));
    }
  }

  function addBlock(el) {
    addGroup([el]);
  }

  function breakPage() {
    if (content.childElementCount > 0) newPage();
  }

  /*
    addTable({
      leadEls,     // heading / note elements kept with the table start
      colWidths,   // ["20%", ...] applied via <colgroup>
      headHTML,    // header cell HTML strings
      rows,        // data rows
      renderRow,   // row -> <tr>
      className
    })
  */
  function addTable({ leadEls = [], colWidths = [], headHTML = [], rows = [], renderRow, className = "" }) {
    function makeTable() {
      const t = document.createElement("table");
      t.className = "doc-table" + (className ? " " + className : "");
      if (colWidths.length) {
        const cg = document.createElement("colgroup");
        colWidths.forEach((w) => {
          const c = document.createElement("col");
          if (w) c.style.width = w;
          cg.appendChild(c);
        });
        t.appendChild(cg);
      }
      const thead = document.createElement("thead");
      const tr = document.createElement("tr");
      headHTML.forEach((h) => {
        const th = document.createElement("th");
        th.innerHTML = h;
        tr.appendChild(th);
      });
      thead.appendChild(tr);
      t.appendChild(thead);
      const tb = document.createElement("tbody");
      t.appendChild(tb);
      return { t, tb };
    }

    /* elements of this section currently sitting on the current page */
    let placed = [];
    const put = (el) => { content.appendChild(el); placed.push(el); };

    const hadPrior = content.childElementCount > 0;
    leadEls.forEach(put);
    let { t, tb } = makeTable();
    put(t);

    /* heading + empty table already do not fit -> move section to a new page */
    if (overflows() && hadPrior) {
      const moving = placed.slice();
      moving.forEach((el) => el.remove());
      newPage();
      placed = [];
      moving.forEach(put);
    }

    rows.forEach((rowData) => {
      const tr = renderRow(rowData);
      tb.appendChild(tr);
      if (!overflows()) return;

      tr.remove();
      if (tb.childElementCount === 0) {
        /* first row of this table chunk does not fit */
        const sectionAlone = content.childElementCount === placed.length;
        if (!sectionAlone) {
          const moving = placed.slice();
          moving.forEach((el) => el.remove());
          newPage();
          placed = [];
          moving.forEach(put);
        }
        tb.appendChild(tr); /* fresh page: accept (a single row larger than a page cannot be split further) */
      } else {
        /* continue the table on a new page, repeating the header row */
        newPage();
        const cont = makeTable();
        content.appendChild(cont.t);
        placed = [cont.t];
        t = cont.t;
        tb = cont.tb;
        tb.appendChild(tr);
      }
    });
  }

  function finalize() {
    pages.forEach((p, i) => {
      p.querySelector(".pf-num").textContent = `Page ${i + 1} of ${pages.length}`;
    });
    return pages.length;
  }

  newPage(); // start with page 1
  return { newPage, addBlock, addGroup, addTable, breakPage, finalize };
}
