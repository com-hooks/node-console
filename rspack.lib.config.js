const { defineConfig } = require("rspack-lib");
module.exports = defineConfig({
    // 会合并rspack中的配置
    lib: [
        // 编译commonjs
        {
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
            externals: {
                'bus-plus': 'bus-plus',
            },
        },
        // 编译esmodule
        {
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
                filename: 'esm/index.js',
                library: {
                    type: 'module',
                },
            },
        },
    ],
    // rspack 配置
    rspack: {
        entry: './src/index.ts',
        watch: true,
        resolve: {
            extensions: [".ts", ".js", ".json", ".wasm"],
        },
        devtool: false,
        externals: {
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
    },
});