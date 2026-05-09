<template>
  <footer class="footer">
    <div class="inner">
      <p class="muted">采购工作台 · 公开品牌与下载入口</p>
      <p class="fine">安装包通过 GitHub Releases 分发，本站为静态展示页。</p>
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
  margin: 0;
  color: var(--color-muted);
  font-size: 0.8rem;
  opacity: 0.85;
}
</style>
