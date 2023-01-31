import webExtension from "@samrum/vite-plugin-web-extension";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    webExtension({
      manifest: {
        manifest_version: 2,
        name: "Link Builder",
        description:
          "Build a link and copy to the clipboard in various markup languages",
        version: "1.0",

        icons: {
          "16": "icon.svg",
          "32": "icon.svg",
          "48": "icon.svg",
          "64": "icon.svg",
          "96": "icon.svg",
          "128": "icon.svg",
        },

        background: {
          scripts: ["src/background.ts"],
        },

        content_scripts: [
          {
            matches: ["http://*/*", "https://*/*"],
            js: ["src/content.ts"],
            run_at: "document_end",
            all_frames: false,
          },
        ],

        options_ui: {
          page: "src/options.html",
          chrome_style: false,
          browser_style: false,
          open_in_tab: true,
        },

        permissions: ["activeTab", "contextMenus", "clipboardWrite"],
      },
    }),
  ],
});
