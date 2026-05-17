/** Windows 安装包默认下载地址；发版后可通过 `VITE_DOWNLOAD_URL_WINDOWS` 覆盖（建议用 GitHub Release 永久链接）。 */
export const downloadUrlWindows =
  (import.meta.env.VITE_DOWNLOAD_URL_WINDOWS as string | undefined)?.trim() ||
  'https://release-assets.githubusercontent.com/github-production-release-asset/1233657059/bf942a2f-4b02-4423-a923-7c3a245f0176?sp=r&sv=2018-11-09&sr=b&spr=https&se=2026-05-17T09%3A09%3A28Z&rscd=attachment%3B+filename%3D-1.0.0-Setup.exe&rsct=application%2Foctet-stream&skoid=96c2d410-5711-43a1-aedd-ab1947aa7ab0&sktid=398a6654-997b-47e9-b12b-9515b896b4de&skt=2026-05-17T08%3A09%3A12Z&ske=2026-05-17T09%3A09%3A28Z&sks=b&skv=2018-11-09&sig=91jzhLR5IoEm60IQv8RhDtNI2jLsxS6aVbeh4%2FxrcKA%3D&jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmVsZWFzZS1hc3NldHMuZ2l0aHVidXNlcmNvbnRlbnQuY29tIiwia2V5Ijoia2V5MSIsImV4cCI6MTc3OTAwOTMxNSwibmJmIjoxNzc5MDA1NzE1LCJwYXRoIjoicmVsZWFzZWFzc2V0cHJvZHVjdGlvbi5ibG9iLmNvcmUud2luZG93cy5uZXQifQ.naaJ6JHF3PIiUP5IxBpNLAdwCulbeiovWoOF_bmOi38&response-content-disposition=attachment%3B%20filename%3D-1.0.0-Setup.exe&response-content-type=application%2Foctet-stream'

/** macOS 暂未提供安装包；提供地址时可通过 `VITE_DOWNLOAD_URL_MACOS` 启用。 */
export const downloadUrlMacos =
  (import.meta.env.VITE_DOWNLOAD_URL_MACOS as string | undefined)?.trim() || ''

export const macosDownloadSupported = Boolean(downloadUrlMacos)

export const windowsInstallerLabel = '1.0.0 Setup'
