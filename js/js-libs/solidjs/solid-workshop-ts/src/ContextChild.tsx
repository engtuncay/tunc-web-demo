import { useStore } from './store-context';

export default function ContextChild() {
  const [state, setState] = useStore();

  return (
    <div style={{ border: '1px solid #ddd', padding: '8px', marginTop: '8px' }}>
      <h3>Context Child</h3>
      <p>Context Count: {state.count}</p>
      <button onClick={() => setState('count', state.count + 1)}>Artır (Context)</button>
    </div>
  );
}
