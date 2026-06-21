import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "unplugin-dts/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue(), dts({ outputDir: "dist/types", insertTypesEntry: true })],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
      },
      name: "AdiCharts",
      formats: ["es"],
      fileName: (format, entryName) => `adi-charts.${entryName}.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});