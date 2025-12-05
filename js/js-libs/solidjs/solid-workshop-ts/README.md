## Usage

Those templates dependencies are maintained via [pnpm](https://pnpm.io) via `pnpm up -Lri`.

This is the reason you see a `pnpm-lock.yaml`. That being said, any package manager will work. This file can be safely be removed once you clone a template.

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)

## This project was created with the [Solid CLI](https://github.com/solidjs-community/solid-cli)

## Paylaşılan store nasıl kullanılır (kısa)

Bu proje içinde iki basit yaklaşım gösteriliyor — 1) modül ihracı (export) ile global store ve 2) Context provider kullanımı.

- Modül export yöntemi: `src/store.ts` içinde `export const [state, setState] = createStore(...)` şeklinde tanımlayıp diğer bileşenlerde `import { state, setState } from './store'` ile kullanabilirsiniz. Basit ve hızlı, küçük uygulamalar için uygundur.
- Context Provider yöntemi: `src/store-context.tsx` içinde `StoreProvider` ve `useStore` hook'u tanımlanmıştır. Uygulamanızı provider ile sararak bileşenlerde `const [state, setState] = useStore()` şeklinde erişim sağlayabilirsiniz. Büyük uygulamalarda bağımlılık enjeksiyonu gibi davranır ve test edilebilirliği artırır.

Örnekler:

1) Modül export (global): `src/store.ts` — `App.tsx` ve `Comp.tsx` doğrudan `state`/`setState` kullanır.
2) Context: `src/store-context.tsx` — `StoreProvider` ile sarmalayıp `ContextChild.tsx` içinde `useStore()` kullanılır.

