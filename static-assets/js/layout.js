(function() {
  'use strict';

  const isEnglish = window.location.pathname.startsWith('/en/') || window.location.pathname === '/en';
  const basePath = isEnglish ? '/en' : '';
  const currentPath = window.location.pathname;

  const translations = {
    lt: {
      NAV_HOME: 'Pradinis',
      NAV_ABOUT: 'Apie mus',
      NAV_MENU: 'Meniu',
      NAV_DAILY_LUNCH: 'Dienos pietų meniu',
      NAV_FRIDAY_PIZZA: 'Penktadienio picų meniu',
      NAV_DRINKS: 'Gėrimai',
      NAV_EVENTS: 'Renginiai',
      NAV_PIZZA_EDUCATION: 'Picų kepimo edukacija',
      NAV_COCKTAIL: 'Kokteilių degustacija',
      NAV_KIDS_BIRTHDAYS: 'Vaikų gimtadieniai',
      NAV_FAMILY_EVENTS: 'Šeimos renginiai',
      NAV_EAT_ALL: 'Valgyk kiek telpa',
      NAV_GALLERY: 'Galerija',
      NAV_CONTACT: 'Kontaktai',
      LANG_SWITCH_TEXT: 'EN'
    },
    en: {
      NAV_HOME: 'Welcome',
      NAV_ABOUT: 'About Us',
      NAV_MENU: 'Menu',
      NAV_DAILY_LUNCH: 'Daily Lunch Menu',
      NAV_FRIDAY_PIZZA: 'Friday Pizza Menu',
      NAV_DRINKS: 'Drinks',
      NAV_EVENTS: 'Events',
      NAV_PIZZA_EDUCATION: 'Pizza Education',
      NAV_COCKTAIL: 'Cocktail Degustation',
      NAV_KIDS_BIRTHDAYS: "Kids' Birthdays",
      NAV_FAMILY_EVENTS: 'Family Events',
      NAV_EAT_ALL: 'Eat as Much as You Can',
      NAV_GALLERY: 'Gallery',
      NAV_CONTACT: 'Contact',
      LANG_SWITCH_TEXT: 'LT'
    }
  };

  const heroData = {
    lt: {
      home: {
        image: '/images/hero/index.jpg',
        alt: 'Krapesto Restaurant Interior',
        title: 'Sveiki atvykę į Krapesto',
        subtitle: 'Kur šeimos susiburia kartu',
        height: '40vh',
        extra: '<p style="font-size: 1.125rem; max-width: 42rem; margin: 0 auto;">Patirkite šiltą svetingumą, skanų maistą ir prisiminimus, kurie išlieka visą gyvenimą</p><div style="margin-top: 2rem;"><a href="/menu/" class="btn btn-primary">Žiūrėti meniu</a></div>'
      },
      about: {
        image: '/images/hero/about.jpg',
        alt: 'About Krapesto',
        title: 'Apie Krapesto',
        subtitle: 'Dienos pietų ir jūsų švenčių restoranas',
        height: '40vh',
        extra: ''
      },
      menu: {
        image: '/images/hero/meniu/menu.jpg',
        alt: 'Menu',
        title: 'Meniu',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      // 'daily' key used for Daily Lunch page
      'daily': {
        image: '/images/hero/meniu/meniu_dienos_pietus.jpg',
        alt: 'Daily Lunch',
        title: 'Dienos pietų meniu',
        subtitle: 'Pirmadienis - Penktadienis, 11:00 - 16:00',
        height: '40vh',
        extra: ''
      },
      'friday-pizza': {
        image: '/images/hero/meniu/friday_pizza.jpg',
        alt: 'Friday Pizza',
        title: 'Penktadienio picų meniu',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      drinks: {
        image: '/images/hero/meniu/drinks.jpg',
        alt: 'Drinks',
        title: 'Gėrimai',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      gallery: {
        image: '/images/hero/gallery.jpg',
        alt: 'Gallery',
        title: 'Mūsų galerija',
        subtitle: 'Akimirkos iš Krapesto',
        height: '40vh',
        extra: ''
      },
      contact: {
        image: '/images/hero/contact.jpg',
        alt: 'Contact',
        title: 'Susisiekite',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'pizza-education': {
        image: '/images/hero/events/pizza-education.jpg',
        alt: 'Pizza Education',
        title: 'Picų kepimo edukacija',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'cocktail-degustation': {
        image: '/images/hero/events/cocktail-degustation.jpg',
        alt: 'Cocktail Degustation',
        title: 'Kokteilių degustacijos patirtis',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'kids-birthdays': {
        image: '/images/hero/events/kids-birthdays.jpg',
        alt: 'Kids Birthdays',
        title: 'Vaikų gimtadieniai',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'family-events': {
        image: '/images/hero/events/family-events.jpg',
        alt: 'Family Events',
        title: 'Šeimos renginiai',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'eat-as-much-as-you-can': {
        image: '/images/hero/events/eat-as-much-as-you-can.jpg',
        alt: 'Eat as Much as You Can',
        title: 'Valgyk kiek telpa',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'day': {
        image: '/images/hero/meniu/meniu_dienos_pietus.jpg',
        alt: 'Daily Menu',
        title: 'Šiandienos meniu',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'date': {
        image: '/images/hero/meniu/meniu_dienos_pietus.jpg',
        alt: 'Daily Menu',
        title: 'Dienos meniu',
        subtitle: '',
        height: '40vh',
        extra: ''
      }
    },
    en: {
      home: {
        image: '/images/hero/index.jpg',
        alt: 'Krapesto Restaurant Interior',
        title: 'Welcome to Krapesto',
        subtitle: 'Where Families Come Together',
        height: '40vh',
        extra: '<p style="font-size: 1.125rem; max-width: 42rem; margin: 0 auto;">Experience warm hospitality, delicious food, and memories that last a lifetime</p><div style="margin-top: 2rem;"><a href="/en/menu/" class="btn btn-primary">View Menu</a></div>'
      },
      about: {
        image: '/images/hero/about.jpg',
        alt: 'About Krapesto',
        title: 'About Krapesto',
        subtitle: 'Daily lunch and celebration restaurant',
        height: '40vh',
        extra: ''
      },
      menu: {
        image: '/images/hero/meniu/menu.jpg',
        alt: 'Menu',
        title: 'Menu',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      // 'daily' key used for Daily Lunch page
      'daily-lunch': {
        image: '/images/hero/meniu/daily_lunch.jpg',
        alt: 'Daily Lunch',
        title: 'Daily Lunch Menu',
        subtitle: 'Monday - Friday, 11:00 - 16:00',
        height: '40vh',
        extra: ''
      },
      'daily': {
        image: '/images/hero/meniu/daily_lunch.jpg',
        alt: 'Daily Lunch',
        title: 'Daily Lunch Menu',
        subtitle: 'Monday - Friday, 11:00 - 16:00',
        height: '40vh',
        extra: ''
      },
      'friday-pizza': {
        image: '/images/hero/meniu/friday_pizza.jpg',
        alt: 'Friday Pizza',
        title: 'Friday Pizza Menu',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      drinks: {
        image: '/images/hero/meniu/drinks.jpg',
        alt: 'Drinks',
        title: 'Drinks',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      gallery: {
        image: '/images/hero/gallery.jpg',
        alt: 'Gallery',
        title: 'Our Gallery',
        subtitle: 'Moments from Krapesto',
        height: '40vh',
        extra: ''
      },
      contact: {
        image: '/images/hero/contact.jpg',
        alt: 'Contact',
        title: 'Contact Us',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'pizza-education': {
        image: '/images/hero/events/pizza-education.jpg',
        alt: 'Pizza Education',
        title: 'Pizza Making Education',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'cocktail-degustation': {
        image: '/images/hero/events/cocktail-degustation.jpg',
        alt: 'Cocktail Degustation',
        title: 'Cocktail Degustation Experience',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'kids-birthdays': {
        image: '/images/hero/events/kids-birthdays.jpg',
        alt: 'Kids Birthdays',
        title: "Kids' Birthdays",
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'family-events': {
        image: '/images/hero/events/family-events.jpg',
        alt: 'Family Events',
        title: 'Family Events',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'eat-as-much-as-you-can': {
        image: '/images/hero/events/eat-as-much-as-you-can.jpg',
        alt: 'Eat as Much as You Can',
        title: 'Eat as Much as You Can',
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'day': {
        image: '/images/hero/meniu/meniu_dienos_pietus.jpg',
        alt: 'Daily Menu',
        title: "Today's Menu",
        subtitle: '',
        height: '40vh',
        extra: ''
      },
      'date': {
        image: '/images/hero/meniu/meniu_dienos_pietus.jpg',
        alt: 'Daily Menu',
        title: 'Daily Menu',
        subtitle: '',
        height: '40vh',
        extra: ''
      }
    }
  };

  /**
   * Generates localized link for language switcher
   */
  function getLangSwitchHref() {
    if (isEnglish) {
      return currentPath.replace(/^\/en\/?/, '/') || '/';
    } else {
      return '/en' + (currentPath === '/' ? '/' : currentPath);
    }
  }

  /**
   * Replaces placeholders in HTML with actual values
   */
  function replaceTemplateVars(html, vars) {
    let result = html;
    for (const [key, value] of Object.entries(vars)) {
      result = result.replace(new RegExp('\\{' + key + '\\}', 'g'), value);
    }
    return result;
  }

  /**
   * Fetches HTML template from the server
   */
  async function loadTemplate(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to load ' + url);
      return await response.text();
    } catch (error) {
      console.error('Error loading template:', error);
      return '';
    }
  }

  /**
   * Loads and renders the navigation header
   */
  async function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;

    const html = await loadTemplate('/header.html');
    const lang = isEnglish ? 'en' : 'lt';
    const t = translations[lang];

    const vars = {
      BASE: basePath,
      LANG_SWITCH_HREF: getLangSwitchHref(),
      ...t
    };

    headerPlaceholder.innerHTML = replaceTemplateVars(html, vars);
  }

  /**
   * Loads and renders the footer
   */
  async function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;

    const footerUrl = isEnglish ? '/footer-en.html' : '/footer-lt.html';
    const html = await loadTemplate(footerUrl);
    footerPlaceholder.innerHTML = html;

    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // Return current language key used by heroData ('en' or 'lt')
  function getCurrentLanguage() {
    return isEnglish ? 'en' : 'lt';
  }

  /**
   * Loads and renders the hero section.
   * Determine the page key from data-hero attribute or infer from URL path.
   * Use getCurrentLanguage() to select localized heroData.
   * HERO_HEIGHT is enforced to '40vh' for consistent rendering.
   */
  async function loadHero() {
    const heroPlaceholder = document.getElementById('hero-placeholder');
    if (!heroPlaceholder) return;

    // Prefer explicit data-hero attribute, otherwise infer from the URL path
    const pageAttr = document.body.getAttribute('data-hero');
    let page = pageAttr && pageAttr.trim() ? pageAttr.trim() : null;

    if (!page) {
      // Derive from currentPath, remove basePath if present, then use last path segment
      let path = currentPath || window.location.pathname || '/';
      if (basePath && path.startsWith(basePath)) {
        path = path.slice(basePath.length) || '/';
      }
      path = path.replace(/^\/|\/$/g, '');
      page = path ? path.split('/').pop() : 'home';
    }

    const lang = getCurrentLanguage();
    const data = (heroData[lang] && heroData[lang][page]) ? heroData[lang][page] : heroData[lang]['home'];

    const html = await loadTemplate('/hero.html');
    const vars = {
      HERO_IMAGE: data.image,
      HERO_ALT: data.alt,
      HERO_TITLE: data.title,
      HERO_SUBTITLE: data.subtitle || '',
      HERO_HEIGHT: '40vh', // Enforced uniform height
      HERO_EXTRA: data.extra || ''
    };

    heroPlaceholder.innerHTML = replaceTemplateVars(html, vars);
  }

  /**
   * Initializes the layout by loading all components sequentially
   */
  async function initLayout() {
    await Promise.all([
      loadHeader(),
      loadFooter(),
      loadHero()
    ]);

    // Check for main initialization function in main.js
    if (typeof window.initMain === 'function') {
      window.initMain();
    }
    
    // WARNING: Removed event redispatching that caused infinite loop
  }

  /**
   * Entry point for the layout script
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLayout);
  } else {
    initLayout();
  }
})();