import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Segfault Squad",
  description: "Advanced Ai-based Malware Analysis as a Service",
	base: "/lumen/",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs_02.md' },
      { text: 'Source', link: 'https://github.com/spirizeon/lumen' },
    ],
		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © 2024-present spirizeon',
		},
    sidebar: [
      {
        text: 'Documentation 📖',
        items: [
          { text: '🚀 Getting started', link: '/docs_01.md' },
          { text: '✅ Usage examples', link: '/docs_02.md' },
          { text: '🤝 Contributing', link: '/docs_03.md' },
          { text: '😉 Contact', link: '/docs_06.md' },
          { text: '👮 License', link: '/docs_07.md' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/spirizeon/' },
    ]
  }
})

