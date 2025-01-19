import { type BuildOptions } from "vite";

export const buildConfig = (config?: BuildOptions) => ({
  ...config,
  rollupOptions: config?.rollupOptions ?? {
    external: ["react", "react-dom", "react/jsx-runtime"],
    output: {
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
        "react/jsx-runtime": "react/jsx-runtime",
      },
    },
  },
  emptyOutDir: config?.emptyOutDir ?? true,
});
