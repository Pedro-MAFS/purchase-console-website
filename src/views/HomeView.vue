<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  features,
  homeFeatureAvailabilityMeta,
  type HomeFeature,
  type HomeFeatureAvailability,
} from '@/config/features'
import {
  getWorkflowDemoVideoUrl,
  getWorkflowDemoWebmUrl,
  isWorkflowDemoGif,
  workflowSteps,
} from '@/config/workflowDemo'

function getAvailability(item: HomeFeature): HomeFeatureAvailability {
  return item.availability ?? 'stable'
}

/** 进入视口后再挂接演示媒体，避免首屏拉取大文件 */
const workflowRoot = ref<HTMLElement | null>(null)
const demoVideoSrc = ref<string | null>(null)
let workflowObserver: IntersectionObserver | null = null

onMounted(() => {
  const el = workflowRoot.value
  if (!el || typeof IntersectionObserver === 'undefined') {
    demoVideoSrc.value = getWorkflowDemoVideoUrl()
    return
  }
  workflowObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        demoVideoSrc.value = getWorkflowDemoVideoUrl()
        workflowObserver?.disconnect()
        workflowObserver = null
        break
      }
    },
    { root: null, rootMargin: '280px 0px', threshold: 0.01 },
  )
  workflowObserver.observe(el)
})

onBeforeUnmount(() => {
  workflowObserver?.disconnect()
  workflowObserver = null
})
</script>

<template>
  <div class="page">
    <section class="hero">
      <div class="hero-inner">
        <p class="eyebrow">采购工作台</p>
        <h1 class="headline">勿以事小而不为</h1>
        <p class="sub">再小的反馈也值得认真对待。</p>
        <div class="actions">
          <RouterLink :to="{ name: 'home', hash: '#features' }" class="btn btn-secondary">了解功能</RouterLink>
          <RouterLink to="/download" class="btn btn-primary">立即下载</RouterLink>
        </div>
      </div>
    </section>

    <section
      id="workflow"
      ref="workflowRoot"
      class="workflow"
      aria-labelledby="workflow-title"
    >
      <header class="workflow-head">
        <h2 id="workflow-title" class="section-title">全新的采购工作流程</h2>
        <p class="section-lead">
          下面按时间顺序概括典型路径。
        </p>
      </header>

      <ol class="workflow-steps">
        <li v-for="(step, i) in workflowSteps" :key="i" class="workflow-step">
          <span class="workflow-step-index" aria-hidden="true">{{ i + 1 }}</span>
          <div class="workflow-step-body">
            <h3 class="workflow-step-title">{{ step.title }}</h3>
            <p class="workflow-step-summary">{{ step.summary }}</p>
          </div>
        </li>
      </ol>

      <div class="workflow-video-wrap">
        <div class="shot-frame workflow-video-frame">
          <template v-if="demoVideoSrc">
            <img
              v-if="isWorkflowDemoGif()"
              class="workflow-video"
              :src="demoVideoSrc"
              alt="采购工作台一日流程演示"
              loading="lazy"
              decoding="async"
            />
            <video
              v-else
              class="workflow-video"
              controls
              playsinline
              preload="none"
            >
              <source :src="getWorkflowDemoWebmUrl()" type="video/webm" />
              <source :src="demoVideoSrc" type="video/mp4" />
              您的浏览器不支持内嵌视频播放。
            </video>
          </template>
          <div v-else class="workflow-video-placeholder" role="status">
            <span class="workflow-video-placeholder-text">演示视频将在您浏览到此处时开始加载</span>
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="features">
      <header class="features-head">
        <h2 class="section-title">功能与产品</h2>
        <p class="section-lead">
          每项能力均配有产品界面截图；具体行为与细节以实际发版为准。
        </p>
      </header>

      <ul class="feature-list">
        <li v-for="(item, i) in features" :key="i" class="feature-block">
          <figure class="shot-wrap">
            <div class="shot-frame">
              <img
                class="shot-img"
                :src="item.image"
                :alt="item.imageAlt"
                width="1200"
                height="720"
                loading="lazy"
                decoding="async"
              />
            </div>
          </figure>
          <div class="feature-copy">
            <div class="feature-heading">
              <span
                class="feature-badge"
                :class="`feature-badge--${getAvailability(item)}`"
                :title="homeFeatureAvailabilityMeta[getAvailability(item)].title"
              >
                {{ homeFeatureAvailabilityMeta[getAvailability(item)].label }}
              </span>
              <h3 class="feature-title">{{ item.title }}</h3>
            </div>
            <p class="feature-subtitle">{{ item.subtitle }}</p>
          </div>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="section-inner cta-row">
        <div>
          <h2 class="cta-title">准备体验？</h2>
          <p class="cta-desc">从下载页获取适合您平台的安装包，版本与校验信息随 Release 更新。</p>
        </div>
        <RouterLink to="/download" class="btn btn-primary btn-lg">前往下载</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  padding-bottom: 3rem;
}

