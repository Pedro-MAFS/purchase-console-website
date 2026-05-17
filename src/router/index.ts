import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DownloadView from '@/views/DownloadView.vue'
import LegalPageView from '@/views/LegalPageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: '首页' } },
    { path: '/download', name: 'download', component: DownloadView, meta: { title: '下载' } },
    { path: '/privacy', name: 'privacy', component: LegalPageView, meta: { title: '隐私政策' } },
    { path: '/terms', name: 'terms', component: LegalPageView, meta: { title: '服务条款' } },
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
