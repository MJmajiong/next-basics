const { sizeLimit } = require("@next-core/build-config-factory");

module.exports = sizeLimit({
  bricks: {
    "*": "50 KB",
    "basic-bricks": "115 KB",
    "presentational-bricks": "100 KB",
    "brick-visualization": "365 KB",
    forms: "85 KB",
  },
  lazyBricks: {
    "*": "50 KB",
    "next-builder": "325 KB",
    "presentational-bricks": "270 KB",
    "flow-builder": "305 KB",
    developers: "190 KB",
    forms: "140 KB",
  },
  templates: {
    "*": "5 KB",
  },
  editors: {
    "*": "10 KB",
    "basic-bricks": "30 KB",
  },
});
