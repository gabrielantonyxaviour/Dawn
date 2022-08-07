// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Dawn",
  tagline: "THE ULTIMATE DISCORD BOT FOR ZORA",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "gabrielantonyxaviour",
  projectName: "Dawn",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/gabrielantonyxaviour/Dawn/tree/main/documentation",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      logo: {
        alt: "Dawn Docs Logo",
        src: "img/dawn.png",
      },
      style: "dark",
      items: [
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "Intro",
        },
        {
          position: "left",
          label: "Commands",
          to: "/docs/category/slash-commands/",
        },
        {
          position: "left",
          label: "What's next",
          to: "/docs/category/whats-next/",
        },
        {
          position: "right",
          href: "https://github.com/gabrielantonyxaviour/Dawn",
          label: "Github",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Tutorial",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/facebook/docusaurus",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Dawn, Inc.`,
    },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
    },
    prism: {
      theme: darkCodeTheme,
    },
  },
};

module.exports = config;
