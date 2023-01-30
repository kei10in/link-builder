import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import webExtension from "@samrum/vite-plugin-web-extension";

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
