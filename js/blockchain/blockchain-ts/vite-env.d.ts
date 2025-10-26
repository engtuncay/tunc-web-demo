/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DEV: boolean
  readonly PROD: boolean
  readonly MODE: string
  readonly BASE_URL: string
  // Diğer environment variables buraya eklenebilir
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Global constants
declare const __APP_VERSION__: string
declare const __BUILD_TIME__: string