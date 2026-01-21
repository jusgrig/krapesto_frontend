(function () {
  return;
  'use strict';

  function getLang() {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang') || 'lt';
  }

  async function renderMenu(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const lang = getLang();

    try {
      const res = await fetch(`/week/?lang=${lang}`);
      const data = await res.json();

      if (!data || !data.length) {
        container.innerHTML = '<p>Menu not available</p>';
        return;
      }

      const html = data.map(day => {
        const dishes = day.dishes.slice(0, 3).map(dish => `
          <li style="padding: 1rem 0; border-bottom: 1px solid #f3f4f6;">
            <div style="display:flex;justify-content:space-between;">
              <strong>${dish.name}</strong>
              <span>${dish.price}</span>
            </div>
            ${dish.description ? `<p>${dish.description}</p>` : ''}
          </li>
        `).join('');

        return `
          <article>
            <h2>${day.day}</h2>
            <ul>${dishes}</ul>
          </article>
        `;
      }).join('');

      container.innerHTML = html;

    } catch (e) {
      console.error('Menu load failed', e);
      container.innerHTML = '<p>Failed to load menu</p>';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderMenu('weekly-menu-container');
  });
})();
