const COPYLEFT = ['GPL', 'AGPL', 'LGPL', 'GPL-2.0', 'GPL-3.0', 'AGPL-3.0', 'LGPL-3.0'];
const PERMISSIVE = ['MIT', 'Apache-2.0', 'BSD-2-Clause', 'BSD-3-Clause', 'ISC', '0BSD', 'Unlicense'];
export function classify(license = '') {
  const l = String(license || 'UNKNOWN');
  if (!license || /unknown|other|none/i.test(l)) return { risk: 'unknown', explanation: 'License could not be determined — review manually before shipping.' };
  if (COPYLEFT.some((c) => l.toUpperCase().includes(c))) return { risk: 'copyleft', explanation: 'Copyleft licenses may require releasing derivative source under similar terms.' };
  if (PERMISSIVE.some((p) => l.includes(p))) return { risk: 'low', explanation: 'Permissive license — usually safe with attribution.' };
  return { risk: 'review', explanation: 'Uncommon license string — confirm obligations with legal/compliance guidance.' };
}
export function parseRepo(url = '') {
  const m = String(url).match(/github\.com\/([^/]+)\/([^/#?]+)/i);
  if (!m) return null;
  return { owner: m[1], repo: m[2].replace(/\.git$/, '') };
}
