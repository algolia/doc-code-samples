module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  pluginOptions: {
    ssr: {
      nodeExternalsWhitelist: [
        /\.css$/,
        /\?vue&type=style/,
        /vue-instantsearch/,
        /instantsearch.js/,
      ],
    },
  },
  lintOnSave: false,
};
