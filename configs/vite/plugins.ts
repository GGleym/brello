import react from "@vitejs/plugin-react-swc";
import { type PluginOption } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export const pluginsConfig = (config?: PluginOption[]) => [...(config ?? []), react(), tsconfigPaths()];
