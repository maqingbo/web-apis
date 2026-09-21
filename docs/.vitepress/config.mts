import { defineConfig } from 'vitepress'

const base = '/product/web-apis/'

export default defineConfig({
  base,
  outDir: '../dist',
  rewrites: {
    'README.md': 'index.md',
    'parts/map/README.md': 'parts/map/index.md',
    'parts/fundamentals/README.md': 'parts/fundamentals/index.md',
    'parts/document/README.md': 'parts/document/index.md',
    'parts/getData/README.md': 'parts/getData/index.md',
    'parts/binary/README.md': 'parts/binary/index.md',
    'parts/storage/README.md': 'parts/storage/index.md',
    'parts/draw/README.md': 'parts/draw/index.md',
    'parts/av/README.md': 'parts/av/index.md',
    'parts/rtc/README.md': 'parts/rtc/index.md',
    'parts/workers/README.md': 'parts/workers/index.md',
    'parts/performance/README.md': 'parts/performance/index.md',
    'parts/security/README.md': 'parts/security/index.md',
    'parts/device/README.md': 'parts/device/index.md',
    'parts/webApis/README.md': 'parts/webApis/index.md'
  },
  title: 'Web API 知识地图',
  description: '系统梳理浏览器 API、运行机制与能力边界',
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
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            displayDetails: '显示详细结果',
            resetButtonTitle: '清除搜索条件',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有找到相关结果',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    nav: [
      { text: '主站', link: 'https://maqingbo.com' },
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
        text: '平台基础',
        collapsed: false,
        items: [
          { text: '概览', link: '/parts/fundamentals/' },
          { text: '事件', link: '/parts/webApis/event' }
        ]
      },
      {
        text: '文档与界面',
        collapsed: false,
        items: [
          { text: '概览', link: '/parts/document/' },
          { text: 'DOM', link: '/parts/document/DOM' },
          { text: 'HTML', link: '/parts/document/html' },
          { text: 'HTML DOM', link: '/parts/document/htmlDOM' }
        ]
      },
      {
        text: '网络与数据传输',
        collapsed: false,
        items: [
          { text: '概览', link: '/parts/getData/' },
          { text: 'XMLHttpRequest', link: '/parts/getData/XHR' },
          { text: 'Fetch', link: '/parts/getData/fetch' }
        ]
      },
      {
        text: '二进制数据与文件',
        collapsed: false,
        items: [
          { text: '概览', link: '/parts/binary/' },
          { text: '收集箱', link: '/parts/binary/inBox' }
        ]
      },
      {
        text: '客户端存储',
        collapsed: false,
        items: [
          { text: '概览', link: '/parts/storage/' },
          { text: 'Web Storage', link: '/parts/storage/webStorage' },
          { text: 'IndexedDB', link: '/parts/storage/indexDB' },
          { text: 'Cache Storage', link: '/parts/storage/cache' }
        ]
      },
      {
        text: '绘制图形',
        collapsed: false,
        items: [
          { text: '概览', link: '/parts/draw/' },
          { text: 'SVG', link: '/parts/draw/svg' },
          { text: 'Canvas 2D', link: '/parts/draw/canvas' },
          { text: '图像数据与资源', link: '/parts/draw/imageData' },
          { text: 'OffscreenCanvas', link: '/parts/draw/offscreenCanvas' },
          { text: 'WebGL', link: '/parts/webApis/WebGL' },
          { text: 'Three.js', link: '/parts/draw/threejs' },
          { text: 'WebGPU', link: '/parts/draw/webGPU' }
        ]
      },
      {
        text: '音频视频',
        collapsed: false,
        items: [
          { text: '概览', link: '/parts/av/' },
          { text: 'Audio', link: '/parts/av/audio' },
          { text: 'Video', link: '/parts/av/video' }
        ]
      },
      {
        text: '实时通信',
        collapsed: false,
        items: [
          { text: '概览', link: '/parts/rtc/' },
          { text: 'WebRTC', link: '/parts/rtc/webRTC' }
        ]
      },
      {
        text: '后台与并发',
        collapsed: false,
        items: [
          { text: '概览', link: '/parts/workers/' }
        ]
      },
      {
        text: '性能与观察',
        collapsed: false,
        items: [
          { text: '概览', link: '/parts/performance/' }
        ]
      },
      {
        text: '安全与权限',
        collapsed: false,
        items: [
          { text: '概览', link: '/parts/security/' }
        ]
      },
      {
        text: '设备能力',
        collapsed: false,
        items: [
          { text: '概览', link: '/parts/device/' }
        ]
      }
    ]
  }
})
