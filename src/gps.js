/**
 * GPS coordinate parser and formatter.
 *
 * The seconds field in EXIF GPS is stored as a RATIONAL (two uint32),
 * so it can carry fractional seconds.
 */

/**
 * Convert DMS (degrees, minutes, seconds) to decimal degrees.
 *
 * @param {number} degrees
 * @param {number} minutes
 * @param {number} seconds
 * @param {string} ref — N/S/E/W
 * @returns {number} decimal degrees
 */
export function dmsToDecimal(degrees, minutes, seconds, ref) {
  const decimal = degrees + minutes / 60 + seconds / 3600;
  return (ref === 'S' || ref === 'W') ? -decimal : decimal;
}

/**
 * Parse an EXIF GPS coordinate object to decimal lat/lng.
 *
 * @param {object} gps — { latDeg, latMin, latSec, latRef, lngDeg, lngMin, lngSec, lngRef }
 * @returns {{ latitude: number, longitude: number }}
 */
export function parseGPS(gps) {
  if (!gps || !gps.latDeg) return null;
  return {
    latitude: dmsToDecimal(gps.latDeg, gps.latMin, gps.latSec, gps.latRef),
    longitude: dmsToDecimal(gps.lngDeg, gps.lngMin, gps.lngSec, gps.lngRef),
  };
}

/**
 * Format a decimal coordinate pair for display.
 *
 * @param {{ latitude: number, longitude: number }} coords
 * @returns {string} e.g. "43.6532° N, 79.3832° W"
 */
export function formatGPS(coords) {
  if (!coords) return 'No GPS data';
  const latDir = coords.latitude >= 0 ? 'N' : 'S';
  const lngDir = coords.longitude >= 0 ? 'E' : 'W';
  return `${Math.abs(coords.latitude).toFixed(4)}° ${latDir}, ${Math.abs(coords.longitude).toFixed(4)}° ${lngDir}`;
}
