import { defineConfig } from 'vitepress'

const base = '/web-apis/'

export default defineConfig({
  base,
  outDir: '../dist',
  rewrites: {
    'README.md': 'index.md',
    'parts/map/README.md': 'parts/map/index.md',
    'parts/webApis/README.md': 'parts/webApis/index.md'
  },
  title: 'web-apis',
  head: [
    ['link', { rel: 'icon', href: `${base}images/icon.png` }]
  ],
  lastUpdated: true,
  markdown: {
    lineNumbers: true
  },
  transformPageData(pageData) {
    const frontmatter = pageData.frontmatter

    // Keep the existing VuePress home-page frontmatter working unchanged.
    if (frontmatter.home === true && !frontmatter.layout) {
      frontmatter.layout = 'home'
      frontmatter.hero = {
        name: frontmatter.heroText,
        tagline: frontmatter.tagline,
        image: frontmatter.heroImage,
        actions: frontmatter.actionText && frontmatter.actionLink
          ? [
              {
                theme: 'brand',
                text: frontmatter.actionText,
                link: frontmatter.actionLink
              }
            ]
          : []
      }
    }
  },
  themeConfig: {
    logo: '/images/logo.svg',
    nav: [
      { text: 'GitHub', link: 'https://github.com/maqingbo/web-apis' }
    ],
    lastUpdated: {
      text: '上次更新'
    },
    outline: {
      level: [2, 3]
    },
    sidebar: [
      { text: '总览', link: '/parts/map/' },
      {
        text: '文档相关',
        link: '/parts/document/',
        collapsed: false,
        items: [
          { text: 'DOM', link: '/parts/document/DOM' },
          { text: 'HTML', link: '/parts/document/html' },
          { text: 'HTML DOM', link: '/parts/document/htmlDOM' }
        ]
      },
      {
        text: '获取资源',
        link: '/parts/getData/',
        collapsed: false,
        items: [
          { text: 'XMLHttpRequest', link: '/parts/getData/XHR' },
          { text: 'Fetch', link: '/parts/getData/fetch' }
        ]
      },
      {
        text: '二进制数据，文件',
        link: '/parts/binary/',
        collapsed: false,
        items: [
          { text: '收集箱', link: '/parts/binary/inBox' }
        ]
      },
      {
        text: '客户端存储',
        link: '/parts/storage/',
        collapsed: false,
        items: [
          { text: 'Web Storage', link: '/parts/storage/webStorage' },
          { text: 'indexDB', link: '/parts/storage/indexDB' },
          { text: 'Cache', link: '/parts/storage/cache' }
        ]
      },
      {
        text: '绘制图形',
        link: '/parts/draw/',
        collapsed: false,
        items: [
          { text: 'Canvas', link: '/parts/draw/canvas' }
        ]
      },
      {
        text: '音频视频',
        link: '/parts/av/',
        collapsed: false,
        items: [
          { text: 'Audio', link: '/parts/av/audio' },
          { text: 'Video', link: '/parts/av/video' }
        ]
      },
      {
        text: '实时通讯',
        link: '/parts/rtc/',
        collapsed: false,
        items: [
          { text: 'Web RTC', link: '/parts/rtc/webRTC' }
        ]
      }
    ]
  }
})
