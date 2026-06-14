/**
 * Minimal EXIF parser stub.
 *
 * In production this reads JPEG APP1 markers and parses IFD entries.
 * For the test suite we use pre-extracted metadata objects.
 */

/**
 * Parse EXIF data from a file path.
 *
 * @param {string} filePath
 * @returns {object} parsed EXIF metadata
 */
export function parseExif(filePath) {
  // Stub: in a real implementation this reads the binary EXIF data.
  // Tests supply pre-extracted metadata objects directly to formatGPS/formatDate.
  throw new Error(
    `parseExif('${filePath}'): binary EXIF parsing not yet implemented. ` +
    'Use formatGPS/formatDate with pre-extracted metadata objects for now.'
  );
}
