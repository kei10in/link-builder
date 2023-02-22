import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import webExtension from "vite-plugin-web-extension";

const targetBrowser = process.env.TARGET_BROWSER;

export default defineConfig({
  build: {
    outDir: `./dist/${targetBrowser}`,
  },

  plugins: [
    react(),
    svgr(),
    webExtension({
      browser: targetBrowser,
      manifest: () => ({
        manifest_version: 3,
        name: "Link Builder",
        description:
          "Make Link alternative to WebExtensions.\nBuild a link and copy to the clipboard in various formats",
        version: "0.1.1",

        "{{chrome}}.author": "kei10in",

        "{{firefox}}.developer": {
          name: "kei10in",
          url: "https://github.com/kei10in/link-builder",
        },

        icons: {
          "16": "icon-16.png",
          "32": "icon-32.png",
          "48": "icon-48.png",
          "64": "icon-64.png",
          "96": "icon-96.png",
          "128": "icon-128.png",
          "256": "icon.svg",
        },

        "{{firefox}}.browser_specific_settings": {
          gecko: {
            id: "{3b7ad711-acd1-428c-8ec5-d682027e0c9d}",
          },
        },

        background: {
          "{{firefox}}.scripts": ["src/background.ts"],
          "{{chrome}}.service_worker": "src/background.ts",
        },

        content_security_policy: {
          extension_pages: "default-src 'self'",
        },

        options_ui: {
          page: "src/options.html",
          open_in_tab: true,
        },

        permissions: ["activeTab", "clipboardWrite", "contextMenus", "scripting", "storage"],
      }),
    }),
  ],
});
