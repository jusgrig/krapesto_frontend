// Main JavaScript for static site
(function() {
  'use strict';
  
  // Mobile menu toggle
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
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (mobileMenu && !mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        if (menuButton) {
          menuButton.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }
  
  // Language switcher buttons
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
  
  // Dropdown menus
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
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
      document.querySelectorAll('[data-dropdown]').forEach(function(dropdown) {
        dropdown.classList.add('hidden');
      });
    });
  }
  
  // Initialize everything
  function init() {
    initMobileMenu();
    initLanguageSwitcher();
    initDropdowns();
  }
  
  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

