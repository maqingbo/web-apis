module.exports = {
  base: '/web-apis/',
  dest: './dist',
  title: 'web-apis',
  // description: '前端学习，查漏补缺，思维导图',
  head: [
    ['link', { rel: 'icon', href: '/images/icon.png' }]
  ],
  markdown: {
    lineNumbers: true
  },
  plugins: ['@vuepress/medium-zoom'],
  themeConfig: {
    logo: '/images/logo.png',
    displayAllHeaders: false,
    lastUpdated: '上次更新',
    sidebarDepth: 2,
    sidebar: [
      { title: '总览', path: '/parts/map/' }
      // {
      //   title: 'Web APIs',
      //   collapsable: false,
      //   children: [
      //     ['/parts/webApis/', '收集箱'],
      //     ['/parts/webApis/DOM', 'DOM'],
      //     ['/parts/webApis/event', '事件'],
      //     ['/parts/webApis/BOM', 'BOM'],
      //     ['/parts/webApis/ajax', 'Ajax'],
      //     ['/parts/webApis/FormData', 'FormData'],
      //     ['/parts/webApis/storage', '本地存储'],
      //     ['/parts/webApis/WebGL', 'WebGL']
      //   ]
      // }
    ]
  }
}