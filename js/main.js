/**
 * Cybersecurity Consulting — Main JS
 * Nav, footer, responsive behavior, mobile menu
 */

(function () {
  'use strict';

  const HEADER_HEIGHT = 72;

  // Nav links (Case Studies excluded from menu)
  const navLinks = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'services.html', label: 'Services' },
    { href: 'contact.html', label: 'Contact' }
  ];

  /**
   * Get current page path for active nav state
   */
  function getCurrentPage() {
    const path = window.location.pathname;
    if (path.endsWith('/') || path.endsWith('/index.html') || path === '') return 'index.html';
    const parts = path.split('/');
    return parts[parts.length - 1] || 'index.html';
  }

  /**
   * Render nav (desktop)
   */
  function renderNav(container) {
    if (!container) return;
    const current = getCurrentPage();
    container.innerHTML = navLinks
      .map(
        (link) =>
          `<a href="${link.href}" class="nav__link${current === link.href ? ' nav__link--active' : ''}">${link.label}</a>`
      )
      .join('');
  }

  /**
   * Render mobile nav overlay
   */
  function renderNavOverlay(container) {
    if (!container) return;
    const current = getCurrentPage();
    container.innerHTML = `
      <nav class="nav-overlay__links" aria-label="Mobile navigation">
        ${navLinks
          .map(
            (link) =>
              `<a href="${link.href}" class="nav-overlay__link${current === link.href ? ' nav__link--active' : ''}">${link.label}</a>`
          )
          .join('')}
      </nav>
    `;
  }

  /**
   * Mobile menu toggle
   */
  function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const overlay = document.getElementById('nav-overlay');
    const body = document.body;

    if (!toggle || !overlay) return;

    toggle.addEventListener('click', function () {
      const isOpen = overlay.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
      body.style.overflow = isOpen ? 'hidden' : '';
    });

    overlay.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        overlay.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      });
    });
  }

  /**
   * Render header
   */
  function renderHeader(container) {
    if (!container) return;
    container.innerHTML = `
      <header class="header">
        <div class="container header__inner">
          <a href="index.html" class="header__logo" data-cms="site_name">Cybersecurity Consulting</a>
          <nav class="nav" aria-label="Main navigation" id="nav-desktop"></nav>
          <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-overlay" aria-label="Toggle menu">
            <span class="nav-toggle__bar"></span>
            <span class="nav-toggle__bar"></span>
            <span class="nav-toggle__bar"></span>
          </button>
        </div>
        <div class="nav-overlay" id="nav-overlay" aria-hidden="true"></div>
      </header>
    `;
    renderNav(document.getElementById('nav-desktop'));
    renderNavOverlay(document.getElementById('nav-overlay'));
    initMobileMenu();
  }

  /**
   * Render footer
   */
  function renderFooter(container) {
    if (!container) return;
    const year = new Date().getFullYear();
    container.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer__grid">
            <div>
              <div class="footer__brand" data-cms="site_name">Cybersecurity Consulting</div>
              <p class="footer__copy" data-cms="footer_copy">&copy; ${year} All rights reserved.</p>
            </div>
            <ul class="footer__links">
              ${navLinks
                .map((link) => `<li><a href="${link.href}" class="footer__link">${link.label}</a></li>`)
                .join('')}
            </ul>
          </div>
        </div>
      </footer>
    `;
  }

  /**
   * Init
   */
  function init() {
    renderHeader(document.getElementById('header-root'));
    renderFooter(document.getElementById('footer-root'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
