import Comp from './Comp';


const App = () => {
   const [state, setState] = createStore({ count: 0 });

  return (
    <>
      <h1>Hello world!!!!</h1>
      <Comp />
    </>
  );
};


export default App;
