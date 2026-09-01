# DIONA Assignment

A plain HTML, CSS, and JavaScript implementation of two dynamic WCB document exercises.

## Contents

- `index.html` — landing page with links to both exercises.
- `exercise1/` — Medical & Travel Expense Request.
- `exercise2/` — Worker Progress Report.
- `assets/` — shared styling and JavaScript utilities.
- `Medical and Travel Expense Request.pdf` and `Worker Progress Report.pdf` — reference documents.

## Run locally

Open `index.html` in a web browser. No build step or dependencies are required.

For the most consistent browser behavior, you can serve the folder with:

```bash
python -m http.server 5500
```

Then visit `http://localhost:5500`.

## Exporting PDFs

Open either exercise and use its **Print / Save PDF** action. In the print dialog, select **Save as PDF** and enable background graphics.
