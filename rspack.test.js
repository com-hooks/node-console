
const path = require('path');
const { runBuilds } = require("rspack-lib");

runBuilds({
  lib: [],
  rspack: {
    entry: path.join(__dirname, './__test__/index.ts'),
    output: {
      filename: path.join(__dirname, './__test__/dist/index.js'),
    },
    devtool: false,
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: [/node_modules/],
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
              },
            },
          },
          type: 'javascript/auto',
        },
      ],
    },
  },

});