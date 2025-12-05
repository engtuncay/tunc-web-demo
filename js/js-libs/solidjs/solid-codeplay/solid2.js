import { createSignal, onMount } from 'solid-js';

function Counter() {
    const [count, setCount] = createSignal(0);

    const increment = () => setCount(count() + 1);

    return (
        <div>
            <h1>SolidJS Counter - Ayrı Dosya</h1>
            <p>Count: {count()}</p>
            <button onClick={increment}>Artır</button>
        </div>
    );
}

// Uygulamayı render et
const root = document.getElementById('app');
SolidJS.render(() => <Counter />, root);