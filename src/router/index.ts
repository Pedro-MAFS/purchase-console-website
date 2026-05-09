import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DownloadView from '@/views/DownloadView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: '首页' } },
    { path: '/download', name: 'download', component: DownloadView, meta: { title: '下载' } },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const suffix = to.meta.title ? ` — ${to.meta.title as string}` : ''
  document.title = `采购工作台${suffix}`
})

export default router
