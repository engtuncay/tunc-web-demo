import { defineConfig } from 'vite'

export default defineConfig({
  // Base URL for production
  base: './',
  
  // Development server configuration
  server: {
    port: 3000,
    host: true,
    open: true
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    
    // Rollup options
    rollupOptions: {
      input: './index.html'
    }
  },
  
  // Plugins
  plugins: [],
  
  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  },
  
  // CSS configuration
  css: {
    devSourcemap: true
  },
  
  // Optimization
  optimizeDeps: {
    include: ['crypto-js']
  }
})