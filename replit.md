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
  - `images/` - Image assets
  - `public/` - Public assets (favicons, logos, sitemap)
- `server.js` - Simple Node.js static file server for development

## Running the Project
The project runs with a simple Node.js static file server:
```
node server.js
```
This serves files from `static-assets/` on port 5000.

## Deployment
Configured for static deployment directly from the `static-assets/` directory.

## Recent Changes
- 2026-01-17: Imported from GitHub and configured for Replit environment
