import { Router } from 'express';
import Scan from '../models/Scan.js';
import { auth } from '../middleware/auth.js';
import { classify, parseRepo } from '../utils/licenses.js';
const r = Router();
r.use(auth);
r.get('/', async (req, res) => res.json(await Scan.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(30)));
r.get('/:id', async (req, res) => res.json(await Scan.findOne({ _id: req.params.id, user: req.user.id })));
r.post('/', async (req, res) => {
  const parsed = parseRepo(req.body.repoUrl);
  if (!parsed) return res.status(400).json({ message: 'Provide a public GitHub repo URL' });
  const pkgUrl = 'https://raw.githubusercontent.com/' + parsed.owner + '/' + parsed.repo + '/HEAD/package.json';
  let pkg;
  try {
    const resp = await fetch(pkgUrl);
    if (!resp.ok) throw new Error('package.json not found');
    pkg = await resp.json();
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  const out = [];
  for (const [name, version] of Object.entries(deps || {})) {
    let license = 'UNKNOWN';
    try {
      const meta = await fetch('https://registry.npmjs.org/' + encodeURIComponent(name));
      if (meta.ok) {
        const j = await meta.json();
        const ver = j['dist-tags']?.latest;
        license = j.versions?.[ver]?.license || j.license || 'UNKNOWN';
        if (typeof license === 'object') license = license.type || 'UNKNOWN';
      }
    } catch {}
    const { risk, explanation } = classify(String(license));
    out.push({ name, version: String(version), license: String(license), risk, explanation });
  }
  const summary = {
    total: out.length,
    copyleft: out.filter((d) => d.risk === 'copyleft').length,
    unknown: out.filter((d) => d.risk === 'unknown').length,
    low: out.filter((d) => d.risk === 'low').length
  };
  const scan = await Scan.create({ user: req.user.id, repoUrl: req.body.repoUrl, deps: out, summary });
  res.status(201).json(scan);
});
r.get('/:id/export.csv', async (req, res) => {
  const scan = await Scan.findOne({ _id: req.params.id, user: req.user.id });
  if (!scan) return res.status(404).end();
  const rows = ['name,version,license,risk,explanation', ...scan.deps.map((d) => d.name + ',' + d.version + ',"' + d.license + '",' + d.risk + ',"' + d.explanation + '"')];
  res.setHeader('Content-Type', 'text/csv');
  res.send(rows.join('\n'));
});
export default r;
