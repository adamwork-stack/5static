/**
 * CMS Content Injection
 * Fetches JSON from content/ and injects into elements with data-cms attribute
 */

(function () {
  'use strict';

  const CONTENT_BASE = 'content/';

  const PAGE_TO_FILE = {
    'index.html': 'home.json',
    'home.html': 'home.json',
    'about.html': 'about.json',
    'services.html': 'services.json',
    'case-studies.html': 'case-studies.json',
    'contact.html': 'contact.json'
  };

  function getCurrentPage() {
    const path = window.location.pathname;
    if (path.endsWith('/') || path === '' || path === '/') return 'index.html';
    const parts = path.split('/');
    const last = parts[parts.length - 1];
    return last || 'index.html';
  }

  function getContentPath(filename) {
    const base = window.location.pathname;
    const lastSlash = base.lastIndexOf('/');
    const dir = lastSlash >= 0 ? base.substring(0, lastSlash + 1) : './';
    return (dir || './') + CONTENT_BASE + filename;
  }

  async function fetchJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error('Failed to fetch ' + path);
    return res.json();
  }

  function injectContent(data) {
    document.querySelectorAll('[data-cms]').forEach((el) => {
      const key = el.getAttribute('data-cms');
      const value = data[key];
      if (value === undefined) return;

      const attr = el.getAttribute('data-cms-attr');
      const attrPrefix = el.getAttribute('data-cms-attr-prefix') || '';

      if (attr) {
        el.setAttribute(attr, attrPrefix + value);
        if (attr === 'href' && el.tagName === 'A') {
          el.textContent = value;
        }
      } else {
        el.textContent = value;
      }
    });
  }

  async function loadContent() {
    const page = getCurrentPage();
    const contentFile = PAGE_TO_FILE[page];
    const settingsPath = getContentPath('settings.json');

    try {
      const [settings, pageData] = await Promise.all([
        fetchJSON(settingsPath),
        contentFile ? fetchJSON(getContentPath(contentFile)) : {}
      ]);

      const merged = { ...settings, ...pageData };
      injectContent(merged);
    } catch (err) {
      console.warn('CMS content load failed:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadContent);
  } else {
    loadContent();
  }
})();
