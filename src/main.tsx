import { createRoot } from "react-dom/client";

import { MantineProvider } from "@mantine/core";
import "modern-normalize/modern-normalize.css";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/tiptap/styles.css";

import { api } from "~/shared/api";

import App from "./App.tsx";
import "./globals.css";

api.kanban.listsLoadFx();

createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    <App />
  </MantineProvider>,
);
