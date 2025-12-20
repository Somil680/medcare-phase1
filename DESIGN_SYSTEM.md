# MedCare Design System Guide

This guide explains how to use the global design system to maintain consistent styling across all pages.

## Quick Start

### 1. Use PageWrapper for Consistent Layout

```tsx
import { PageWrapper } from "@/components/layout";

export default function MyPage() {
  return (
    <PageWrapper>
      {/* Your page content */}
    </PageWrapper>
  );
}
```

### 2. Use Section Components

```tsx
import { SectionContainer, SectionHeader, FeatureCard } from "@/components/sections";

<SectionContainer background="light" spacing="md">
  <SectionHeader 
    title="Section Title"
    subtitle="Optional subtitle"
  />
  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <FeatureCard
      icon={<YourIcon />}
      title="Feature"
      description="Description"
      gradient="emerald"
    />
  </div>
</SectionContainer>
```

## Color Usage

### Primary Colors (Emerald/Teal)
- Use for: Main actions, primary buttons, key highlights
- Classes: `bg-primary-500`, `text-primary-600`, `border-primary-300`
- Gradient: `bg-gradient-to-r from-emerald-500 to-teal-600`

### Secondary Colors (Teal/Cyan)
- Use for: Secondary actions, accents
- Classes: `bg-secondary-500`, `text-secondary-600`
- Gradient: `bg-gradient-to-r from-teal-500 to-cyan-600`

### Accent Colors (Yellow/Amber)
- Use for: Highlights, important text
- Classes: `bg-accent-400`, `text-accent-500`
- Gradient: `bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300`

## Typography

### Headings
- **Hero**: `font-display text-6xl md:text-7xl lg:text-8xl font-bold`
- **Section**: `font-display text-5xl md:text-6xl font-bold` or use `.section-title`
- **Card**: `font-display text-2xl font-bold`

### Body Text
- **Large**: `text-xl md:text-2xl`
- **Base**: `text-base`
- **Small**: `text-sm`

## Common Patterns

### Page Header
```tsx
<div className="section-gradient-light py-16 md:py-20">
  <div className="section-container">
    <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
      Page Title
    </h1>
    <p className="text-xl text-gray-600 font-light">
      Page description
    </p>
  </div>
</div>
```

### Filter Section
```tsx
<div className="bg-white rounded-3xl shadow-lg border-2 border-emerald-100 p-8 hover:border-emerald-300 transition-all duration-300">
  {/* Filter content */}
</div>
```

### Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <Card hover className="border-2 border-gray-100 hover:border-emerald-300">
    {/* Card content */}
  </Card>
</div>
```

### Primary Button
```tsx
<Button 
  variant="primary" 
  size="lg"
  className="rounded-xl font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg"
>
  Button Text
</Button>
```

## Utility Classes

### Containers
- `.section-container` - Standard max-width container with padding

### Backgrounds
- `.hero-gradient` - Hero section gradient
- `.section-gradient-light` - Light section background
- `.section-dark` - Dark section background

### Spacing
- Standard section: `py-28 md:py-36`
- Small section: `py-16 md:py-20`
- Large section: `py-32 md:py-40`

## Examples

### Complete Page Example

```tsx
"use client";

import { PageWrapper } from "@/components/layout";
import { SectionContainer, SectionHeader } from "@/components/sections";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function MyPage() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="hero-gradient py-28 md:py-40">
        <div className="section-container text-center">
          <h1 className="font-display text-6xl md:text-7xl font-bold text-white mb-6">
            Page Title
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <SectionContainer background="light" spacing="md">
        <SectionHeader 
          title="Section Title"
          subtitle="Section description"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Your content */}
        </div>
      </SectionContainer>
    </PageWrapper>
  );
}
```

## Migration Guide

To update existing pages:

1. **Replace page wrapper**: Use `<PageWrapper>` instead of manual div structure
2. **Update colors**: Replace `primary-600` with emerald (automatically updated via Tailwind)
3. **Update cards**: Cards now use `rounded-3xl` and `border-2`
4. **Update headings**: Use `font-display` for all headings
5. **Update sections**: Use `SectionContainer` and `SectionHeader` components

## Design Tokens

Access design tokens programmatically:
```tsx
import { designSystem } from "@/lib/design-system";

const primaryColor = designSystem.colors.primary.DEFAULT;
const sectionSpacing = designSystem.spacing.section.desktop;
```

