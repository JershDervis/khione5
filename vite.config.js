import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
  resolve: {
    alias: {
      $components: path.resolve('./src/components'),
      $stores: path.resolve('./src/stores'),
      $static: path.resolve('./static')
    }
  },
  server: {
    fs: {
      allow: ['static']
    }
  },
};

export default config;
