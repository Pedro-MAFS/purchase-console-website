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

/**
 * 功能列表。`availability` 省略时等同 `stable`。
 * 下面四条暂时分别挂了三种徽章示例，便于预览样式；对外发版时请按真实情况改回。
 */
export const features: HomeFeature[] = [
  {
    image: shot('feature-flow.svg'),
    imageAlt: '采购工作台：流程与协同界面示意',
    title: '流程与协同',
    subtitle: '围绕采购场景梳理关键步骤，减少反复沟通与遗漏，让进度一目了然。',
    availability: 'stable',
  },
  {
    image: shot('feature-data.svg'),
    imageAlt: '采购工作台：数据与追溯界面示意',
    title: '数据与可追溯',
    subtitle: '关键记录可查询、可对账，便于对内复盘与对外说明，建立使用信任。',
    availability: 'preview',
  },
  {
    image: shot('feature-scenario.svg'),
    imageAlt: '采购工作台：场景化配置界面示意',
    title: '贴合实际场景',
    subtitle: '面向真实业务痛点设计能力边界，不堆砌概念，优先解决高频问题。',
    availability: 'planned',
  },
  {
    image: shot('feature-feedback.svg'),
    imageAlt: '采购工作台：反馈与迭代界面示意',
    title: '持续响应反馈',
    subtitle: '我们相信再小的反馈也值得认真对待，并以此驱动产品迭代与体验优化。',
    availability: 'stable',
  },
]
