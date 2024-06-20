const { mergeConfig } = require("vite");
const svgr = require("vite-plugin-svgr");

module.exports = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
    "@chromatic-com/storybook"
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {}
  },

  features: {},

  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [svgr()],
    });
  },

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};
