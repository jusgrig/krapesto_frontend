(function () {
  'use strict';

  function initMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuClose = document.getElementById('mobile-menu-close');

    if (menuButton && mobileMenu) {
      menuButton.addEventListener('click', function (e) {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
        menuButton.setAttribute(
          'aria-expanded',
          mobileMenu.classList.contains('hidden') ? 'false' : 'true'
        );
      });
    }

    if (menuClose && mobileMenu) {
      menuClose.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        if (menuButton) {
          menuButton.setAttribute('aria-expanded', 'false');
        }
      });
    }

    document.addEventListener('click', function (e) {
      if (
        mobileMenu &&
        menuButton &&
        !mobileMenu.contains(e.target) &&
        !menuButton.contains(e.target)
      ) {
        mobileMenu.classList.add('hidden');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function initLanguageSwitcher() {
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const lang = this.getAttribute('data-lang-btn');
        if (window.Language) {
          window.Language.set(lang);
        }
      });
    });
  }

  function initDropdowns() {
    const toggles = document.querySelectorAll('[data-dropdown-toggle]');
    
    toggles.forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const targetId = this.getAttribute('data-dropdown-toggle');
        const dropdown = document.getElementById(targetId);
        if (!dropdown) return;

        // Close other dropdowns
        document.querySelectorAll('[data-dropdown]').forEach(function (el) {
          if (el !== dropdown) {
            el.classList.add('hidden');
          }
        });

        dropdown.classList.toggle('hidden');
      });
    });

    document.addEventListener('click', function (e) {
      document.querySelectorAll('[data-dropdown]').forEach(function (dropdown) {
        const toggle = document.querySelector(
          '[data-dropdown-toggle="' + dropdown.id + '"]'
        );

        if (
          !dropdown.contains(e.target) &&
          (!toggle || !toggle.contains(e.target))
        ) {
          dropdown.classList.add('hidden');
        }
      });
    });
  }

  // Define global init function to be called from layout.js
  window.initMain = function() {
    // initialize mobile menu and language switcher
    initMobileMenu();
    initLanguageSwitcher();

    // Dropdown handling: attach listeners to .dropdown-toggle (works after header is injected)
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const menu = toggle.nextElementSibling;
        // Close other menus first
        document.querySelectorAll('.dropdown-menu').forEach(m => {
          if (m !== menu) m.classList.add('hidden');
        });
        if (menu) menu.classList.toggle('hidden');
      });
    });

    // Close menus when clicking outside
    document.addEventListener('click', () => {
      document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.add('hidden'));
    });
  };

  // Keep auto-init for direct page loads without layout.js if needed
  if (document.readyState === 'complete') {
    window.initMain();
  } else {
    document.addEventListener('load', window.initMain);
  }
})();