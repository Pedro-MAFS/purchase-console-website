/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

interface ImportMetaEnv {
  readonly BASE_URL: string
  readonly VITE_BASE_PATH?: string
  readonly VITE_DOWNLOAD_URL_WINDOWS?: string
  readonly VITE_DOWNLOAD_URL_MACOS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
