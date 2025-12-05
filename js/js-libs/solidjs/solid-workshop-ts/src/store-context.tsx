import { createContext, useContext, ParentComponent } from 'solid-js';
import { createStore, type SetStoreFunction } from 'solid-js/store';

type StoreState = { count: number };
type StoreTuple = [StoreState, SetStoreFunction<StoreState>];

const StoreContext = createContext<StoreTuple | undefined>();

export const StoreProvider: ParentComponent = (props) => {
  const [state, setState] = createStore<StoreState>({ count: 0 });
  return <StoreContext.Provider value={[state, setState]}>{props.children}</StoreContext.Provider>;
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx as StoreTuple;
};
