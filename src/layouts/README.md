
# Layouts

This directory contains layout components that are used to wrap pages.

## Available Layouts

- `AuthLayout` - Layout for authentication pages
- `MainLayout` - Layout for main application pages with navigation
- `DashboardLayout` - Layout for dashboard pages with sidebar

## Usage

```tsx
import DashboardLayout from '@/layouts/DashboardLayout';

const MyPage = () => {
  return (
    <DashboardLayout>
      <div>Page content here</div>
    </DashboardLayout>
  );
};
```
