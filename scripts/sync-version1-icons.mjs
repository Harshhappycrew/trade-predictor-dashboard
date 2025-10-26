#!/usr/bin/env node

/**
 * Sync Icons between Version-1 and main project
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');
const version1PublicDir = path.join(rootDir, 'Version-1', 'public');
const mainPublicDir = path.join(rootDir, 'public');

console.log('🔄 Syncing icons between Version-1 and main project...\n');

// Create directories if they don't exist
if (!fs.existsSync(mainPublicDir)) {
  fs.mkdirSync(mainPublicDir, { recursive: true });
}

// Files to sync
const filesToSync = ['favicon.ico', 'robots.txt', 'placeholder.svg'];

let synced = 0;
let skipped = 0;

filesToSync.forEach(file => {
  const sourcePath = path.join(version1PublicDir, file);
  const destPath = path.join(mainPublicDir, file);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✓ Synced ${file}`);
    synced++;
  } else {
    console.log(`⊘ Skipped ${file} (not found in Version-1)`);
    skipped++;
  }
});

console.log(`\n✨ Sync complete! ${synced} files synced, ${skipped} skipped.`);
