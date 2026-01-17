// Menu rendering for static site
(function() {
  'use strict';
  
  let menuData = null;
  
  // Load menu data
  function loadMenu(callback) {
    if (menuData) {
      callback();
      return;
    }
    
    fetch('/data/menu.json')
      .then(response => response.json())
      .then(data => {
        menuData = data;
        callback();
      })
      .catch(error => {
        console.error('Failed to load menu:', error);
        callback();
      });
  }
  
  // Render menu
  function renderMenu(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    loadMenu(function() {
      if (!menuData) {
        container.innerHTML = '<p>Menu not available</p>';
        return;
      }
      
      // Detect language from URL path
      let language = 'lt';
      if (window.location.pathname.startsWith('/en')) {
        language = 'en';
      } else if (window.Language) {
        language = window.Language.get();
      }
      const menus = menuData[language] || menuData.en || [];
      
      if (menus.length === 0) {
        container.innerHTML = '<p>No menu available</p>';
        return;
      }
      
      const html = menus.map(function(dayMenu, index) {
        const dishesHtml = dayMenu.dishes.slice(0, 3).map(function(dish, dishIndex) {
          return `
            <li style="padding: 1rem 0; border-bottom: 1px solid #f3f4f6; ${dishIndex === dayMenu.dishes.slice(0, 3).length - 1 ? 'border-bottom: none;' : ''}">
              <div style="display: flex; justify-content: space-between; align-items: start; gap: 1rem; margin-bottom: 0.5rem;">
                <h3 style="font-weight: bold; font-size: 1rem; flex: 1;">${escapeHtml(dish.name)}</h3>
                <span style="color: var(--primary-color); font-weight: bold; font-size: 1rem; flex-shrink: 0;">${escapeHtml(dish.price)}</span>
              </div>
              ${dish.description ? `<p style="color: var(--text-muted); font-size: 0.875rem; line-height: 1.6;">${escapeHtml(dish.description)}</p>` : ''}
            </li>
          `;
        }).join('');
        
        const moreDishes = dayMenu.dishes.length > 3 ? dayMenu.dishes.length - 3 : 0;
        const moreText = language === 'en' ? `See more +${moreDishes}` : `Žiūrėti daugiau +${moreDishes}`;
        
        return `
          <article>
            <a href="/menu/${dayMenu.date || ''}" style="display: block; text-decoration: none; color: inherit;">
              <div class="card" style="height: 100%;">
                <div style="padding: 1.5rem; background: linear-gradient(to bottom right, rgba(4, 120, 87, 0.1), transparent);">
                  <h2 style="font-size: 1.5rem; font-weight: bold; color: var(--primary-color); margin-bottom: 0.5rem;">${escapeHtml(dayMenu.day)}</h2>
                  ${dayMenu.date ? `<time style="font-size: 0.75rem; color: var(--text-muted); display: block;" datetime="${dayMenu.date}">${formatDate(dayMenu.date, language)}</time>` : ''}
                </div>
                <div class="card-content">
                  <ul style="list-style: none; padding: 0; margin: 0;">
                    ${dishesHtml}
                  </ul>
                  ${moreDishes > 0 ? `<div style="padding-top: 0.5rem; text-align: center;"><span style="color: var(--primary-color); font-weight: 600; font-size: 1rem;">${moreText}</span></div>` : ''}
                </div>
              </div>
            </a>
          </article>
        `;
      }).join('');
      
      container.innerHTML = '<div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem; max-width: 1280px; margin: 0 auto;">' + html + '</div>';
      
      // Add responsive grid styles
      const style = document.createElement('style');
      style.textContent = `
        @media (min-width: 768px) {
          #weekly-menu-container > div {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          #weekly-menu-container > div {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `;
      document.head.appendChild(style);
    });
  }
  
  // Escape HTML to prevent XSS
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  // Format date
  function formatDate(dateStr, language) {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'lt-LT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  // Initialize menu rendering
  function init() {
    // Render menu on page load
    renderMenu('weekly-menu-container');
  }
  
  // Expose API
  window.Menu = {
    render: renderMenu,
    init: init
  };
  
  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

