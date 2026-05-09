<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="header">
    <div class="inner">
      <RouterLink to="/" class="brand">采购工作台</RouterLink>
      <nav class="nav" aria-label="主导航">
        <RouterLink to="/" class="link">首页</RouterLink>
        <RouterLink :to="{ name: 'home', hash: '#features' }" class="link">功能与产品</RouterLink>
        <RouterLink to="/download" class="link link-cta">下载</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--color-border);
  background: rgba(15, 20, 25, 0.85);
  backdrop-filter: blur(12px);
}

.inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.875rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--color-text);
  text-decoration: none;
}

.brand:hover {
  color: var(--color-accent);
  text-decoration: none;
}

.nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.link {
  color: var(--color-muted);
  font-size: 0.95rem;
  text-decoration: none;
}

.link:hover {
  color: var(--color-text);
  text-decoration: none;
}

.link.router-link-active:not(.link-cta) {
  color: var(--color-text);
}

.link-cta {
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  border: 1px solid rgba(61, 156, 240, 0.35);
}

.link-cta:hover {
  background: rgba(61, 156, 240, 0.25);
  text-decoration: none;
}

.link-cta.router-link-active {
  background: rgba(61, 156, 240, 0.3);
  color: #b8dcff;
}
</style>
