import { parseExifDate, formatDate } from '../src/date.js';
import assert from 'node:assert/strict';

// Basic date parsing
const parsed = parseExifDate('2024:03:15 14:30:22');
assert.equal(parsed.year, 2024);
assert.equal(parsed.month, 3);
assert.equal(parsed.day, 15);
assert.equal(parsed.hour, 14);
assert.equal(parsed.minute, 30);
assert.equal(parsed.second, 22);

// Format without offset
const formatted = formatDate('2024:03:15 14:30:22');
assert.equal(formatted, '2024-03-15 14:30:22');

// BUG: format with offset — offset is IGNORED
const withOffset = formatDate('2024:03:15 14:30:22', '-05:00');
// This SHOULD produce something indicating EST/UTC-5
// But currently just returns the same as without offset
assert.equal(withOffset, '2024-03-15 14:30:22', 'BUG: offset ignored');

// Invalid date
assert.equal(parseExifDate('not a date'), null);
assert.equal(formatDate(null), 'Invalid date');

console.log('EXIF date tests passed (known offset bug)');
