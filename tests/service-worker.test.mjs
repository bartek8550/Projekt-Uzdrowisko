import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const worker = await readFile(new URL('../public/sw.js', import.meta.url), 'utf8');

test('service worker usuwa stare cache i nie przechowuje HTML ani skanów', () => {
  assert.match(worker, /startsWith\(CACHE_PREFIX\)/);
  assert.match(worker, /pathname\.startsWith\('\/assets\/'\)/);
  assert.doesNotMatch(worker, /mode === ['"]navigate['"]/);
  assert.doesNotMatch(worker, /index\.html|HannaNow|manifest\.webmanifest|robots\.txt/);
});
