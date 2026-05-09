<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  features,
  homeFeatureAvailabilityMeta,
  type HomeFeature,
  type HomeFeatureAvailability,
} from '@/config/features'

function getAvailability(item: HomeFeature): HomeFeatureAvailability {
  return item.availability ?? 'stable'
}
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

    <section id="features" class="features">
      <header class="features-head">
        <h2 class="section-title">功能与产品</h2>
        <p class="section-lead">
          每项能力均配有界面示意（可替换为真实产品截图）；说明为能力方向，具体以实际发版为准。
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
