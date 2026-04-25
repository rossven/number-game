const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const createExpoWebpackConfig = require('../webpack.config.js');

const port = Number(process.env.PORT || process.env.WEB_PORT || 19006);
const host = process.env.HOST || '0.0.0.0';

async function main() {
  const config = await createExpoWebpackConfig(
    { mode: 'development', platform: 'web' },
    { mode: 'development' }
  );

  config.mode = 'development';
  config.devServer = {
    ...(config.devServer || {}),
    host,
    port,
    hot: true,
    historyApiFallback: true,
    open: false,
    client: {
      ...((config.devServer && config.devServer.client) || {}),
      overlay: true,
    },
  };

  const compiler = webpack(config);
  const server = new WebpackDevServer(config.devServer, compiler);

  await server.start();
  console.log(`Sayı Bilmece web: http://${host}:${port}`);

  const stop = async () => {
    await server.stop();
    process.exit(0);
  };

  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
