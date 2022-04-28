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
    nav: [
      { text: 'GitHub', link: 'https://github.com/maqingbo/web-apis' }
    ],
    logo: '/images/logo.png',
    displayAllHeaders: false,
    lastUpdated: '上次更新',
    sidebarDepth: 2,
    sidebar: [
      { title: '总览', path: '/parts/map/' },
      // 侧边栏分组
      {
        title: '文档相关',   // 必要的
        path: '/parts/document/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          ['/parts/document/DOM', 'DOM'],
          ['/parts/document/html', 'HTML'],
          ['/parts/document/htmlDOM', 'HTML DOM']
          // ['/parts/document/htmlDragAndDrop', 'HTML Drag and Drop']
        ]
      },
      {
        title: '获取资源',
        path: '/parts/getData/',
        collapsable: false,
        children: [
          ['/parts/getData/XHR', 'XMLHttpRequest'],
          // ['/parts/getData/formData', 'FormData'],
          ['/parts/getData/fetch', 'Fetch']
        ]
      },
      {
        title: '二进制数据，文件',
        path: '/parts/binary/',
        collapsable: false,
        children: [
          ['/parts/binary/inBox', '收集箱']
        ]
      },
      {
        title: '客户端存储',
        path: '/parts/storage/',
        collapsable: false,
        children: [
          ['/parts/storage/webStorage', 'Web Storage'],
          ['/parts/storage/indexDB', 'indexDB'],
          ['/parts/storage/cache', 'Cache']
        ]
      },
      {
        title: '绘制图形',
        path: '/parts/draw/',
        collapsable: false,
        children: [
          ['/parts/draw/canvas', 'Canvas']
        ]
      },
      {
        title: '音频视频',
        path: '/parts/av/',
        collapsable: false,
        children: [
          ['/parts/av/audio', 'Audio'],
          ['/parts/av/video', 'Video']
        ]
      },
      {
        title: '实时通讯',
        path: '/parts/rtc/',
        collapsable: false,
        children: [
          ['/parts/rtc/webRTC', 'Web RTC']
        ]
      }
    ]
  }
}