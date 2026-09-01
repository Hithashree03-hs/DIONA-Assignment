/* =====================================================================
   Shared helpers — WCB logo (inline SVG), date/currency formatting,
   HTML escaping and small DOM utilities. Used by both exercises.
   ===================================================================== */

const WCB = (() => {
  const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  /* "2024-03-28" -> "March 28, 2024" (empty stays empty) */
  function fmtDate(iso) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-").map(Number);
    return `${MONTHS[m - 1]} ${d}, ${y}`;
  }

  /* "2024-03-28T20:43" -> "March 28, 2024 20:43" */
  function fmtDateTime(iso) {
    if (!iso) return "";
    const [datePart, timePart] = iso.split("T");
    return timePart ? `${fmtDate(datePart)} ${timePart}` : fmtDate(datePart);
  }

  /* 8 -> "$8.00" */
  function money(n) {
    return "$" + Number(n).toFixed(2);
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  /* Recreated approximation of the WCB Manitoba logo as an inline SVG */
  function logoSVG() {
    return `
<svg width="168" height="82" viewBox="0 0 190 92" xmlns="http://www.w3.org/2000/svg"
     role="img" aria-label="Workers Compensation Board of Manitoba">
  <g>
    <g fill="#1b6ab3">
      <circle cx="102" cy="8" r="5.5"/>
      <path d="M92 27 Q102 13 112 27 Z"/>
    </g>
    <g fill="#4a90d9">
      <circle cx="124" cy="6" r="5.5"/>
      <path d="M114 25 Q124 11 134 25 Z"/>
    </g>
    <g fill="#123f6d">
      <circle cx="146" cy="8" r="5.5"/>
      <path d="M136 27 Q146 13 156 27 Z"/>
    </g>
  </g>
  <text x="0" y="56" font-family="Arial, Helvetica, sans-serif" font-size="38"
        font-weight="900" font-style="italic" fill="#1b6ab3">WCB</text>
  <text x="2" y="73" font-family="Arial, Helvetica, sans-serif" font-size="12.5"
        font-weight="700" fill="#1b6ab3">Workers Compensation</text>
  <text x="2" y="88" font-family="Arial, Helvetica, sans-serif" font-size="12.5"
        font-weight="700" fill="#1b6ab3">Board of Manitoba</text>
</svg>`;
  }

  return { fmtDate, fmtDateTime, money, esc, el, logoSVG };
})();
