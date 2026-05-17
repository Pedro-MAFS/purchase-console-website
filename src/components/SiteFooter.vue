<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="footer">
    <div class="inner">
      <p class="muted">采购工作台 · 公开品牌与下载入口</p>
      <p class="fine">安装包通过 GitHub Releases 分发，本站为静态展示页。</p>
      <nav class="legal" aria-label="法律信息">
        <RouterLink class="legal-link" to="/privacy">隐私政策</RouterLink>
        <span class="legal-sep" aria-hidden="true">·</span>
        <RouterLink class="legal-link" to="/terms">服务条款</RouterLink>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  margin-top: auto;
  padding: 2rem 1.25rem;
}

.inner {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}

.muted {
  margin: 0 0 0.35rem;
  color: var(--color-muted);
  font-size: 0.9rem;
}

.fine {
  margin: 0 0 1rem;
  color: var(--color-muted);
  font-size: 0.8rem;
  opacity: 0.85;
}

.legal {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.35rem 0.5rem;
}

.legal-link {
  color: var(--color-muted);
  font-size: 0.85rem;
  text-decoration: none;
}

.legal-link:hover {
  color: var(--color-accent);
  text-decoration: underline;
}

.legal-sep {
  color: var(--color-muted);
  font-size: 0.85rem;
  opacity: 0.6;
  user-select: none;
}
</style>
