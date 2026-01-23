/**
 * Goal:
 * - Take messy DOM structure (cells in some order)
 * - Extract meaning ("x", "y", "char")
 * - Rebuild a clean JS object { x, y, char }
 *
 * IMPORTANT: This file demonstrates the separation:
 *   1) DOM APIs (environment/browser) = querySelectorAll, dataset, textContent
 *   2) JavaScript language syntax     = const, let, for, =>, {}, [], ., ()
 *   3) JavaScript built-ins/methods   = Array.from, map, find, parseInt, trim
 */

/* =========================
   EXAMPLE HTML (imagine this is already in the page)
   <tr id="row1">
     <td data-type="y">5</td>
     <td data-type="x">2</td>
     <td data-type="char">K</td>
   </tr>
   ========================= */


/* ============================================================
   STEP 0: get a DOM element (DOM API)
   ============================================================ */

// DOM API: document.getElementById exists because the environment (browser) provides "document"
const row = document.getElementById("row1"); // row is a DOM Element object (HTMLTableRowElement)


/* ============================================================
   STEP 1: SELECT NODES (DOM API) — structure only, no meaning yet
   ============================================================ */

// DOM API: querySelectorAll is a method on DOM elements.
// JS syntax: const, =, ., (), "..."
const tds = row.querySelectorAll("td"); // returns NodeList (array-like DOM collection)

// At this point: tds is a NodeList of ELEMENTS, not strings.
// tds[0] is a <td> element node, not "5".
// JS syntax: indexing with [0]
const firstTdNode = tds[0]; // DOM Element (HTMLTableCellElement)


/* ============================================================
   STEP 2: EXTRACT SEMANTICS (DOM API + JS built-ins)
   Convert DOM nodes -> plain JS objects
   ============================================================ */

// JS built-in: Array.from converts an array-like collection (NodeList) to a real Array.
// JS built-in: .map transforms each item in an array.
// JS syntax: arrow function td => ...
const cells = Array.from(tds).map(td => {
  // DOM API: td.dataset reads all data-* attributes as strings.
  // Example: data-type="x" -> td.dataset.type === "x"
  const type = td.dataset.type; // string, e.g. "x" or "y" or "char"

  // DOM API: td.textContent returns all text under this td as a JS string.
  // JS built-in (String method): trim() removes leading/trailing whitespace.
  const value = td.textContent.trim(); // string, e.g. "2" or "5" or "K"

  // JS syntax: object literal { ... }
  return { type, value };
});

// Now `cells` is pure JS data (no DOM objects):
// [
//   { type: "y", value: "5" },
//   { type: "x", value: "2" },
//   { type: "char", value: "K" }
// ]


/* ============================================================
   STEP 3: REBUILD IN YOUR LOGICAL ORDER (pure JS logic)
   Now DOM is “gone” because we operate only on JS values.
   ============================================================ */

// JS built-in (Array method): find(...) searches an array for first match.
// JS syntax: arrow function c => ...
// JS syntax: property access with dot: c.type, c.value
const xStr = cells.find(c => c.type === "x").value;     // "2"
const yStr = cells.find(c => c.type === "y").value;     // "5"
const ch   = cells.find(c => c.type === "char").value;  // "K"

// JS global function: parseInt(string, 10) converts a string to an integer.
const ordered = {
  x: parseInt(xStr, 10), // 2 (number)
  char: ch,              // "K" (string)
  y: parseInt(yStr, 10)  // 5 (number)
};

// `ordered` is now a clean semantic object you control:
// { x: 2, char: "K", y: 5 }


/* ============================================================
   DOT ACCESS (item.item) — what it is and when it is used
   ============================================================ */

/**
 * IMPORTANT: `obj.prop` (dot access) is ALWAYS the same JS operation:
 * "read the property named 'prop' on obj".
 *
 * The *meaning* depends on what obj is:
 * - If obj is a DOM element: obj.textContent is a DOM API property.
 * - If obj is your own object: obj.type is YOUR data field.
 * - If obj is an array/string: obj.length or obj.trim() are built-ins.
 */

// Example A: dot access for YOUR OWN DATA (scoping/meaning)
const cell0 = cells[0];      // { type: "...", value: "..." } (plain JS object)
const t0 = cell0.type;       // YOUR field "type"
const v0 = cell0.value;      // YOUR field "value"

// Example B: dot access for DOM API (environment-provided)
const domText = firstTdNode.textContent; // DOM API property returns string
const domType = firstTdNode.dataset.type; // DOM API dataset bridge to data-* attributes

// Example C: dot access for JS built-ins (operations on built-in types)
const s = "  hi  ";
const trimmed = s.trim(); // String method (JS built-in)
const len = trimmed.length; // length property exists on strings/arrays

const arr = ["a", "b", "c"];
const joined = arr.join("-"); // Array method (JS built-in), returns "a-b-c"
const arrLen = arr.length;    // Array length

// NOTE: `length` is a property, `trim()` and `join()` are functions.
// Property access uses dot; function call uses ().
// - arr.length   -> reads a number
// - arr.join(...) -> calls a function that returns a new string


/* ============================================================
   QUICK “CHEAT SHEET” IN CODE: DOM API vs JS built-ins vs syntax
   ============================================================ */

// --- DOM API examples (provided by browser) ---
row.querySelectorAll("td");     // DOM API
firstTdNode.getAttribute("data-type"); // DOM API alternative to dataset
firstTdNode.parentElement;      // DOM API (tree navigation)
firstTdNode.children;           // DOM API (child elements collection)
firstTdNode.textContent;        // DOM API (text extraction)

// --- JavaScript built-ins/examples (language runtime) ---
Array.from(tds);                // JS built-in
cells.map(c => c.value);        // JS Array method
cells.find(c => c.type === "x");// JS Array method
parseInt("42", 10);             // JS global function
" hi ".trim();                  // JS String method
["x","y"].join(",");            // JS Array method
({ a: 1 }).hasOwnProperty("a"); // JS Object method

// --- JavaScript syntax/examples (grammar; not “callable”) ---
/*
const / let / for / if / return / => / {} / [] / () / . / =
These are not values you can pass around. They shape how code is written.
*/


/* ============================================================
   OPTIONAL: a cleaner / faster variant for Step 3 (pure JS)
   Build a lookup map in one pass (avoids multiple find calls)
   ============================================================ */

const byType = Object.fromEntries(
  cells.map(c => [c.type, c.value]) // JS built-ins: map + array literal
);

// Now access by meaning:
const ordered2 = {
  x: parseInt(byType.x, 10),
  char: byType.char,
  y: parseInt(byType.y, 10)
};

console.log({ ordered, ordered2 });
