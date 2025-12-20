# MedCare Design System

This design system ensures consistent styling across all pages in the MedCare application.

## Color Palette

### Primary Colors (Emerald/Teal - Healthcare Theme)
- **Primary 50-900**: Emerald shades from light to dark
- **Usage**: Main actions, primary buttons, key highlights
- **Gradient**: `from-emerald-500 to-teal-600`

### Secondary Colors (Teal/Cyan)
- **Secondary 50-900**: Teal/Cyan shades
- **Usage**: Secondary actions, accents, supporting elements
- **Gradient**: `from-teal-500 to-cyan-600`

### Accent Colors (Yellow/Amber/Orange)
- **Accent 50-900**: Warm accent colors
- **Usage**: Highlights, call-to-action text, important notices
- **Gradient**: `from-yellow-300 via-amber-300 to-orange-300`

## Typography

### Fonts
- **Display Font**: Playfair Display (serif) - for headings
- **Body Font**: Poppins (sans-serif) - for body text

### Heading Sizes
- **Hero**: `font-display text-6xl md:text-7xl lg:text-8xl font-bold`
- **Section**: `font-display text-5xl md:text-6xl font-bold`
- **Card**: `font-display text-2xl font-bold`

## Reusable Components

### SectionContainer
Use for consistent section layouts:
```tsx
import { SectionContainer } from "@/components/sections";

<SectionContainer background="light" spacing="md">
  {/* Your content */}
</SectionContainer>
```

**Props:**
- `background`: "white" | "light" | "gradient" | "dark"
- `spacing`: "sm" | "md" | "lg"

### SectionHeader
Use for section titles:
```tsx
import { SectionHeader } from "@/components/sections";

<SectionHeader 
  title="Section Title"
  subtitle="Optional subtitle text"
/>
```

### FeatureCard
Use for feature displays:
```tsx
import { FeatureCard } from "@/components/sections";

<FeatureCard
  icon={<YourIcon />}
  title="Feature Title"
  description="Feature description"
  gradient="emerald" // or "teal" | "cyan"
/>
```

## Utility Classes

### Section Container
- `.section-container` - Standard container with max-width and padding

### Section Title
- `.section-title` - Large, bold section heading
- `.section-subtitle` - Subtitle text styling

### Cards
- `.gradient-card` - Card with gradient background
- `.feature-card` - Feature card with hover effects

### Buttons
- `.btn-primary-large` - Large primary button styling

### Backgrounds
- `.hero-gradient` - Hero section gradient
- `.section-gradient-light` - Light section gradient
- `.section-dark` - Dark section background

## Usage Examples

### Creating a New Page Section

```tsx
import { SectionContainer, SectionHeader, FeatureCard } from "@/components/sections";

export default function MyPage() {
  return (
    <SectionContainer background="light" spacing="md">
      <SectionHeader 
        title="My Section"
        subtitle="Section description"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Icon />}
          title="Feature 1"
          description="Description"
          gradient="emerald"
        />
        {/* More cards */}
      </div>
    </SectionContainer>
  );
}
```

## Design Tokens

Access design tokens programmatically:
```tsx
import { designSystem, getGradient, getSectionContainer } from "@/lib/design-system";

// Use design system colors
const primaryColor = designSystem.colors.primary.DEFAULT;

// Get gradient classes
const heroGradient = getGradient("hero");

// Get container classes
const container = getSectionContainer();
```

