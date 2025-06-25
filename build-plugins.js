#!/usr/bin/env bun
import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import { readFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Read package.json for version info
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

const jsLicense = `/*!
 * reveal.js ${pkg.version}
 * ${pkg.homepage}
 * MIT licensed
 *
 * Copyright (C) 2011-2024 Hakim El Hattab, https://hakim.se
 */`;

const babelConfig = {
  babelHelpers: 'bundled',
  ignore: ['node_modules'],
  compact: false,
  extensions: ['.js', '.html'],
  plugins: [
    'transform-html-import-to-string'
  ],
  presets: [[
    '@babel/preset-env',
    {
      corejs: 3,
      useBuiltIns: 'usage',
      modules: false
    }
  ]]
};

const plugins = [
  { name: 'RevealHighlight', input: './plugin/highlight/plugin.js', output: './plugin/highlight/highlight' },
  { name: 'RevealMarkdown', input: './plugin/markdown/plugin.js', output: './plugin/markdown/markdown' },
  { name: 'RevealSearch', input: './plugin/search/plugin.js', output: './plugin/search/search' },
  { name: 'RevealNotes', input: './plugin/notes/plugin.js', output: './plugin/notes/notes' },
  { name: 'RevealZoom', input: './plugin/zoom/plugin.js', output: './plugin/zoom/zoom' },
  { name: 'RevealMath', input: './plugin/math/plugin.js', output: './plugin/math/math' },
];

async function buildPlugins() {
  console.log('Building reveal.js plugins...');
  
  for (const plugin of plugins) {
    try {
      console.log(`Building ${plugin.name}...`);
      
      const bundle = await rollup({
        input: plugin.input,
        plugins: [
          nodeResolve(),
          commonjs(),
          babel({
            ...babelConfig,
            ignore: [/node_modules\/(?!(highlight\.js|marked)\/).*/],
          }),
          terser()
        ]
      });
      
      // Write ES module
      await bundle.write({
        file: plugin.output + '.esm.js',
        format: 'es',
        banner: jsLicense,
      });
      
      // Write UMD bundle
      await bundle.write({
        file: plugin.output + '.js',
        format: 'umd',
        name: plugin.name,
        banner: jsLicense,
      });
      
      await bundle.close();
      console.log(`✓ Built ${plugin.name}`);
    } catch (error) {
      console.error(`Error building ${plugin.name}:`, error);
      process.exit(1);
    }
  }
  
  console.log('✓ All plugins built successfully');
}

// Build core reveal.js bundles
async function buildCore() {
  console.log('Building reveal.js core...');
  
  try {
    const bundle = await rollup({
      input: './js/index.js',
      plugins: [
        nodeResolve(),
        commonjs(),
        babel(babelConfig),
        terser()
      ]
    });
    
    // Ensure dist directory exists
    mkdirSync('./dist', { recursive: true });
    
    // Write ES module
    await bundle.write({
      file: './dist/reveal.esm.js',
      format: 'es',
      banner: jsLicense,
      sourcemap: true,
    });
    
    // Write UMD bundle
    await bundle.write({
      file: './dist/reveal.js',
      format: 'umd',
      name: 'Reveal',
      banner: jsLicense,
      sourcemap: true,
    });
    
    await bundle.close();
    console.log('✓ Built reveal.js core');
  } catch (error) {
    console.error('Error building core:', error);
    process.exit(1);
  }
}

// Run builds
async function build() {
  await buildCore();
  await buildPlugins();
}

build().catch(console.error);