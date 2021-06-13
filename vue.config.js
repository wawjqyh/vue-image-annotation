// demo
/* module.exports = {
  publicPath: '.',
  outputDir: 'docs'
}; */

// dev
module.exports = {
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        externals: {
          fabric: {
            root: 'fabric',
            commonjs: 'fabric',
            commonjs2: 'fabric'
          }
        }
      };
    }
  }
};
