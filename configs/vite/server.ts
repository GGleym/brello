import { type ServerOptions } from "vite";

export const serverConfig = (config?: ServerOptions) => ({
  ...config,
  port: config?.port ?? 8080,
});
