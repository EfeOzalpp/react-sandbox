// selecting specific classes returning strings

// $= for ending, ^= for starting *= containing. main[data-key^="7"][data-key$="1"] means = 7*1

//example 1:

const query1 = document.querySelectorAll('article[id^="x"][id$="9"] section[data-zone$="alpha"] span[data-ref^="m"][data-ref*="3"] em.char[data-char]');

[...query1].map(em => em.getAttribute("data-char")).join("")

//example 2:

const query2 = document.querySelectorAll('article[data-k^="r"][data-k$="7"] section[data-scope$="east"][data-live="true"] div[data-box*="x1"]:not([data-decoy]) p[data-n^="0"] span.u[data-on="1"][data-u]');

const url = [...query2]
  .filter(span => {const p = span.closest('p[data-n]');
    if (!p) return false; // return if p is undefined

    const n = parseInt(p.getAttribute('data-n'), 10);
    if (Number.isNaN(n) || n % 2 !== 0) return false; // guard against undefined return

    const article = span.closest('article[data-k^="r"][data-k$="7"]');
    if (!article) return false;

    return article.querySelectorAll('aside[data-proof="ok"]').length === 1;
  })
  .map(span => (span.getAttribute('data-u') || '')[0] || '').join('');
url;