.hero {
  padding: 4rem 1.25rem 3.5rem;
}

.hero-inner {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.eyebrow {
  margin: 0 0 0.75rem;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.headline {
  margin: 0 0 1rem;
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.02em;
}

.sub {
  margin: 0 0 2rem;
  font-size: 1.15rem;
  color: var(--color-muted);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.35rem;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid transparent;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.btn:hover {
  text-decoration: none;
}

.btn-primary {
  background: var(--color-accent);
  color: #0a1624;
  border-color: var(--color-accent);
}

.btn-primary:hover {
  filter: brightness(1.08);
}

.btn-secondary {
  background: transparent;
  color: var(--color-text);
  border-color: var(--color-border);
}

.btn-secondary:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.04);
}

.btn-lg {
  padding: 0.75rem 1.5rem;
  align-self: center;
}

.workflow {
  padding: 3.5rem 0 4.5rem;
  border-top: 1px solid var(--color-border);
}

.workflow-head {
  max-width: 720px;
  margin: 0 auto 2.75rem;
  padding: 0 1.5rem;
  text-align: center;
}

.workflow-steps {
  list-style: none;
  margin: 0 auto 2.75rem;
  padding: 0 1.25rem;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.workflow-step {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem 1.1rem;
  align-items: start;
}

.workflow-step-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #0a1624;
  background: var(--color-accent);
  line-height: 1;
}

.workflow-step-title {
  margin: 0 0 0.35rem;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.workflow-step-summary {
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.65;
  color: var(--color-muted);
}

.workflow-video-wrap {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1.25rem;
}

.workflow-video-frame {
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0b1016;
}

.workflow-video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.workflow-video-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.workflow-video-placeholder-text {
  font-size: 0.95rem;
  color: var(--color-muted);
  max-width: 26rem;
  line-height: 1.55;
}

.features {
  padding: 4rem 0 5rem;
}

.features-head {
  max-width: 720px;
  margin: 0 auto 3.5rem;
  padding: 0 1.5rem;
  text-align: center;
}

.section-title {
  margin: 0 0 1rem;
  font-size: clamp(1.85rem, 4.2vw, 2.5rem);
  font-weight: 700;
  letter-spacing: 0.02em;
}

.section-lead {
  margin: 0;
  color: var(--color-muted);
  font-size: 1.05rem;
  line-height: 1.65;
}

.feature-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.feature-block {
  margin: 0;
  padding: 0 1.25rem 5.5rem;
}

.feature-block:last-child {
  padding-bottom: 3rem;
}

.shot-wrap {
  margin: 0 auto 2rem;
  max-width: 1080px;
}

.shot-frame {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.25),
    0 32px 64px rgba(0, 0, 0, 0.35);
}

.shot-frame::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.shot-img {
  display: block;
  width: 100%;
  height: auto;
}

.feature-copy {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 0.5rem;
  text-align: center;
}

.feature-heading {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem 0.75rem;
  margin-bottom: 0.85rem;
}

.feature-badge {
  flex-shrink: 0;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  line-height: 1.2;
  padding: 0.22rem 0.55rem;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  color: var(--color-muted);
  background: rgba(255, 255, 255, 0.04);
  cursor: default;
}

.feature-badge--preview {
  color: #e8c97a;
  border-color: rgba(232, 201, 122, 0.45);
  background: rgba(232, 180, 60, 0.12);
}

.feature-badge--planned {
  color: var(--color-muted);
  border-style: dashed;
  border-color: rgba(138, 154, 173, 0.5);
  background: transparent;
}

.feature-title {
  margin: 0;
  font-size: clamp(1.35rem, 2.8vw, 1.85rem);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: 0.01em;
}

.feature-subtitle {
  margin: 0;
  clear: both;
  font-size: clamp(1rem, 2vw, 1.125rem);
  line-height: 1.7;
  color: var(--color-muted);
}

.section-inner {
  max-width: 1100px;
  margin: 0 auto;
}

.cta-band {
  padding: 2.5rem 1.25rem;
  border-top: 1px solid var(--color-border);
  background: rgba(26, 34, 44, 0.6);
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.cta-title {
  margin: 0 0 0.35rem;
  font-size: 1.25rem;
}

.cta-desc {
  margin: 0;
  color: var(--color-muted);
  max-width: 520px;
  font-size: 0.95rem;
}
</style>
