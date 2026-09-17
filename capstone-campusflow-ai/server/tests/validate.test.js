const test = require('node:test');
const assert = require('node:assert/strict');
const { text, enumValue } = require('../middleware/validate');

test('text validator accepts valid bounded text', () => {
  assert.equal(text('CampusFlow', 'title', { min: 2, max: 20 }), null);
});

test('text validator rejects oversized input', () => {
  assert.match(text('x'.repeat(21), 'title', { min: 2, max: 20 }), /must not exceed/);
});

test('enum validator rejects unsupported values', () => {
  assert.match(enumValue('owner', 'role', ['student', 'faculty', 'admin']), /must be one of/);
});
