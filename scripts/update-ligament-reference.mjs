import { readFileSync, writeFileSync } from 'node:fs';

const source = process.argv[2];
if (!source) throw new Error('Usage: node scripts/update-ligament-reference.mjs SOURCE.md');

const regionSpecs = [
  ['shoulder', '肩', 8], ['elbow', '肘', 3], ['knee', '膝', 9], ['ankle', '踝', 6],
  ['anterior-hip', '骨盆髖前', 4], ['posterior-hip', '骨盆髖後', 4],
  ['spine', '脊椎', 3],
];
const fields = ['name', 'location', 'testMuscles', 'relatedMuscles', 'bonesAndMotion', 'symptoms'];
const columns = ['結構', '位置', '測試肌肉', '相關肌肉', '影響骨骼與動作', '可能症狀與表現'];
const splitRow = line => line.trim().slice(1, -1).split('|').map(cell => cell.trim());
const items = (value, separator) => value.split(separator).map(item => item.trim()).filter(Boolean);

function buildEntry(row) {
  const entry = Object.fromEntries(fields.map((field, j) => [field, row[j]]));
  const [tests, pairs = ''] = entry.testMuscles.split('<br>**常見配對：**');
  entry.testMuscles = tests === '—' ? [] : items(tests, '<br>');
  entry.relatedMuscles = entry.relatedMuscles === '—' ? [] : items(entry.relatedMuscles, '<br>');
  const commonPairs = items(pairs, '；');
  if (commonPairs.length) entry.commonPairs = commonPairs;
  return entry;
}
const [intro, ...sections] = readFileSync(source, 'utf8').trim().split(/^## /m);
const headings = [...regionSpecs.map(([, heading]) => heading), '資料來源', '給 Codex 的網頁實作指引'];
if (sections.map(section => section.split(/\r?\n/, 1)[0]).join('\n') !== headings.join('\n')) {
  throw new Error('Unexpected section headings or order');
}

const regions = regionSpecs.map(([id, name, count], i) => {
  const lines = sections[i].split(/\r?\n/).slice(1);
  const headerAt = lines.findIndex(line => line.startsWith('|'));
  const endAt = lines.findIndex((line, index) => index > headerAt && !line.startsWith('|'));
  const tableEnd = endAt === -1 ? lines.length : endAt;
  const rows = lines.slice(headerAt + 2, tableEnd).map(splitRow);
  if (headerAt < 0 || splitRow(lines[headerAt]).join('|') !== columns.join('|') ||
      rows.length !== count || rows.some(row => row.length !== fields.length || row.some(cell => !cell))) {
    throw new Error(`Unexpected table format or row count for ${name}`);
  }
  return {
    id, name,
    intro: lines.slice(0, headerAt).join('\n').trim(),
    entries: rows.map(buildEntry),
    notes: lines.slice(tableEnd).join('\n').trim(),
  };
});

const data = {
  columns: Object.fromEntries(fields.map((field, i) => [field, columns[i]])),
  intro: intro.split(/\r?\n/).slice(1).join('\n').trim(),
  regions,
  sources: sections[regions.length].split(/\r?\n/).slice(1).join('\n').trim(),
};
const file = new URL('../ligament-reference.html', import.meta.url);
const html = readFileSync(file, 'utf8');
const marker = /(<script type="application\/json" id="reference-data">)\n[\s\S]*?\n(<\/script>)/;
if (!marker.test(html)) throw new Error('Missing reference-data script');
const json = JSON.stringify(data, null, 2).replaceAll('<', '\\u003c');
writeFileSync(file, html.replace(marker, (_, start, end) => `${start}\n${json}\n${end}`));
console.log(`Generated ${regions.reduce((total, region) => total + region.entries.length, 0)} entries in ${regions.length} regions.`);
