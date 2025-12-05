import { state, setState } from './store';

export default () => {
  return (
    <div>
      <h2>Child component</h2>
      <p>Shared Count: {state.count}</p>
      <button onClick={() => setState('count', state.count + 1)}>Artır (Child)</button>
    </div>
  );
};
