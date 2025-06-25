# Scout Presentation Template

This is a [reveal.js](https://revealjs.com) presentation template with Scout branding and custom theme.

## Getting Started

First, install dependencies and build the project:

```bash
bun install
bun run build
```

For development with hot module reloading:

```bash
bun run dev
```

This will start a development server at http://localhost:8000 with instant updates as you edit your slides.

## Project Configuration

### Package Management

This project uses bun for package management:

- Install dependencies: `bun install`
- Build project: `bun run build`
- Start dev server: `bun run dev` (runs on http://localhost:8000 with HMR)
- Preview production build: `bun run preview`

The project now uses Vite for building, providing fast hot module reloading and modern development experience.

### Theme Customization

The Scout theme is defined in:

- `css/theme/source/scout.scss` - Custom Scout theme with brand colors and typography
- Build themes: `npm run build:css`

Scout theme features:
- Scout brand colors (#5B5BD6 primary)
- Custom fonts (Inter + Playfair Display)
- Special CSS classes for Scout branding

### CSS Classes

The Scout theme provides custom CSS classes:

```html
<!-- Scout gradient text -->
<span class="scout-gradient">Scout</span>

<!-- Scout badge -->
<div class="scout-badge">
  <svg>...</svg>
  <span>Built with Scout</span>
</div>

<!-- Scout buttons -->
<a href="#" class="scout-button">Primary Button</a>
<a href="#" class="scout-button outline">Outline Button</a>
```

### Font Configuration

This project uses Google Fonts with:

- Inter (sans-serif) - for body text
- Playfair Display (serif) - for headings

Fonts are imported via Google Fonts CDN in the Scout theme. To change fonts, update the imports in `css/theme/source/scout.scss`.

## Creating Slides

### Basic Structure

```html
<div class="slides">
  <!-- Simple slide -->
  <section>
    <h1>Slide Title</h1>
    <p>Slide content</p>
  </section>

  <!-- Vertical slides -->
  <section>
    <section>
      <h2>Main Topic</h2>
    </section>
    <section>
      <h3>Subtopic 1</h3>
    </section>
    <section>
      <h3>Subtopic 2</h3>
    </section>
  </section>
</div>
```

### Features

- **Fragments**: Add `class="fragment"` to reveal elements sequentially
- **Code Highlighting**: Use `<pre><code>` blocks with language classes
- **Speaker Notes**: Add notes with `<aside class="notes">`
- **Markdown Support**: Use `data-markdown` for Markdown-based slides

### Navigation

- **→/Space**: Next slide
- **←**: Previous slide
- **↑/↓**: Navigate vertical slides
- **Esc**: Slide overview
- **S**: Speaker notes
- **F**: Fullscreen
- **?**: Show keyboard shortcuts

## PDF Export

To export your presentation as a PDF:

1. Add `?print-pdf` to your presentation URL
2. Open print dialog (Cmd/Ctrl + P)
3. Save as PDF

For detailed PDF export instructions, see [PDF_EXPORT_GUIDE.md](PDF_EXPORT_GUIDE.md).

## Plugins

The following plugins are included and enabled:

- **Markdown**: Write slides in Markdown
- **Highlight**: Syntax highlighting for code blocks
- **Math**: LaTeX math expressions (KaTeX/MathJax)
- **Notes**: Speaker notes view
- **Search**: Search within slides
- **Zoom**: Alt+click to zoom

## Build and Deploy

Build the presentation:

```bash
bun run build
```

This:
- Compiles SCSS themes to CSS (including the Scout theme)
- Builds reveal.js core and plugins as ES modules
- Creates production-ready bundles with legacy browser support

The presentation can be deployed to any static hosting service. All necessary files are in:
- `index.html` - Your presentation
- `dist/` - Built CSS and JS
- `plugin/` - Plugin files
- `css/print/` - Print styles

For development, use `bun run dev` for instant hot module reloading.

## Project Structure

```
reveal-template/
├── index.html          # Your presentation
├── css/
│   ├── theme/
│   │   └── source/
│   │       └── scout.scss  # Scout theme (editable)
│   └── print/          # PDF export styles
├── dist/               # Built files (don't edit)
│   ├── reveal.css
│   ├── reveal.js
│   └── theme/
│       └── scout.css   # Compiled Scout theme
├── plugin/             # reveal.js plugins
└── package.json        # Dependencies and scripts
```

## Tips

- Keep slides concise - aim for one main point per slide
- Use high-contrast colors for better visibility
- Test your presentation on different screen sizes
- Practice with speaker notes view (press S)
- Use fragments to control information flow