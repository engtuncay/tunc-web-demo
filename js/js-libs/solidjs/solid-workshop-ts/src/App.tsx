import type { Component } from 'solid-js';
import Comp from './Comp';
import { StoreProvider } from './store-context';
import ContextChild from './ContextChild';
import { state, setState } from './store';

const App: Component = () => {

  return (
    <>
      <h1>Hello world!!!!</h1>
      <p>Count: {state.count}</p>
      <button onClick={() => setState('count', state.count + 1)}>Artır</button>
      <Comp />

      {/* -- Context provider demo (separate store instance) -- */}
      <div style={{ marginTop: '24px' }}>
        <h2>Context-based store demo (separate store)</h2>
        <StoreProvider>
          <ContextChild />
        </StoreProvider>
      </div>
    </>
  );
};

export default App;
