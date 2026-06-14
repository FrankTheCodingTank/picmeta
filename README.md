# picmeta

Lightweight EXIF and XMP metadata parser for Node.js. Extracts camera settings, GPS coordinates, timestamps, and custom tags from JPEG/TIFF/PNG files.

## Install

```bash
npm install picmeta
```

## Usage

```javascript
import { parseExif, formatGPS, formatDate } from 'picmeta';

const meta = parseExif('photo.jpg');

// GPS coordinates
console.log(formatGPS(meta.gps));
// → 43.6532° N, 79.3832° W

// Date taken
console.log(formatDate(meta.dateTimeOriginal));
// → 2024-03-15 14:30:22 (America/Toronto)

// Camera info
console.log(meta.make, meta.model);
// → Apple iPhone 15 Pro
```

## Supported Tags

| Tag | Field | Notes |
|-----|-------|-------|
| 0x010F | make | Camera manufacturer |
| 0x0110 | model | Camera model |
| 0x0132 | dateTime | File modification date |
| 0x9003 | dateTimeOriginal | Date photo was taken |
| 0x9004 | dateTimeDigitized | Date digitized |
| 0x8825 | gpsInfo | GPS IFD pointer |
| GPS tags | latitude, longitude, altitude | DMS or decimal |

## Known Issues

- **#3**: GPS coordinate parser truncates seconds to integer, losing ~30m precision
- **#3**: `formatDate` ignores the EXIF OffsetTimeOriginal tag (0x9011), returning UTC instead of local time

## Contributing

When reporting GPS/date bugs, include a sample image with known metadata so we can reproduce the exact parsing failure. See issue #3 for the current reproduction workflow.

## License

MIT
