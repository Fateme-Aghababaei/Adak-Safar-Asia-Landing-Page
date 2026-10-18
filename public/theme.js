/* Blocking bootstrap: follow system appearance before the first paint. */
(function (root) {
  'use strict';
  const systemTheme = root.matchMedia?.('(prefers-color-scheme: dark)');

  function apply() {
    // Re-read on page return as some browsers miss background change events.
    const theme = root.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const html = root.document.documentElement;
    html.dataset.theme = theme;
    for (const name of ['theme-color', 'msapplication-navbutton-color']) {
      root.document.querySelector(`meta[name="${name}"]`)?.setAttribute('content', theme === 'dark' ? '#0B1928' : '#F5F7FA');
    }
  }

  apply();
  if (systemTheme?.addEventListener) systemTheme.addEventListener('change', apply);
  else systemTheme?.addListener?.(apply);
  root.document.addEventListener('DOMContentLoaded', apply);
  root.document.addEventListener('visibilitychange', apply);
  root.addEventListener('pageshow', apply);
  root.addEventListener('focus', apply);
})(window);
