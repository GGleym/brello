import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~/": path.resolve(__dirname, "./src"),
      "~/app": path.resolve(__dirname, "./src/app"),
      "~/pages": path.resolve(__dirname, "./src/pages"),
      "~/widgets": path.resolve(__dirname, "./src/widgets"),
      "~/features": path.resolve(__dirname, "./src/features"),
      "~/shared": path.resolve(__dirname, "./src/shared"),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
