const { defineConfig } = require('@rspack/cli');

module.exports = defineConfig({
  entry: './src/index.ts',
  watch: true,
  resolve: {
    extensions: [".ts", ".js", ".json", ".wasm"],
  },
  devtool: false,
  externals: {
    'bus-plus': 'bus-plus',
  },
  target: 'node',
  externalsType: 'commonjs',
  output: {
    filename: 'cjs/index.js',
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