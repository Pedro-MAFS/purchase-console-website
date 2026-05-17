/** 首页「功能与产品」区块；配图放在 public/screenshots/ */
const shot = (file: string) => `${import.meta.env.BASE_URL}screenshots/${file}`

/** 功能在官网上的形态说明（省略时视为已有功能） */
export type HomeFeatureAvailability = 'stable' | 'preview' | 'planned'

export const homeFeatureAvailabilityMeta: Record<
  HomeFeatureAvailability,
  { label: string; title: string }
> = {
  stable: {
    label: '已有功能',
    title: '当前版本已提供的能力，会随版本持续优化。',
  },
  preview: {
    label: '技术预览',
    title:
      '能力尚在验证阶段，可能不稳定；界面或行为可能调整，也可能在后续版本中变更或下线。',
  },
  planned: {
    label: '未来支持',
    title: '已纳入规划的能力，具体实现与时间以实际发版为准。',
  },
}

export interface HomeFeature {
  image: string
  imageAlt: string
  title: string
  subtitle: string
  /** 省略时按「已有功能」展示 */
  availability?: HomeFeatureAvailability
}

/** 功能列表。`availability` 省略时等同 `stable`。 */
export const features: HomeFeature[] = [
  {
    image: shot('cljx.png'),
    imageAlt: '采购工作台：解析策略配置界面',
    title: '策略解析',
    subtitle: '丰富的解析配置，一键导入各种格式的询价文件。',
    availability: 'stable',
  },
  {
    image: shot('wlzd.png'),
    imageAlt: '采购工作台：物料字典界面',
    title: '物料字典',
    subtitle:
      '使用 Markdown 格式维护物料字典，一次维护终生使用，再也不用翻阅厚厚的纸质书籍。',
    availability: 'stable',
  },
  {
    image: shot('sjccwz.png'),
    imageAlt: '采购工作台：数据存储位置设置',
    title: '数据存储位置维护',
    subtitle: '自定义工作路径，避免 C 盘空间大量占用。',
    availability: 'stable',
  },
  {
    image: shot('gy.png'),
    imageAlt: '采购工作台：关于页面',
    title: '关于工作台',
    subtitle:
      '通过关于页面的信息与我们取得联系，不论是新增功能还是 Bug 报告，我们都将第一时间给你回复。',
    availability: 'stable',
  },
  {
    image: shot('feature-flow.svg'),
    imageAlt: '采购工作台：机器人自动询价（规划中）',
    title: '机器人自动询价',
    subtitle:
      '在多平台自动采集报价、辅助比价，减少重复手工操作；该能力已纳入规划，正在加急开发中。',
    availability: 'planned',
  },
]
