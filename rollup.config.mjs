import minify from "rollup-plugin-babel-minify";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import pkg from "./package.json" with { type: "json" };

export default [
    {
        input: "dist/index.js",
        output: {
            name: "RelayerWS",
            file: pkg.browser,
            format: "umd",
            sourcemap: true,
        },
        plugins: [resolve({
            browser: true,
            preferBuiltins: false
        }), commonjs(), minify({ comments: false }), 
        ],
    },
];
