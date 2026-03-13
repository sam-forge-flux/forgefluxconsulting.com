/* ============================================================
   Forge & Flux Consulting — main.js
   Handles: mobile nav, Calendly popup, active nav link
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Mobile navigation toggle
  ---------------------------------------------------------- */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');

      // Animate hamburger → X
      const bars = hamburger.querySelectorAll('.bar');
      bars.forEach(function (bar) { bar.classList.toggle('open'); });
    });

    // Close menu when any nav link is clicked (mobile UX)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open menu');
        hamburger.querySelectorAll('.bar').forEach(function (bar) {
          bar.classList.remove('open');
        });
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      const nav = document.querySelector('.site-nav');
      if (nav && !nav.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open menu');
        hamburger.querySelectorAll('.bar').forEach(function (bar) {
          bar.classList.remove('open');
        });
      }
    });
  }

  /* ----------------------------------------------------------
     Active nav link — highlight current page
  ---------------------------------------------------------- */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/index.html';
  const navAnchors  = document.querySelectorAll('.nav-links a');

  navAnchors.forEach(function (anchor) {
    const href = anchor.getAttribute('href');
    if (!href) return;

    // Normalize: treat "/" and "/index.html" as the same
    const hrefNorm = href.replace(/\/$/, '') || '/index.html';

    if (
      currentPath === hrefNorm ||
      currentPath.endsWith(hrefNorm) ||
      (hrefNorm === 'index.html' && (currentPath === '' || currentPath.endsWith('/')))
    ) {
      anchor.classList.add('active');
    }
  });

  /* ----------------------------------------------------------
     Calendly helpers
  ---------------------------------------------------------- */

  var CALENDLY_URL = 'https://calendly.com/sam-forgefluxconsulting/30min';

  /**
   * Opens the Calendly popup widget.
   * Called by onclick="openCalendly()" on CTA buttons.
   */
  window.openCalendly = function (url) {
    var target = url || CALENDLY_URL;
    if (typeof Calendly !== 'undefined' && Calendly.initPopupWidget) {
      Calendly.initPopupWidget({ url: target });
    } else {
      // Graceful fallback if Calendly script hasn't loaded
      window.open(target, '_blank', 'noopener,noreferrer');
    }
  };

  /* ----------------------------------------------------------
     Smooth scroll for same-page anchor links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
