import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import buble from "rollup-plugin-buble";
import json from "rollup-plugin-json";
import { terser } from "rollup-plugin-terser";
import unassert from "rollup-plugin-unassert";
import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";
import image from 'rollup-plugin-img';

const { BUILD, MINIFY } = process.env;
const minified = MINIFY === "true";
const production = BUILD === "production";
const outputFile = !production
  ? "examples/onemap/lib/onemap-components-dev.js"
  : minified
  ? "dist/index.js"
  : "dist/onemap-components-unminified.js";

export default {
  input: "./src/components/index.js",
  output: {
    file: outputFile,
    format: "es",
  },
  external: ['react','antd'],
  watch: {
    exclude: "node_modules/**",
  },
  plugins: [
    image({
      output: `images`, // default the root
      extensions: /\.(png|jpg|jpeg|gif|svg)$/, // support png|jpg|jpeg|gif|svg, and it's alse the default value
      limit: 8192,  // default 8192(8k)
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs({
      include: "node_modules/**",
      // left-hand side can be an absolute path, a path
      // relative to the current directory, or the name
      // of a module in node_modules
    //   namedExports: {
    //     "node_modules/react/index.js": [
    //       "cloneElement",
    //       "createContext",
    //       "Component",
    //       "createElement",
    //     ],
    //     "node_modules/react-dom/index.js": ["render", "hydrate"],
    //     "node_modules/react-is/index.js": [
    //       "isFragment",
    //       "isMemo",
    //       "ForwardRef",
    //     ],
    //   },
    }),
    json(),
    postcss({
      // modules: true, // 增加 css-module 功能
      extensions: [".less", ".css"],
      use: [
        [
          "less",
          {
            javascriptEnabled: true,
          },
        ],
      ],
      inject: !production, // dev 环境下的 样式是入住到 js 中的，其他环境不会注入
      extract: true, 
    }),
    minified
      ? terser({
          compress: {
            pure_getters: true,
            passes: 3,
          },
        })
      : false,
    production ? unassert() : false,
    resolve({
      browser: true,
      extensions: [".js", ".jsx"],
      preferBuiltins: false,
    }),
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true,
      extensions: [".js", ".jsx"],
    }),
    buble({
      transforms: { dangerousForOf: true },
      objectAssign: "Object.assign",
    }),
  ],
};
