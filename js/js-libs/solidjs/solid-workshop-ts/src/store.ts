import { createStore } from 'solid-js/store';

// Basit global store - modül olarak dışa aktarılabilir
// (küçük uygulamalarda işe yarar; daha büyük uygulamalarda context kullanmak tavsiye edilir)
export const [state, setState] = createStore({ count: 0 });
