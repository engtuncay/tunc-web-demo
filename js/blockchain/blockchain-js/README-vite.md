# 🚀 Vite Bundler ile JavaScript Blockchain

Bu proje JavaScript Blockchain'i modern Vite bundler ile optimize eder. HMR, tree shaking ve production build özellikleri sunar.

## ✨ Vite Özellikleri

- ⚡ **Lightning Fast HMR** - Hot Module Replacement
- 🌳 **Tree Shaking** - Kullanılmayan kod elimine edilir
- 📦 **Bundling** - Tüm dependencies tek dosyada
- 🔧 **Dev/Prod Mode** - Environment aware configuration
- 🎯 **Legacy Support** - Eski browser desteği
- 📱 **Mobile Friendly** - Responsive design

## 🏗️ Kurulum

```bash
# Blockchain dizinine git
cd blockchain/browser

# Dependencies yükle
pnpm install
# veya
npm install
```

## 🚀 Geliştirme

### Development Server
```bash
# Vite dev server başlat
pnpm dev
# veya
npm run dev
# veya
npx vite

# http://localhost:5173 adresinde açılır
```

### Production Build
```bash
# Production build oluştur
pnpm build
# veya
npm run build

# Build'i preview et
pnpm preview
# veya
npm run preview
```

## 📁 Dosya Yapısı

```
browser/
├── index.html                     # Ana HTML (Vite entry)
├── main.js                        # Ana JavaScript (Vite entry)
├── block-browser-vite.js          # Vite optimized Block sınıfı
├── blockchain-browser-vite.js     # Vite optimized Blockchain sınıfı
├── style.css                      # Styles
├── vite.config.js                 # Vite konfigürasyonu
├── package.json                   # Dependencies & scripts
└── dist/                          # Build çıktıları (production)
```

## ⚙️ Vite Konfigürasyonu

```javascript
// vite.config.js
export default defineConfig({
  base: './',
  server: {
    port: 3000,
    host: true,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  optimizeDeps: {
    include: ['crypto-js']
  }
})
```

## 🔧 Environment Variables

```javascript
// Development mode kontrolü
if (import.meta.env.DEV) {
  console.log('🔧 Development mode aktif')
  this.difficulty = 1 // Düşük difficulty
}

// Production mode kontrolü
if (import.meta.env.PROD) {
  console.log('🚀 Production build')
  this.difficulty = 2 // Normal difficulty
}
```

## 📊 Performans Karşılaştırması

| Özellik | CDN Versiyon | Local Versiyon | Vite Bundled |
|---------|--------------|----------------|--------------|
| **Yükleme Hızı** | Orta | Yavaş | ⚡ Çok Hızlı |
| **Bundle Size** | - | - | 📦 Optimize |
| **HMR** | ❌ | ❌ | ✅ Anlık |
| **Tree Shaking** | ❌ | ❌ | ✅ Optimal |
| **Dev Experience** | Temel | Temel | 🚀 Modern |
| **Build Time** | - | - | ⚡ Hızlı |

## 🛠️ Geliştirme Özellikleri

### Hot Module Replacement (HMR)
- ✅ Code değişikliği = Anında güncelleme
- ✅ State korunur
- ✅ Sayfa yenilenmez

### Environment Aware
```javascript
// Dev mode'da düşük mining difficulty
this.difficulty = import.meta.env.DEV ? 1 : 2

// Dev mode'da mining limiti
if (import.meta.env.DEV && attempts > 100000) {
  console.warn('⚠️ Dev mode mining limiti aşıldı')
  break
}
```

### Build Optimizations
- 🌳 **Tree Shaking** - Kullanılmayan Crypto-JS fonksiyonları kaldırılır
- 📦 **Code Splitting** - Lazy loading desteklenir
- 🗜️ **Minification** - Production'da kod küçültülür
- 📊 **Bundle Analysis** - Bundle size görülebilir

## 🔍 Debug & Logging

```javascript
// Build bilgileri
console.log('📅 Build Time:', __BUILD_TIME__)
console.log('📦 Version:', __APP_VERSION__)

// Vite environment
console.log('🔧 Vite Info:', {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE
})
```

## 📱 Mobile & Legacy Support

### Legacy Plugin
```javascript
// Eski browser desteği
legacy({
  targets: ['defaults', 'not IE 11']
})
```

### Responsive Design
- ✅ Mobile optimized
- ✅ Touch friendly
- ✅ Responsive layout

## 🚀 Production Deployment

### Build Process
```bash
# Production build
npm run build

# Static dosyalar dist/ klasöründe
ls dist/
# index.html
# assets/main.[hash].js
# assets/main.[hash].css
```

### Deploy Options
```bash
# Local preview
npm run preview

# Static hosting (Netlify, Vercel, etc.)
# dist/ klasörünü upload et

# Custom server
npm run serve
```

## 🎯 Gelişmiş Özellikler

### Custom Build Targets
```javascript
// Farklı entry points
rollupOptions: {
  input: {
    main: 'index.html',
    demo: 'demo.html',
    admin: 'admin.html'
  }
}
```

### PWA Support
```javascript
// Service worker
import { VitePWA } from 'vite-plugin-pwa'

plugins: [
  VitePWA({
    registerType: 'autoUpdate',
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}']
    }
  })
]
```

## 🔧 Troubleshooting

### Yaygın Sorunlar

**Problem:** "Module not found"
```bash
# Çözüm: Dependencies yükle
npm install
```

**Problem:** HMR çalışmıyor
```bash
# Çözüm: Server restart
npm run dev
```

**Problem:** Build hatası
```bash
# Çözüm: Clean ve rebuild
rm -rf dist node_modules
npm install
npm run build
```

## 📈 Gelecek Planları

- [ ] **PWA** desteği
- [ ] **Service Worker** offline cache
- [ ] **Web Workers** mining
- [ ] **WebAssembly** optimizasyonu
- [ ] **TypeScript** migration
- [ ] **Vue.js/React** integration

## 🤝 Scripts Özeti

| Script | Komut | Açıklama |
|--------|-------|----------|
| `dev` | `npm run dev` | Development server |
| `build` | `npm run build` | Production build |
| `preview` | `npm run preview` | Build preview |
| `serve` | `npm run serve` | Static server |

---

⚡ **Vite ile modern geliştirme deneyimi!**

## 🌐 Demo

- **Development:** http://localhost:5173
- **Preview:** http://localhost:4173
- **Build:** `dist/index.html`