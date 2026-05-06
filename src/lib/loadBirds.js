import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export function loadBirds() {
  const filePath = path.join(process.cwd(), 'data/sara-birding-all-birds.csv');
  const file = fs.readFileSync(filePath);

  const records = parse(file, {
    columns: true,
    skip_empty_lines: true,
  });
  const parseBool = (value) => {
    return String(value).trim().toUpperCase() === 'TRUE';
  };
  return records.map((bird) => ({
    ...bird,
    photo: bird.photo && bird.photo.toLowerCase() !== 'null' ? bird.photo : null,
    found: parseBool(bird.found),
  }));
}
