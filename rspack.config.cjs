const { defineConfig } = require('@rspack/cli');

module.exports = defineConfig({
  entry: './src/index.ts',
  watch: true,
  resolve: {
    extensions: [".ts", ".js", ".json", ".wasm"],
  },
  devtool: false,
  externals: {
    'lodash-es': 'lodash-es',
  },
  target: 'node',
  externalsType: 'commonjs',
  output: {
    filename: 'core/index.cjs',
    iife: false,
    chunkFormat: 'commonjs',
    library: {
      type: 'commonjs2',
    },
  },
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
});