import webExtension from "@samrum/vite-plugin-web-extension";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    webExtension({
      manifest: {
        manifest_version: 2,
        name: "Link Builder",
        description:
          "Make Link alternative to WebExtensions.\nBuild a link and copy to the clipboard in various markup languages",
        version: "0.1.0",

        developer: {
          name: "kei10in",
          url: "https://github.com/kei10in/link-builder",
        },

        icons: {
          "16": "icon-16.png",
          "32": "icon-32.png",
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

        permissions: ["activeTab", "clipboardWrite", "contextMenus", "storage"],
      },
    }),
  ],
});
