import { Suspense, type Component } from 'solid-js';
import { A, useLocation } from '@solidjs/router';

const App: Component<{ children: Element }> = (props) => {
  const location = useLocation();

  return (
    <>
      <nav class="bg-gray-200 text-gray-900 px-4">
        <ul class="flex items-center">
          <li class="py-2 px-4">
            <A href="/" class="no-underline hover:underline">
              Home
            </A>
          </li>
          <li class="py-2 px-4">
            <A href="/about" class="no-underline hover:underline">
              About
            </A>
          </li>
          <li class="py-2 px-4">
            <A href="/error" class="no-underline hover:underline">
              Error
            </A>
          </li>
          <li class="py-2 px-4">
            <A href="/contact" class="no-underline hover:underline">
              Contact
            </A>
          </li>

          <li class="text-sm flex items-center space-x-1 ml-auto">
            <span>URL:</span>
            <input
              class="w-75px p-1 bg-white text-sm rounded-lg"
              type="text"
              readOnly
              value={location.pathname}
            />
          </li>
        </ul>
      </nav>
      <button className="btn btn-dash">Default</button>

      <details class="dropdown">
        <summary class="btn m-1">open or close</summary>
        <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </details>

      <main>
        <Suspense>{props.children}</Suspense>
      </main>
    </>
  );
};

export default App;
