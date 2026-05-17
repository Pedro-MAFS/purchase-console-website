<script setup lang="ts">
import {
  downloadUrlMacos,
  downloadUrlWindows,
  macosDownloadSupported,
  windowsInstallerLabel,
} from '@/config/downloadUrls'

const platforms = [
  {
    id: 'windows' as const,
    name: 'Windows',
    url: downloadUrlWindows,
    supported: true,
    ariaLabel: `下载 Windows 版本（${windowsInstallerLabel}）`,
    hint: windowsInstallerLabel,
  },
  {
    id: 'macos' as const,
    name: 'macOS',
    url: downloadUrlMacos,
    supported: macosDownloadSupported,
    ariaLabel: 'macOS 版本暂不支持',
    hint: '暂不支持',
  },
]
</script>

<template>
  <div class="page">
    <div class="inner">
      <h1 class="title">下载</h1>
      <p class="lead">
        当前提供 Windows 安装包（{{ windowsInstallerLabel }}）；macOS 版本敬请期待。
      </p>

      <div class="icons" role="group" aria-label="平台安装包下载">
        <a
          v-for="p in platforms.filter((x) => x.supported)"
          :key="p.id"
          class="icon-tile"
          :href="p.url"
          :aria-label="p.ariaLabel"
          rel="noopener noreferrer"
        >
          <span class="icon-wrap" aria-hidden="true">
            <svg
              v-if="p.id === 'windows'"
              class="icon-svg"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M3 3h9.5v9.5H3V3zm11.5 0H24v9.5H14.5V3zM3 14.5h9.5V24H3V14.5zm11.5 0H24V24H14.5V14.5z"
              />
            </svg>
          </span>
          <span class="icon-name">{{ p.name }}</span>
          <span v-if="p.hint" class="icon-hint">{{ p.hint }}</span>
        </a>

        <div
          v-for="p in platforms.filter((x) => !x.supported)"
          :key="p.id"
          class="icon-tile icon-tile--disabled"
          :aria-label="p.ariaLabel"
        >
          <span class="icon-wrap" aria-hidden="true">
            <svg
              class="icon-svg icon-svg-apple"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M16.365 1.43c0 1.14-.42 2.21-1.17 3.02-.79.87-2.1 1.54-3.38 1.45-.08-1.11.41-2.2 1.15-2.97.8-.84 2.26-1.47 3.4-1.5zM20.4 17.38c-.58 1.33-1.29 2.56-2.2 3.7-.77.97-1.65 2.05-2.84 2.07-1.06.02-1.4-.69-2.92-.69-1.52 0-1.99.67-3.05.71-1.22.05-2.15-1.22-2.92-2.19-1.59-2.01-2.8-4.5-2.82-7.12.02-2.28.62-4.38 2.1-5.9 1.08-1.14 2.52-1.8 4.02-1.82 1.05-.02 2.05.71 2.67.71.62 0 1.78-.88 3-.84 1.02.02 1.97.42 2.7 1.08-2.35 1.29-1.97 4.65.42 5.55-.4 1.09-1.02 2.18-1.9 3.14z"
              />
            </svg>
          </span>
          <span class="icon-name">{{ p.name }}</span>
          <span class="icon-hint icon-hint--muted">{{ p.hint }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 2.5rem 1.25rem 4rem;
}

.inner {
  max-width: 560px;
  margin: 0 auto;
  text-align: center;
}

.title {
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
}

.lead {
  margin: 0 0 2.5rem;
  color: var(--color-muted);
  line-height: 1.6;
}

.icons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.icon-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  color: var(--color-text);
  text-decoration: none;
  border: none;
  background: none;
  cursor: pointer;
  font: inherit;
}

.icon-tile:hover {
  text-decoration: none;
  color: var(--color-accent);
}

.icon-tile:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 6px;
  border-radius: 16px;
}

.icon-tile--disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.icon-tile--disabled:hover {
  color: var(--color-text);
}

.icon-tile--disabled:hover .icon-wrap {
  border-color: var(--color-border);
  background: var(--color-surface);
  transform: none;
}

.icon-tile--disabled:hover .icon-name,
.icon-tile--disabled:hover .icon-hint {
  color: inherit;
}

.icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  margin-bottom: 0.5rem;
  border-radius: 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow);
  transition:
    border-color 0.15s,
    transform 0.15s,
    background 0.15s;
}

.icon-tile:hover .icon-wrap {
  border-color: rgba(61, 156, 240, 0.45);
  background: var(--color-accent-soft);
  transform: translateY(-2px);
}

.icon-svg {
  width: 52px;
  height: 52px;
}

.icon-svg-apple {
  width: 48px;
  height: 48px;
}

.icon-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-muted);
}

.icon-tile:hover .icon-name {
  color: var(--color-accent);
}

.icon-hint {
  font-size: 0.85rem;
  color: var(--color-accent);
}

.icon-hint--muted {
  color: var(--color-muted);
}

.icon-tile--disabled .icon-hint--muted {
  color: var(--color-muted);
}
</style>
