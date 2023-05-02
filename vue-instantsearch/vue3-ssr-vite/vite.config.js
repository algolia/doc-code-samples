const vuePlugin = require('@vitejs/plugin-vue');
const vueJsx = require('@vitejs/plugin-vue-jsx');
const { viteCommonjs } = require('@originjs/vite-plugin-commonjs');

/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  plugins: [vuePlugin(), vueJsx(), viteCommonjs()],
  build: {
    minify: false,
  },
  ssr: {
    external: ['algoliasearch-helper', 'qs', 'hogan.js'],
    noExternal: ['vue-instantsearch', 'instantsearch.js'],
  },
};
