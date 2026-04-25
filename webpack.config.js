const createExpoWebpackConfig = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfig(env, argv);

  config.entry = {
    main: [require.resolve('./src/index.tsx')],
  };

  config.externals = {
    ...config.externals,
    'expo-router': 'null',
    'expo-router/head': 'null',
  };

  return config;
};
