function normalizeText(value) {
  return String(value || '')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function chunkText(value, options = {}) {
  const text = normalizeText(value);
  const size = Math.min(Math.max(Number(options.size) || 900, 200), 4000);
  const overlap = Math.min(Math.max(Number(options.overlap) || 120, 0), Math.floor(size / 3));

  if (!text) return [];
  if (text.length <= size) return [text];

  const chunks = [];
  let start = 0;

  while (start < text.length) {
    let end = Math.min(start + size, text.length);

    if (end < text.length) {
      const boundaryLimit = end - 1;
      const paragraphBoundary = text.lastIndexOf('\n\n', boundaryLimit);
      const sentenceBoundary = text.lastIndexOf('. ', boundaryLimit);
      const boundary = Math.max(paragraphBoundary, sentenceBoundary);

      if (boundary > start + Math.floor(size * 0.6)) {
        end = Math.min(size + start, boundary + (text[boundary] === '.' ? 1 : 0));
      }
    }

    const chunk = text.slice(start, end).trim();
    if (chunk) chunks.push(chunk);
    if (end >= text.length) break;

    start = Math.max(end - overlap, start + 1);
  }

  return chunks;
}

module.exports = { chunkText, normalizeText };
