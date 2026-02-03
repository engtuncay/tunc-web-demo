# Tailwind CSS Compiler

Bu proje, `src/` dizinindeki HTML, PHP, JS, TS, JSX, TSX dosyalarınızda kullandığınız Tailwind CSS sınıflarını `myindex.css` dosyasına derler. Sadece kullanılan sınıflar dahil edilir (purge edilmiş).

## Kurulum

```bash
pnpm install
```

## Derleme

```bash
pnpm run build
```

Bu komut, Vite ile projeyi build eder ve üretilen CSS'i `myindex.css` dosyasına kopyalar.

## Geliştirme

```bash
pnpm run dev
```

Vite dev server'ını başlatır ve değişiklikleri izler.

## Yapılandırma

- `tailwind.config.js`: Content yolları (`./src/**/*.{html,js,ts,jsx,tsx,php}`) ve tema ayarları.
- `src/input.css`: Tailwind import'u.
- `vite.config.js`: Vite yapılandırması.

`src/` dizinine HTML veya PHP dosyalarınızı koyun, kullandığınız Tailwind sınıfları otomatik olarak `myindex.css`'e dahil edilecektir.