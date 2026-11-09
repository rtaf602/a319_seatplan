/* Copies the seat plan layout into apps-script/Code.gs so the Google Sheet and the Excel export always match:
 *   - export-excel.js                      -> between the LAYOUT markers
 *   - Galley / ห้องน้ำ data in index.html   -> between the EQ DATA markers (wrapped in seatEq_())
 * Run after changing export-excel.js or the Galley / ห้องน้ำ data:  node tools/build-code-gs.js
 */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const gsPath = path.join(root, 'apps-script', 'Code.gs');
let gs = fs.readFileSync(gsPath, 'utf8');

function between(text, start, end, what) {
  const a = text.indexOf(start), b = text.indexOf(end, a + 1);
  if (a < 0 || b < a) throw new Error(what + ' markers not found');
  return [a, b];
}
function replaceBlock(start, end, body) {
  const [a, b] = between(gs, start, end, 'Code.gs ' + start);
  gs = gs.slice(0, a + start.length) + '\n' + body + '\n' + gs.slice(b);
}

// 1) export-excel.js
replaceBlock('// ===== LAYOUT: copied from export-excel.js by tools/build-code-gs.js (do not edit here) =====', '// ===== END LAYOUT =====',
  fs.readFileSync(path.join(root, 'export-excel.js'), 'utf8').trim());

// 2) Galley / ห้องน้ำ data from index.html
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const s = '/* ===== EQ DATA', e = '/* ===== END EQ DATA ===== */';
const [a, b] = between(html, s, e, 'index.html EQ DATA');
const eqSrc = html.slice(html.indexOf('\n', a) + 1, b).trim();
replaceBlock('// ===== EQ DATA: copied from index.html by tools/build-code-gs.js (do not edit here) =====', '// ===== END EQ DATA =====',
  'function seatEq_() {\n' + eqSrc + '\nreturn { GLAYOUT: GLAYOUT, GALLEYS: GALLEYS, LAVS: LAVS, TYPES: TYPES, TYPE_ORDER: TYPE_ORDER };\n}');

fs.writeFileSync(gsPath, gs);
console.log('Code.gs updated from export-excel.js and index.html (EQ DATA)');
