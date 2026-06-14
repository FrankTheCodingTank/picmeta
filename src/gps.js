/**
 * GPS coordinate parser and formatter.
 *
 * BUG (#3): The DMS-to-decimal conversion truncates seconds to integer
 * before dividing by 3600, losing sub-second precision. For a coordinate
 * like 43° 39' 11.52" N, the parser returns 43.6532° instead of 43.65320°
 * — a ~30m error at mid-latitudes.
 *
 * The seconds field in EXIF GPS is stored as a RATIONAL (two uint32),
 * so it CAN carry fractional seconds. We're just dropping them.
 */

/**
 * Convert DMS (degrees, minutes, seconds) to decimal degrees.
 *
 * @param {number} degrees
 * @param {number} minutes
 * @param {number} seconds — BUG: truncated to int before conversion
 * @param {string} ref — N/S/E/W
 * @returns {number} decimal degrees
 */
export function dmsToDecimal(degrees, minutes, seconds, ref) {
  // BUG: Math.floor truncates fractional seconds
  const secs = Math.floor(seconds);
  const decimal = degrees + minutes / 60 + secs / 3600;
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
