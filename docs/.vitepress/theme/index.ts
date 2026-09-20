import { defineComponent, h, nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import mediumZoom, { type Zoom } from 'medium-zoom'

const Layout = defineComponent({
  setup() {
    const route = useRoute()
    let zoom: Zoom | undefined

    const refreshZoom = async () => {
      await nextTick()
      zoom ??= mediumZoom({ background: 'var(--vp-c-bg)' })
      zoom.detach()
      zoom.attach('.vp-doc img')
    }

    onMounted(refreshZoom)
    watch(() => route.path, refreshZoom)
    onBeforeUnmount(() => zoom?.detach())

    return () => h(DefaultTheme.Layout)
  }
})

export default {
  extends: DefaultTheme,
  Layout
}
