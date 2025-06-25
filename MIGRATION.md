# Vite Migration Guide

This reveal.js template has been migrated from Gulp to Vite for better performance and bun compatibility.

## Key Changes

### Build System
- **Before**: Gulp with multiple tasks for JS, CSS, and plugins
- **After**: Vite for development server + custom build script for reveal.js bundles

### Package Manager
- **Before**: npm/yarn
- **After**: bun (recommended) or npm

### Scripts
- `bun run dev` - Start development server (port 8000)
- `bun run build` - Build everything (CSS themes + JS bundles)
- `bun run preview` - Preview production build
- `bun run clean` - Clean dist directory

### File Structure
- `vite.config.js` - Vite configuration
- `build-plugins.js` - Custom build script for reveal.js and plugins
- `vite-plugin-scss-themes.js` - Custom Vite plugin for SCSS theme compilation
- `postcss.config.js` - PostCSS config for autoprefixer
- `public/` - Static assets (reset.css, fonts)

### Development Workflow

1. Install dependencies:
   ```bash
   bun install
   ```

2. Start development server:
   ```bash
   bun run dev
   ```

3. Build for production:
   ```bash
   bun run build
   ```

## How It Works

1. **Development**: Vite serves files with hot module replacement
2. **SCSS Compilation**: Custom Vite plugin compiles all theme SCSS files
3. **JS Bundling**: Custom build script creates both ES modules and UMD bundles
4. **Production**: All assets are optimized and placed in the `dist` directory

## Using with Bun

This setup is fully compatible with bun. All scripts use bun-compatible features:
- ES modules throughout
- No Node.js-specific APIs
- Clean dependency tree

## Reverting to Gulp

If you need to revert to the Gulp build system:
1. `mv package.json package.json.vite`
2. `mv package.json.gulp package.json`
3. `npm install`
4. Use the original Gulp commands