// Local lightweight Component type to avoid requiring 'solid-js' type declarations
type Component = (props?: any) => any;

const App: Component = () => {
  return (
    <p class="text-4xl text-green-700 text-center py-20">Hello tailwind!</p>
  );
};

export default App;
