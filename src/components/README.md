
# Components

This directory contains reusable components used throughout the application.

## Structure

- `ui/` - UI components (buttons, cards, inputs, etc.)
- `layout/` - Layout components (header, footer, sidebar, etc.)
- `home/` - Components specific to the home page
- `auth/` - Components specific to authentication
- `dashboard/` - Components specific to the dashboard
- `common/` - Common components used across multiple pages

## Creating New Components

When creating a new component:

1. Determine which category it belongs to
2. Create a file with the component name in PascalCase
3. Export the component as the default export
4. If creating multiple related components, consider creating a subdirectory
