
# Pages

This directory contains all the pages of the application. Each page should be in its own directory with an `index.tsx` file.

## Structure

- `home/` - Home page
- `auth/` - Authentication pages (login, register, forgot password)
- `dashboard/` - Dashboard pages
- `not-found/` - 404 page

## Page Organization

Pages should be organized in a hierarchical structure that reflects the URL structure of the application.

Example:
```
pages/
  home/
    index.tsx
  auth/
    login/
      index.tsx
    register/
      index.tsx
  dashboard/
    index.tsx
    users/
      index.tsx
      [id]/
        index.tsx
```

## Creating New Pages

When creating a new page:

1. Create a directory for the page
2. Add an `index.tsx` file
3. Export the page component as the default export
4. Add the route to `App.tsx`
