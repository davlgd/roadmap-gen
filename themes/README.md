# Themes

Professional themes for roadmap-gen. Each theme provides a unique visual style for your roadmap.

## Available Themes

- **default** - Built-in dark theme (embedded in binary, used when no theme specified)
- **light** - Clean minimal design
- **cards** - Individual project cards layout
- **compact** - Ultra-dense table for many projects
- **mobile** - Mobile-first responsive design
- **timeline** - Enhanced chronological visualization

## Usage

```bash
# Use a specific theme
roadmap-gen -t themes/cards

# Use default built-in theme (embedded in binary)
roadmap-gen
```

## Creating Custom Themes

1. **Copy a base theme**:

```bash
cp -r themes/light themes/my-theme
```

2. **Customize assets** (`themes/my-theme/assets/`):

- `styles.css` - Modify CSS variables, layout, colors
- `script.js` - Add theme-specific JavaScript (automatically loads shared functionality)

3. **Override templates** (optional):

- Create templates in theme directory (main.html, header.html, etc.)
- Modify HTML structure as needed
- Falls back to built-in templates if not present

4. **Use your theme**:

```bash
roadmap-gen -t themes/my-theme
```

## Theme Structure

```
themes/[name]/
├── assets/
│   ├── styles.css    # Required
│   ├── script.js     # Optional (loads shared functionality)
│   └── images/       # Optional
├── templates/        # Optional overrides
└── shared/           # Common resources (internal)
    ├── script.js     # Shared JavaScript functionality
    ├── base.css      # Common CSS structures
```

**Note**: The `shared/` directory contains common JavaScript and CSS utilities used by all themes to avoid code duplication. Theme-specific `script.js` files automatically load the shared functionality.

## CSS Variables

Themes use CSS custom properties for consistency:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #0f172a;
  --status-completed: #059669;
  /* ... */
}
```

## Contributing

1. Follow the existing theme structure
2. Test across browsers and devices
3. Ensure accessibility (contrast, keyboard nav)
4. Submit PR with example screenshot

## Best Practices

- Use CSS variables for theming
- Ensure responsive design
- Maintain accessibility standards
- Keep performance in mind
