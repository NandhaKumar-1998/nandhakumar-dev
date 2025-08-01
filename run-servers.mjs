import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting servers...\n');

// Path to json-server executable
const jsonServerPath = path.join(__dirname, 'node_modules', 'json-server', 'lib', 'cli', 'bin.js');

// Start JSON Server
const jsonServerCmd = `node "${jsonServerPath}" --watch db.json --port 3001 --routes routes.json`;
const jsonServerProcess = exec(jsonServerCmd, (err, stdout, stderr) => {
  if (err) console.error('JSON Server error:', err);
});

jsonServerProcess.stdout.on('data', (data) => {
  console.log('[JSON Server]', data.toString().trim());
});

// Give JSON server a moment to start, then start Next.js
setTimeout(() => {
  console.log('Starting Next.js...\n');
  const nextProcess = exec('npm run dev', (err, stdout, stderr) => {
    if (err) console.error('Next.js error:', err);
  });

  nextProcess.stdout.on('data', (data) => {
    console.log('[Next.js]', data.toString().trim());
  });

  nextProcess.stderr.on('data', (data) => {
    console.error('[Next.js Error]', data.toString().trim());
  });
}, 2000);

// Handle exit
process.on('SIGINT', () => {
  console.log('\nShutting down servers...');
  process.exit();
});