/** 占位地址，发版后改为真实 Release 资产 URL，或通过环境变量覆盖 */
export const downloadUrlWindows =
  (import.meta.env.VITE_DOWNLOAD_URL_WINDOWS as string | undefined)?.trim() ||
  'https://example.com/downloads/purchase-console-windows-setup.exe'

export const downloadUrlMacos =
  (import.meta.env.VITE_DOWNLOAD_URL_MACOS as string | undefined)?.trim() ||
  'https://example.com/downloads/purchase-console-macos.dmg'
