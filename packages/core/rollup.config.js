import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { defineConfig } from "rollup";
import path from "path";
import { fileURLToPath } from "url";
import url from "@rollup/plugin-url";
import alias from "@rollup/plugin-alias";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Common configuration
const input = "src/index.ts";
const external = [
  "react",
  "react-dom",
  "slate",
  "slate-react",
  "slate-history",
  "antd",
  "classnames",
];

// Path aliases
const aliasEntries = [
  { find: "@", replacement: path.resolve(__dirname, "src") },
];

// Main bundle configuration
const mainConfig = {
  input,
  output: [
    {
      file: "dist/index.js",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: true,
    },
  ],
  external,
  plugins: [
    peerDepsExternal(),
    alias({ entries: aliasEntries }),
    nodeResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    }),
    commonjs(),
    url({
      include: ["**/*.svg", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif"],
      limit: 8192, // inline files < 8kb
    }),
    typescript({
      tsconfig: "./tsconfig.json",
      sourceMap: true,
      inlineSources: true,
      outputToFilesystem: true,
      compilerOptions: {
        declaration: false,
      },
    }),
    postcss({
      extensions: [".css", ".less"],
      modules: {
        generateScopedName: "[local]___[hash:base64:5]",
      },
      use: [["less", { javascriptEnabled: true }]],
      inject: true,
      extract: false,
    }),
  ],
};

// Create a simple plugin to handle asset file imports in .d.ts files
const emptyAssetPlugin = {
  name: "empty-asset",
  resolveId(id) {
    if (
      id.endsWith(".less") ||
      id.endsWith(".css") ||
      id.endsWith(".svg") ||
      id.endsWith(".png") ||
      id.endsWith(".jpg") ||
      id.endsWith(".jpeg") ||
      id.endsWith(".gif")
    ) {
      return id;
    }
    return null;
  },
  load(id) {
    if (
      id.endsWith(".less") ||
      id.endsWith(".css") ||
      id.endsWith(".svg") ||
      id.endsWith(".png") ||
      id.endsWith(".jpg") ||
      id.endsWith(".jpeg") ||
      id.endsWith(".gif")
    ) {
      return 'export default "";';
    }
    return null;
  },
};

// Declarations-only configuration
const dtsConfig = {
  input,
  output: [{ file: "dist/index.d.ts", format: "es" }],
  external: [
    ...external,
    /\.less$/,
    /\.css$/,
    /\.svg$/,
    /\.png$/,
    /\.jpe?g$/,
    /\.gif$/,
    /react\/jsx-runtime/,
    /react-dom\/client/,
  ],
  plugins: [
    alias({ entries: aliasEntries }),
    emptyAssetPlugin,
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "./dist",
      emitDeclarationOnly: true,
      outputToFilesystem: true,
    }),
  ],
};

export default [mainConfig, dtsConfig];
