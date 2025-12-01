import { createEffect, createSignal, Suspense } from 'solid-js';

export default function Contact() {

  // createEffect(() => {
  //   console.log(name());
  // });

  const [getInput, setInput] = createSignal("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form submitted with input: ${getInput()}`);
  };


  return (
    <section class="bg-amber-100 text-gray-700 p-8">
      <h1 class="text-2xl font-bold">Contact</h1>

      <p class="mt-4">Contact</p>

      <p>Hello</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          class="border rounded-lg px-2 border-gray-900"
          value={getInput()}
          onInput={(e) => setInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

    </section>
  );
}
