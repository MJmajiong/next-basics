const { bricks, merge } = require("@next-core/webpack-config-factory");

const { webpackPreviewsFactory, webpackDevFactory, webpackProdFactory } =
  bricks;

module.exports = merge(
  webpackPreviewsFactory(),
  process.env.NODE_ENV === "development"
    ? webpackDevFactory()
    : webpackProdFactory()
);
