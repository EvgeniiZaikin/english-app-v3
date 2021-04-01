const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin');
const path = require('path');

module.exports = withTypescript(
  withSass({
    cssModules: true,
    webpack: (config, { dev }) => {
      if (!config.plugins) config.plugins = [];

      config.plugins.push(
        new TypedCssModulesPlugin({
          globPattern: 'src/components/**/**/*.scss',
        })
      );

      config.resolve.alias['@presentations'] = path.join(__dirname, 'src/components/presentations');
      config.resolve.alias['@containers'] = path.join(__dirname, 'src/components/containers');
      config.resolve.alias['@wrappers'] = path.join(__dirname, 'src/components/wrappers');
      config.resolve.alias['@store'] = path.join(__dirname, 'src/store');
      config.resolve.alias['@rootReducer'] = path.join(__dirname, 'src/store/reducers');
      config.resolve.alias['@reducers/*'] = path.join(__dirname, 'src/store/reducers/*');
      config.resolve.alias['@utils/*'] = path.join(__dirname, 'src/utils/*');
      config.resolve.alias['@defaultStyles'] = path.join(__dirname, 'src/assets/styles/default.scss');

      return config;
    },
  })
);
