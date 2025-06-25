import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { compile } from 'sass';
import CleanCSS from 'clean-css';
import { glob } from 'glob';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const cssLicense = `/*
reveal.js
https://scout.new
MIT licensed

Copyright (C) 2011-2024 Hakim El Hattab, https://hakim.se
*/`;

export function scssThemesPlugin() {
  return {
    name: 'vite-plugin-scss-themes',
    
    buildStart() {
      // Ensure dist/theme directory exists
      mkdirSync(resolve(__dirname, 'dist/theme'), { recursive: true });
    },
    
    async buildEnd() {
      // Compile all theme SCSS files
      const themeFiles = glob.sync('./css/theme/source/*.scss');
      
      for (const file of themeFiles) {
        try {
          const result = compile(file, {
            silenceDeprecations: ['legacy-js-api'],
          });
          
          const themeName = file.replace('./css/theme/source/', '').replace('.scss', '');
          const outPath = resolve(__dirname, `dist/theme/${themeName}.css`);
          
          // Minify CSS
          const minified = new CleanCSS({ compatibility: 'ie9' }).minify(result.css.toString());
          
          // Write with license header
          writeFileSync(outPath, cssLicense + '\n' + minified.styles);
          
          console.log(`✓ Compiled theme: ${themeName}`);
        } catch (err) {
          console.error(`Error compiling ${file}:`, err);
        }
      }
      
      // Compile core reveal.scss
      try {
        const coreResult = compile('./css/reveal.scss', {
          silenceDeprecations: ['legacy-js-api'],
        });
        
        const minified = new CleanCSS({ compatibility: 'ie9' }).minify(coreResult.css.toString());
        writeFileSync(resolve(__dirname, 'dist/reveal.css'), cssLicense + '\n' + minified.styles);
        
        console.log('✓ Compiled core reveal.css');
      } catch (err) {
        console.error('Error compiling reveal.scss:', err);
      }
    },
  };
}