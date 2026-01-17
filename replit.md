# Krapesto Restaurant Website

## Overview
This is a static website for Krapesto, a family restaurant in Vilnius, Lithuania. The site is bilingual (Lithuanian/English) and features menus, events, gallery, and contact information.

## Project Structure
- `static-assets/` - All static website files (HTML, CSS, JS, images)
  - `index.html` - Main homepage (Lithuanian)
  - `en/` - English version pages
  - `menu/` - Menu pages (daily lunch, pizza, drinks)
  - `events/` - Event pages (pizza education, birthdays, etc.)
  - `gallery/` - Photo gallery
  - `about/` - About page
  - `contact/` - Contact page
  - `css/` - Stylesheets
  - `js/` - JavaScript files
    - `layout.js` - Shared layout system for header/footer/hero
    - `main.js` - Common functionality (navigation, dropdowns, mobile menu)
  - `images/` - Image assets
  - `public/` - Public assets (favicons, logos, sitemap)
  - `header.html` - Shared header template (with translation placeholders)
  - `hero.html` - Shared hero template (with dynamic content placeholders)
  - `footer-lt.html` - Lithuanian footer template
  - `footer-en.html` - English footer template
- `server.js` - Simple Node.js static file server for development

## Shared Layout System
The website uses a modular layout system to eliminate code duplication:

### How it works:
1. Each page includes placeholder divs: `header-placeholder`, `hero-placeholder`, `footer-placeholder`
2. The `layout.js` script dynamically loads templates at runtime
3. Language is detected from URL path (/en/ prefix = English)
4. Hero content is controlled via `data-hero` attribute on `<body>` tag

### Available hero types:
- `home`, `about`, `menu`, `gallery`, `contact`
- `daily-lunch`, `friday-pizza`, `drinks`
- `pizza-education`, `cocktail-degustation`, `kids-birthdays`, `family-events`, `eat-as-much-as-you-can`
- `day`, `date` (for API-driven menu pages)

### Page template structure:
```html
<body data-hero="home">
  <div id="header-placeholder"></div>
  <main>
    <div id="hero-placeholder"></div>
    <!-- Page-specific content here -->
  </main>
  <div id="footer-placeholder"></div>
  <script src="/js/layout.js"></script>
  <script src="/js/main.js"></script>
</body>
```

## Running the Project
The project runs with a simple Node.js static file server:
```
node server.js
```
This serves files from `static-assets/` on port 5000.

## Deployment
Configured for static deployment directly from the `static-assets/` directory.

## API Integration
- Daily lunch menu pages fetch data from external API: `http://57.128.249.100:8000/api/lunch-menu/week/`
- Pages with API integration: `/menu/daily-lunch/`, `/menu/daily-lunch/date/`, `/menu/daily-lunch/day/`
- These pages preserve inline JavaScript for API polling and rendering

## Recent Changes
- 2026-01-17: Imported from GitHub and configured for Replit environment
- 2026-01-17: Refactored all 30+ pages to use shared layout system (header, footer, hero)
- 2026-01-17: Created layout.js with language detection, translation system, and dynamic hero content
- 2026-01-17: Preserved API-driven menu page functionality with inline JavaScript
