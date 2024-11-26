//import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

import { FiComboBoxEdit } from "./FiComboBoxEdit";
import { FiComboBoxEdit2 } from "./FiComboBoxEdit2";
import { FiMultiSelect } from "./FiMultiSelect";
import { FiSelect } from "./FiSelect";

const options = [
  "Apple",
  "Banana",
  "Blueberry",
  "Boysenberry",
  "Cherry",
  "Durian",
  "Eggplant",
  "Fig",
  "Grape",
  "Guava",
  "Huckleberry",
];

// Editable Combobox
const elCombo: Element = document.querySelector(".js-combobox");
const comboComponent = new FiComboBoxEdit(elCombo, options);
comboComponent.init();

// Non-Editable Combobox (select)
const selectEl = document.querySelector(".js-select");
const selectComponent = new FiSelect(selectEl, options);
selectComponent.init();

// init multiselect
const multiselectEl = document.querySelector(".js-multiselect");
const multiselectComponent = new FiMultiSelect(multiselectEl, options);
multiselectComponent.init();

// Editable Combobox (2)
const elCombo2: Element = document.querySelector(".js-combobox2");
const comboComponent2 = new FiComboBoxEdit2(elCombo2, options);
comboComponent2.init();




//document.getElementById("").innerHTML;

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
