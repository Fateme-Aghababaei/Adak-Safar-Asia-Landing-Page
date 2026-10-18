const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const code = fs.readFileSync('public/theme.js', 'utf8');
function boot(dark, { legacy = false, unavailable = false } = {}) {
  const events = {}, documentEvents = {}, meta = {};
  let onChange;
  const media = { matches: dark };
  if (legacy) media.addListener = fn => { onChange = fn; };
  else media.addEventListener = (name, fn) => { assert.equal(name, 'change'); onChange = fn; };
  const document = {
    documentElement: { dataset: {}, style: {} },
    querySelector: selector => ({ setAttribute: (name, value) => { meta[selector] = value; } }),
    addEventListener: (name, fn) => { documentEvents[name] = fn; },
  };
  const window = {
    document,
    addEventListener: (name, fn) => { events[name] = fn; },
    get localStorage() { throw Error('System appearance must not access stored preferences'); },
  };
  if (!unavailable) window.matchMedia = query => { assert.equal(query, '(prefers-color-scheme: dark)'); return media; };
  vm.runInNewContext(code, { window });
  return { document, meta, media, events, documentEvents, change(dark) { media.matches = dark; onChange(); } };
}
test('initial appearance follows the system before DOMContentLoaded', () => {
  for (const dark of [false, true]) {
    const app = boot(dark);
    assert.equal(app.document.documentElement.dataset.theme, dark ? 'dark' : 'light');
    assert.equal(app.meta['meta[name="theme-color"]'], dark ? '#0B1928' : '#F5F7FA');
  }
});
test('system appearance changes update the page immediately in both directions', () => {
  const app = boot(false);
  app.change(true); assert.equal(app.document.documentElement.dataset.theme, 'dark');
  app.change(false); assert.equal(app.document.documentElement.dataset.theme, 'light');
});
test('restoring a page resynchronizes appearance and browser colors', () => {
  const app = boot(false);
  app.media.matches = true;
  app.documentEvents.DOMContentLoaded();
  assert.equal(app.meta['meta[name="msapplication-navbutton-color"]'], '#0B1928');
  app.media.matches = false; app.documentEvents.visibilitychange();
  assert.equal(app.document.documentElement.dataset.theme, 'light');
  app.media.matches = false; app.events.focus();
  assert.equal(app.document.documentElement.dataset.theme, 'light');
  app.media.matches = true; app.events.pageshow();
  assert.equal(app.document.documentElement.dataset.theme, 'dark');
});
test('legacy media listeners work and missing matchMedia defaults to light', () => {
  const app = boot(false, { legacy: true });
  app.change(true); assert.equal(app.document.documentElement.dataset.theme, 'dark');
  assert.equal(boot(true, { unavailable: true }).document.documentElement.dataset.theme, 'light');
});

test('CSS follows system appearance directly without a JavaScript theme override', () => {
  const css = fs.readFileSync('style.css', 'utf8');
  assert.match(css, /@media \(prefers-color-scheme: dark\)\s*\{\s*:root\s*\{/);
  assert.equal(css.includes(':root[data-theme='), false);
  assert.equal(code.includes('html.style.colorScheme'), false);
});
