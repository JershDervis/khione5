// import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';
import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
  kit: {
    adapter: adapter(),
    vite: {
      server: {
        fs: {
          allow: ['static']
        }
      },
      resolve: {
        alias: {
          $static: path.resolve('./static'),
          $components: path.resolve('./src/components'),
          $stores: path.resolve('./src/stores'),
        }
      }
    } 
  }
};

export default config;
