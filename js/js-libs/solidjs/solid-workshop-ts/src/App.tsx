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

      {/* (Not: project kullanımı modül-export ile devam ediyor) */}
    </>
  );
};

export default App;
