import { dmsToDecimal, parseGPS, formatGPS } from '../src/gps.js';
import assert from 'node:assert/strict';

// Toronto CN Tower — known coordinates: 43.6426° N, 79.3871° W
// EXIF GPS: 43° 38' 33.36" N, 79° 23' 13.56" W
const toronto = {
  latDeg: 43, latMin: 38, latSec: 33.36, latRef: 'N',
  lngDeg: 79, lngMin: 23, lngSec: 13.56, lngRef: 'W',
};

const coords = parseGPS(toronto);

// BUG: this test FAILS because seconds are truncated to int
// Expected: 43.6426, Actual: 43.6425 (off by ~10m)
assert.ok(
  Math.abs(coords.latitude - 43.6426) < 0.0001,
  `Latitude precision: expected ~43.6426, got ${coords.latitude}`
);

// BUG: same truncation issue on longitude
assert.ok(
  Math.abs(coords.longitude - (-79.3871)) < 0.0001,
  `Longitude precision: expected ~-79.3871, got ${coords.longitude}`
);

// Format check
const formatted = formatGPS(coords);
assert.ok(formatted.includes('N'), `Should contain N: ${formatted}`);
assert.ok(formatted.includes('W'), `Should contain W: ${formatted}`);

// Integer seconds (no bug) — should still pass
const intCoords = parseGPS({
  latDeg: 40, latMin: 42, latSec: 46, latRef: 'N',
  lngDeg: 74, lngMin: 0, lngSec: 22, lngRef: 'W',
});
assert.ok(
  Math.abs(intCoords.latitude - 40.7128) < 0.001,
  `NYC latitude: expected ~40.7128, got ${intCoords.latitude}`
);

console.log('GPS tests passed (known precision issue with fractional seconds)');
