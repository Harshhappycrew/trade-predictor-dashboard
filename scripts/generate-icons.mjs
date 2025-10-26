#!/usr/bin/env node

/**
 * Icon Generation Script for QuantEdge
 * Generates various icon sizes for web, PWA, and mobile
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICON_SIZES = [16, 32, 48, 64, 96, 128, 192, 256, 384, 512];

// SVG template for QuantEdge icon
const generateSVG = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="url(#grad1)"/>
  <g transform="translate(${size * 0.25}, ${size * 0.25}) scale(${size / 200})">
    <path d="M10 30 L40 10 L70 25 L100 5" stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="10" cy="30" r="5" fill="#ffffff"/>
    <circle cx="40" cy="10" r="5" fill="#ffffff"/>
    <circle cx="70" cy="25" r="5" fill="#ffffff"/>
    <circle cx="100" cy="5" r="5" fill="#ffffff"/>
  </g>
</svg>
`;

const publicDir = path.join(__dirname, '..', 'public');
const testDir = path.join(__dirname, '..', 'test_2');

// Create directories if they don't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}

console.log('🎨 Generating QuantEdge icons...\n');

// Generate favicon.svg
const faviconPath = path.join(publicDir, 'favicon.svg');
fs.writeFileSync(faviconPath, generateSVG(32).trim());
console.log(`✓ Created ${faviconPath}`);

// Generate test icons
const testFaviconPath = path.join(testDir, 'favicon.svg');
fs.writeFileSync(testFaviconPath, generateSVG(32).trim());
console.log(`✓ Created ${testFaviconPath}`);

console.log('\n✨ Icon generation complete!');
console.log('\nGenerated files:');
console.log(`  - public/favicon.svg`);
console.log(`  - test_2/favicon.svg`);
