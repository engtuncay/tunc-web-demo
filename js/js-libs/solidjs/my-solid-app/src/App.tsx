import { createSignal, Show } from 'solid-js';
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hello from './Hello.tsx';
import ModLogin from './mods/ModLogin.tsx';

function App() {
  const [boLogin] = createSignal(false);
  const [count, setCount] = createSignal(0)

  // function handleLogin() {
  //   setBoLogin(true);
  // }

  return (
    <>
      <Show when={boLogin}>
        <ModLogin/>
      </Show>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img src={solidLogo} class="logo solid" alt="Solid logo" />
        </a>
      </div>
      <h1 class="bg-primary-subtle">Vite + Solid</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count()}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">
        Click on the Vite and Solid logos to learn more
      </p>
      <Hello></Hello>
    </>
  )
}

export default App
