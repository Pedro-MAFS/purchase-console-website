import { copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const dist = join(process.cwd(), 'dist')
const index = join(dist, 'index.html')
const fallback = join(dist, '404.html')

if (!existsSync(index)) {
  console.error('copy-spa-fallback: dist/index.html 不存在，请先执行 vite build')
  process.exit(1)
}

copyFileSync(index, fallback)
console.log('copy-spa-fallback: 已写入 dist/404.html（GitHub Pages SPA 回退）')
