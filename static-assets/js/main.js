(function() {
  'use strict';

  function initMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuClose = document.getElementById('mobile-menu-close');

    if (menuButton && mobileMenu) {
      menuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        menuButton.setAttribute('aria-expanded', mobileMenu.classList.contains('hidden') ? 'false' : 'true');
      });
    }

    if (menuClose && mobileMenu) {
      menuClose.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        if (menuButton) {
          menuButton.setAttribute('aria-expanded', 'false');
        }
      });
    }

    document.addEventListener('click', function(e) {
      if (mobileMenu && menuButton && !mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function initLanguageSwitcher() {
    document.querySelectorAll('[data-lang-btn]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang-btn');
        if (window.Language) {
          window.Language.set(lang);
        }
      });
    });
  }

  function initDropdowns() {
    document.querySelectorAll('[data-dropdown-toggle]').forEach(function(toggle) {
      toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const targetId = this.getAttribute('data-dropdown-toggle');
        const dropdown = document.getElementById(targetId);
        if (dropdown) {
          dropdown.classList.toggle('hidden');
        }
      });
    });

    document.addEventListener('click', function() {
      document.querySelectorAll('[data-dropdown]').forEach(function(dropdown) {
        dropdown.classList.add('hidden');
      });
    });
  }

  function init() {
    initMobileMenu();
    initLanguageSwitcher();
    initDropdowns();
  }

  window.initMain = init;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
