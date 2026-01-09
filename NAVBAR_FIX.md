# Navbar Highlighting Fix

## Issue
When navigating to dropdown menu pages (service pages like `/portfolio/service/graphic-design`), all navigation items were being highlighted instead of just the Portfolio link.

## Root Cause
The `isActive` function was checking if the pathname starts with `/portfolio/service`, which caused it to return `true` for all navigation items:

```javascript
// BEFORE (Broken)
const isActive = (path) => location.pathname === path || location.pathname.startsWith('/portfolio/service');
```

This logic was incorrect because:
1. It checked `location.pathname === path` for each nav item
2. Then it ALSO checked if pathname starts with `/portfolio/service`
3. This second check would be true for service pages, making ALL nav items active

## Solution
Changed the `isActive` function to only check for exact matches:

```javascript
// AFTER (Fixed)
const isActive = (path) => {
  // Exact match for home page
  if (path === '/') {
    return location.pathname === '/';
  }
  // For other pages, check exact match only (not startsWith)
  return location.pathname === path;
};
```

The Portfolio dropdown already has its own separate logic:
```javascript
const isPortfolioActive = location.pathname.startsWith('/portfolio');
```

This correctly highlights the Portfolio link when on any portfolio-related page.

## Result
✅ Home - Only highlighted when on `/`
✅ Portfolio - Highlighted when on `/portfolio` or any `/portfolio/*` page
✅ Resume - Only highlighted when on `/resume`
✅ Contact - Only highlighted when on `/contact`

## Files Modified
- `frontend/src/components/Layout/Navbar.jsx`

## Testing
1. Navigate to Home (`/`) - Only Home should be highlighted
2. Navigate to Portfolio (`/portfolio`) - Only Portfolio should be highlighted
3. Navigate to a service page (`/portfolio/service/graphic-design`) - Only Portfolio should be highlighted
4. Navigate to Resume (`/resume`) - Only Resume should be highlighted
5. Navigate to Contact (`/contact`) - Only Contact should be highlighted

## Technical Details

### Before
```javascript
isActive('/') // Returns true on service pages ❌
isActive('/resume') // Returns true on service pages ❌
isActive('/contact') // Returns true on service pages ❌
```

### After
```javascript
isActive('/') // Returns true only on '/' ✅
isActive('/resume') // Returns true only on '/resume' ✅
isActive('/contact') // Returns true only on '/contact' ✅
```

### Portfolio Handling
The Portfolio link uses a separate check:
```javascript
isPortfolioActive // Returns true for any /portfolio/* path ✅
```

This ensures:
- Portfolio is highlighted on `/portfolio`
- Portfolio is highlighted on `/portfolio/service/any-service`
- Portfolio is highlighted on any portfolio sub-page
- Other nav items are NOT highlighted on portfolio pages

## No Breaking Changes
This fix only affects the highlighting logic and doesn't change:
- Navigation functionality
- Dropdown behavior
- Mobile menu
- Routing
- Any other features
