# Vite Migration Summary

## What Was Done

### 1. Created Vite Configuration (`vite.config.js`)
- Configured development server on port 8000
- Set up proper module resolution
- Added SCSS preprocessing with deprecation silencing
- Configured optimized dependencies for highlight.js and marked

### 2. Created Custom SCSS Theme Plugin (`vite-plugin-scss-themes.js`)
- Compiles all theme SCSS files from `css/theme/source/`
- Outputs minified CSS to `dist/theme/`
- Compiles core `reveal.scss` to `dist/reveal.css`
- Adds license headers to all output files

### 3. Created Build Script (`build-plugins.js`)
- Builds reveal.js core as both ES modules and UMD
- Builds all plugins (highlight, markdown, search, notes, zoom, math)
- Uses Rollup with Babel for compatibility
- Generates source maps for debugging

### 4. Updated Package Configuration
- Changed to ES modules (`"type": "module"`)
- Added Vite and necessary build dependencies
- Updated scripts for bun compatibility
- Removed Gulp dependencies

### 5. Updated HTML for Module Loading
- Changed to ES module imports for reveal.js and plugins
- Updated paths to work with Vite's dev server
- Maintained all existing functionality

### 6. Added Supporting Files
- `postcss.config.js` - For autoprefixer support
- `.gitignore` - Updated for Vite
- `MIGRATION.md` - Documentation for the migration
- `test-vite.sh` - Test script to verify the build

## How to Use

### Development
```bash
# Install dependencies
bun install

# Start dev server (http://localhost:8000)
bun run dev
```

### Production Build
```bash
# Build everything
bun run build

# Preview production build
bun run preview
```

### File Structure After Build
```
dist/
├── reveal.css          # Core styles
├── reveal.js           # UMD bundle
├── reveal.esm.js       # ES module bundle
├── reveal.js.map       # Source map
├── reveal.esm.js.map   # Source map
└── theme/              # All theme CSS files
    ├── scout.css
    ├── black.css
    └── ...

plugin/
├── highlight/
│   ├── highlight.js     # UMD bundle
│   └── highlight.esm.js # ES module
├── markdown/
│   ├── markdown.js
│   └── markdown.esm.js
└── ... (other plugins)
```

## Benefits of Vite

1. **Faster Development** - Instant HMR and no bundling during development
2. **Bun Compatibility** - Works perfectly with bun package manager
3. **Modern Build** - ES modules by default with legacy support
4. **Simpler Configuration** - Less complex than Gulp task system
5. **Better Developer Experience** - Built-in features like CSS preprocessing

## Testing

Run the test script to verify everything is working:
```bash
./test-vite.sh
```

This will:
1. Install dependencies
2. Run the build
3. Check all output files exist
4. Verify plugin builds

## Reverting to Gulp

If needed, the original Gulp setup is preserved:
- `package.json.gulp` - Original package.json
- `gulpfile.js` - Original Gulp configuration
- `index.html.original` - Original HTML file