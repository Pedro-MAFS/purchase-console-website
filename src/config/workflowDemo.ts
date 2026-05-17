/**
 * 演示媒体（方案一：随站点静态部署）
 *
 * 将成片放到 `public/videos/`。主格式为 `demo.mp4`；可选 `demo.webm` 供支持的浏览器优先加载。
 * 更换文件名时改 `workflowDemoVideoFile` / `workflowDemoWebmFile` 即可。
 * 支持 `.gif`（动图）与 `.mp4` / `.webm` 视频。
 */
export const workflowDemoVideoFile = 'demo.mp4'
export const workflowDemoWebmFile = 'demo.webm'

const videosBase = () => `${import.meta.env.BASE_URL}videos/`

export function getWorkflowDemoVideoUrl(): string {
  return `${videosBase()}${workflowDemoVideoFile}`
}

export function getWorkflowDemoWebmUrl(): string {
  return `${videosBase()}${workflowDemoWebmFile}`
}

export function isWorkflowDemoGif(): boolean {
  return workflowDemoVideoFile.toLowerCase().endsWith('.gif')
}

export interface WorkflowStep {
  title: string
  summary: string
}

/** 按时间顺序：从导入到当日归档的一日采购流程 */
export const workflowSteps: WorkflowStep[] = [
  {
    title: '导入采购文件',
    summary:
      '支持 Excel 与压缩包一键导入。一次导入即创建一个采购任务，用采购任务跟踪当天的工作进度。',
  },
  {
    title: '询价比价',
    summary:
      '进入任务工作台，通过物料字典查看每条物料的详细信息，并据此在多平台比价。机器人自动询价比价能力正在加急开发中。',
  },
  {
    title: '询价结果录入',
    summary: '借助推荐能力，快速录入历史询价与机器人自动询价结果。',
  },
  {
    title: '导出询价结果',
    summary: '询价完成后，导出询价结果发给 Boss 吧。',
  },
  {
    title: '当日任务归档',
    summary: '一天工作结束后，使用归档能力保持工作台干净清爽。',
  },
]
