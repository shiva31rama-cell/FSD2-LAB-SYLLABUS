const test = require('node:test');
const assert = require('node:assert/strict');
const { chunkText, normalizeText } = require('../services/chunkText');

test('normalizeText removes repeated whitespace without changing meaning', () => {
  assert.equal(normalizeText('  Campus\n\n\nFlow   AI  '), 'Campus\n\nFlow AI');
});

test('chunkText returns one chunk for short content', () => {
  assert.deepEqual(chunkText('CampusFlow AI'), ['CampusFlow AI']);
});

test('chunkText creates bounded overlapping chunks for long content', () => {
  const input = Array.from({ length: 80 }, (_, i) => `Sentence ${i}.`).join(' ');
  const size = 220;
  const overlap = 30;
  const chunks = chunkText(input, { size, overlap });

  assert.ok(chunks.length > 1);
  assert.ok(chunks.every(chunk => chunk.length <= size));
  assert.equal(chunks.join(' ').includes('Sentence 79.'), true);
});
