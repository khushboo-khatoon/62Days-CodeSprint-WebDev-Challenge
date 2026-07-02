/* eslint-disable no-console */
const { spawn } = require('child_process');

function spawnCmd(cmd, args, opts = {}) {
  console.log(`\n>> ${cmd} ${args.join(' ')}`);
  const child = spawn(cmd, args, { stdio: 'inherit', shell: false, ...opts });
  return child;
}

// Run in dev: Flask CV service + Node API + React UI
// Use local venv Python if available (keeps Flask deps isolated)
const pythonBin = process.env.VENV_PYTHON || (require('fs').existsSync('venv/bin/python3') ? 'venv/bin/python3' : 'python3');
const flask = spawnCmd(pythonBin, ['app.py'], { env: process.env });
const nodeApi = spawnCmd('node', ['server/server.js'], { env: process.env });
const react = spawnCmd('npm', ['start', '--prefix', 'client'], { env: process.env });

function shutdown(signal) {
  console.log(`\nShutting down (${signal})...`);
  for (const p of [flask, nodeApi, react]) {
    try {
      if (p && !p.killed) p.kill(signal);
    } catch (_) {}
  }
  process.exit(0);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

