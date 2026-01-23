import { JSDOM } from "jsdom";

// function is called 
async function decodeSecretMessage(url) {
  // Check if the url argument is a string
  if (typeof url !== "string") throw new Error ("url must be a string");
  // fetching the html through Node 22
  const res = await fetch(url, { headers: { Accept: "text/html"} });
  if (!res.ok) throw new Error (`Fetch failed: ${res.status} ${res.statusText}`);
  const html = await res.text();

  // Parsing HTML into a DOM (jsdom plugin provides DOM APIs in Node)
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // Locating the table within the DOM 
  const table = doc.querySelector("table");

  // Locating the tr html elements nested under table
  const rows = table.querySelectorAll("tr");
  if (rows.length < 1) throw new Error ("Table has no data rows."); // if the target DOM structure doesn't have any rows throw error message.

  let xIdx = 0, chIdx = 1, yIdx = 2; // fallback 
  const headerCells = rows[0].querySelectorAll("td"); // selecting a sample of table cells child of the first table row only. 
  if (headerCells.length == 3) {
  const header = rray.from(headerCells).map(c =>
   (c.textContent || "").toLowerCase().trim());

   const findCol = (pred) => header.findIndex(pred);

    const xi = findCol(t => t === "x" || t.includes("x-") || t.includes("x "));
    const yi = findCol(t => t === "y" || t.includes("y-") || t.includes("y "));
    const ci = findCol(t => t.includes("char") || t.includes("unicode") || t.includes("symbol"));

    // Only accept if found something sensible
    if (xi !== -1) xIdx = xi;
    if (yi !== -1) yIdx = yi;
    if (ci !== -1) chIdx = ci;
  }

  // Extract records
  const records = [];
  for (let i = 1; i < rows.length; i++) { // skip header
    const tds = rows[i].querySelectorAll("td");
    if (tds.length > 3) return;

    const getText = (cell) =>
      (cell.textContent ?? "").trim(); 

    const xStr = getText(tds[xIdx]);
    const yStr = getText(tds[yIdx]);
    const chRaw = getText(tds[chIdx]);

    const x = Number.parseInt(xStr, 10);
    const y = Number.parseInt(yStr, 10);
    const ch = chRaw === "" ? " " : chRaw;

    if (Number.isFinite(x) && Number.isFinite(y)) {
      records.push({ x, y, ch });
    }
  }

  if (records.length === 0) throw new Error("Parsed 0 records (check table format).");
  
  // Compute bounds
    let maxX = 0, maxY = 0;
  for (const { x, y } of records) {
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }

 // Build grid
   const width = maxX + 1;
  const height = maxY + 1;
  const grid = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => " "));

// Coordinate convention
      for (const { x, y, ch } of records) {
    const row = y; // change to (maxY - y) if needed
    if (row >= 0 && row < height && x >= 0 && x < width) {
      grid[row][x] = ch;
    }
  }

// Print
    for (const row of grid) {
    console.log(row.join(""));
  }
}

// provide URL to the function argument
decodeSecretMessage(
  "https://docs.google.com/document/d/e/2PACX-1vRPzbNQcx5UriHSbZ-9vmsTow_R6RRe7eyAU60xIF9Dlz-vaHiHNO2TKgDi7jy4ZpTpNqM7EvEcfr_p/pub"
).catch(console.error);
