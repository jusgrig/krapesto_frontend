# API ENDPOINT FIX SUMMARY

## Issue Identified:
The frontend was calling a non-existent API endpoint, causing menus not to display.

## Root Cause:
- **Frontend was calling:** `/api/menu/daily-lunch/` → Returns **404 Not Found**
- **Correct endpoint:** `/api/lunch-menu/week/` → Returns **200 OK** with menu data

## Changes Made:

### 1. Updated API Endpoint (Both Languages):
- **Lithuanian:** `static-assets/menu/daily-lunch/index.html`
- **English:** `static-assets/en/menu/daily-lunch/index.html`

**Changed from:**
```javascript
const API_URL = 'http://57.128.249.100:8000/api/menu/daily-lunch/';
```

**Changed to:**
```javascript
const API_URL = 'http://57.128.249.100:8000/api/lunch-menu/week/';
```

### 2. Updated Response Handling:
The frontend now handles both response formats:

**List Page Format:**
```json
{
  "start_date": "2026-01-12",
  "end_date": "2026-01-13",
  "menus": [
    { "date": "2026-01-12", "published": true, "categories": [...], "complexes": [...] },
    { "date": "2026-01-13", "published": true, "categories": [...], "complexes": [...] }
  ]
}
```

**Date Page Format (for future use):**
```json
{
  "date": "2026-01-12",
  "published": true,
  "categories": [...],
  "complexes": [...]
}
```

### 3. Updated `renderMenu()` Function:
- Now handles both `{ menus: [...] }` format (list page)
- And single object format `{ date, categories, complexes }` (date page)

### 4. Removed Strict Validation:
- Removed requirement that response must have `menus` array
- Now accepts either format and renders accordingly

## API Endpoint Verification:

### List Page Endpoint:
```bash
curl http://57.128.249.100:8000/api/lunch-menu/week/
# Returns: { menus: [...] } ✅
```

### Date Page Endpoint (for reference):
```bash
curl http://57.128.249.100:8000/api/lunch-menu/date/2026-01-12/
# Returns: { date, categories, complexes } ✅
```

## Testing:

### Before Fix:
- API call returned 404
- Frontend showed "Meniu nėra prieinamas" (Menu not available)
- No menus displayed

### After Fix:
- API call returns 200 OK
- Frontend receives menu data
- Menus should display correctly

## Deployment:
✅ Container rebuilt with updated files
✅ Container restarted
✅ Changes are live

## Next Steps:
1. Test the page: `http://localhost:3000/menu/daily-lunch/`
2. Verify menus are displaying correctly
3. Check browser console for any remaining errors
4. Verify API calls in Network tab show 200 OK responses
