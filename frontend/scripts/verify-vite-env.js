#!/usr/bin/env node
const required = [
  'VITE_API_BASE_URL',
  'VITE_GOOGLE_CLIENT_ID'
];

const missing = required.filter((k) => !process.env[k] || String(process.env[k]).trim() === '');
if (missing.length) {
  console.error(`Missing required Vite env variables: ${missing.join(', ')}`);
  process.exit(1);
}
console.log('Vite env check passed');

