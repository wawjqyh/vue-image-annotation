module.exports = {
  publicPath: '.',
  // outputDir: 'demo',
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
