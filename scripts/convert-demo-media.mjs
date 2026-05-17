/**
 * 将 public/videos/demo.gif 转为 demo.mp4 与 demo.webm。
 * 首次运行会从 ffmpeg-static 发布页下载 Windows 版 ffmpeg 到 .tools/ffmpeg/。
 *
 * 用法: node scripts/convert-demo-media.mjs
 */
import { spawn } from 'node:child_process'
import { createGunzip } from 'node:zlib'
import {
  chmodSync,
  createWriteStream,
  existsSync,
  mkdirSync,
  renameSync,
  statSync,
  unlinkSync,
} from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pipeline } from 'node:stream/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const videosDir = join(root, 'public', 'videos')
const gifPath = join(videosDir, 'demo.gif')
const mp4Path = join(videosDir, 'demo.mp4')
const webmPath = join(videosDir, 'demo.webm')
const toolsDir = join(root, '.tools', 'ffmpeg')
const ffmpegPath =
  process.platform === 'win32'
    ? join(toolsDir, 'ffmpeg.exe')
    : join(toolsDir, 'ffmpeg')

const FFMPEG_DOWNLOAD_URLS = [
  'https://ghfast.top/https://github.com/eugeneware/ffmpeg-static/releases/download/b6.1.1/ffmpeg-win32-x64.gz',
  'https://github.com/eugeneware/ffmpeg-static/releases/download/b6.1.1/ffmpeg-win32-x64.gz',
]

async function download(url, dest) {
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) {
    throw new Error(`Download failed: HTTP ${res.status} for ${url}`)
  }
  mkdirSync(dirname(dest), { recursive: true })
  const tmp = `${dest}.part`
  if (existsSync(tmp)) unlinkSync(tmp)
  const file = createWriteStream(tmp)
  const body = res.body
  if (!body) throw new Error('Empty response body')
  const streams = url.includes('.gz')
    ? [body, createGunzip(), file]
    : [body, file]
  await pipeline(...streams)
  if (existsSync(dest)) unlinkSync(dest)
  renameSync(tmp, dest)
}

async function ensureFfmpeg() {
  if (existsSync(ffmpegPath)) {
    try {
      if (statSync(ffmpegPath).isFile()) return ffmpegPath
    } catch {
      /* continue download */
    }
  }
  console.log('正在下载 ffmpeg（约 70MB）…')
  mkdirSync(toolsDir, { recursive: true })
  let lastErr
  for (const url of FFMPEG_DOWNLOAD_URLS) {
    try {
      console.log('  尝试:', url)
      await download(url, ffmpegPath)
      const size = statSync(ffmpegPath).size
      if (size < 1_000_000) {
        throw new Error(`下载文件过小（${size} 字节），可能不完整`)
      }
      if (process.platform !== 'win32') chmodSync(ffmpegPath, 0o755)
      console.log('ffmpeg 已就绪:', ffmpegPath, `(${(size / 1024 / 1024).toFixed(1)} MB)`)
      return ffmpegPath
    } catch (err) {
      lastErr = err
      if (existsSync(ffmpegPath)) unlinkSync(ffmpegPath)
      console.warn('  失败:', err.message)
    }
  }
  throw lastErr ?? new Error('无法下载 ffmpeg')
}

function runFfmpeg(bin, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(bin, args, { stdio: 'inherit' })
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`ffmpeg 退出码 ${code}`))
    })
  })
}

async function main() {
  if (!existsSync(gifPath)) {
    console.error('未找到源文件:', gifPath)
    process.exit(1)
  }

  const bin = await ensureFfmpeg()
  const scale = 'scale=1280:-2:flags=lanczos'

  console.log('\n正在生成 demo.mp4（H.264）…')
  await runFfmpeg(bin, [
    '-y',
    '-i',
    gifPath,
    '-movflags',
    '+faststart',
    '-pix_fmt',
    'yuv420p',
    '-vf',
    scale,
    '-c:v',
    'libx264',
    '-preset',
    'medium',
    '-crf',
    '23',
    mp4Path,
  ])

  console.log('\n正在生成 demo.webm（VP9）…')
  await runFfmpeg(bin, [
    '-y',
    '-i',
    gifPath,
    '-vf',
    scale,
    '-c:v',
    'libvpx-vp9',
    '-b:v',
    '0',
    '-crf',
    '32',
    '-row-mt',
    '1',
    webmPath,
  ])

  const fmt = (p) => `${(statSync(p).size / 1024 / 1024).toFixed(1)} MB`
  console.log('\n完成:')
  console.log('  demo.gif ', fmt(gifPath))
  console.log('  demo.mp4 ', fmt(mp4Path))
  console.log('  demo.webm', fmt(webmPath))
  console.log('\n站点已配置为 demo.mp4 + demo.webm；可删除 demo.gif 以节省约 763 MB 磁盘空间。')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
