import { defineConfig } from '@rspack/cli';

export default defineConfig({
    entry: './src/index.ts',
    watch: true,
    resolve: {
        extensions: [".ts", ".js", ".json", ".wasm"],
    },
    devtool: false,
    externals: {
        'lodash-es': 'lodash-es',
    },
    target: 'es5',
    optimization: {
        concatenateModules: true,
    },
    experiments: {
        outputModule: true,
    },
    output: {
        module: true,
        chunkFormat: 'module',
        filename: 'core/index.mjs',
        library: {
            type: 'module',
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