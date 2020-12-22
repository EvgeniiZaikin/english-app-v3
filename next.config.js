const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin');
const path = require('path');

module.exports = withTypescript(withSass({
    cssModules: true,
    sassOptions: {
      // includePaths: ['./src/client/pages/global.scss'],
    },
    webpack: (config, { dev }) => {
      if (!config.plugins) config.plugins = [];

      config.plugins.push(
        new TypedCssModulesPlugin({
          globPattern: 'src/components/**/**/*.scss',
          // globPattern: 'src/client/assets/styles/*.scss',
        }),
      );

      /* config.resolve.alias['@creators'] = path.join(__dirname, 'src/client/store/creators');
      config.resolve.alias['@creators/sync'] = path.join(__dirname, 'src/client/store/creators/sync');
      config.resolve.alias['@creators/async'] = path.join(__dirname, 'src/client/store/creators/async');
      config.resolve.alias['@presentations'] = path.join(__dirname, 'src/client/components/presentations');
      config.resolve.alias['@containers'] = path.join(__dirname, 'src/client/components/containers');
      config.resolve.alias['@defaultStyles'] = path.join(__dirname, 'src/client/assets/styles/default.scss');
      config.resolve.alias['@actions'] = path.join(__dirname, 'src/client/store/actions'); */

      return config;
    }
}));