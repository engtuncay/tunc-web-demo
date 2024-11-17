import { FiComboBoxEdit } from "./FiComboBoxEdit";
import {
  Keys,
  MenuActions,
  filterOptions,
  findMatches,
  getUpdatedIndex,
  getActionFromKey,
  getIndexByLetter,
  maintainScrollVisibility,
  isScrollable,
} from "./Helper";

/*
 * Helper constants and functions
 */

// init combo
const comboEl = document.querySelector(".js-combobox");

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

const comboComponent = new FiComboBoxEdit(comboEl, options);
comboComponent.init();

/*
 * Read-only select code
 */
const FiSelect = function (el, options) {
  // element refs
  this.el = el;
  this.comboEl = el.querySelector("[role=combobox]");
  this.valueEl = this.comboEl.querySelector("span");
  this.listboxEl = el.querySelector("[role=listbox]");

  // data
  this.idBase = this.comboEl.id;
  this.options = options;

  // state
  this.activeIndex = 0;
  this.open = false;
  this.searchString = "";
  this.searchTimeout = null;
};

FiSelect.prototype.init = function () {
  this.valueEl.innerHTML = options[0];

  this.comboEl.addEventListener("blur", this.onComboBlur.bind(this));
  this.comboEl.addEventListener("click", () => this.updateMenuState(true));
  this.comboEl.addEventListener("keydown", this.onComboKeyDown.bind(this));

  this.options.map((option, index) => {
    const optionEl = document.createElement("div");
    optionEl.setAttribute("role", "option");
    optionEl.id = `${this.idBase}-${index}`;
    optionEl.className =
      index === 0 ? "combo-option option-current" : "combo-option";
    optionEl.setAttribute("aria-selected", `${index === 0}`);
    optionEl.innerText = option;

    optionEl.addEventListener("click", (event) => {
      event.stopPropagation();
      this.onOptionClick(index);
    });
    optionEl.addEventListener("mousedown", this.onOptionMouseDown.bind(this));

    this.listboxEl.appendChild(optionEl);
  });
};

FiSelect.prototype.getSearchString = function (char) {
  if (typeof this.searchTimeout === "number") {
    window.clearTimeout(this.searchTimeout);
  }

  this.searchTimeout = window.setTimeout(() => {
    this.searchString = "";
  }, 1000);

  this.searchString += char;
  return this.searchString;
};

FiSelect.prototype.onComboKeyDown = function (event) {
  const { key } = event;
  const max = this.options.length - 1;

  const action = getActionFromKey(event, this.open);

  switch (action) {
    case MenuActions.Next:
    case MenuActions.Last:
    case MenuActions.First:
    case MenuActions.Previous:
      event.preventDefault();
      return this.onOptionChange(
        getUpdatedIndex(this.activeIndex, max, action)
      );
    case MenuActions.CloseSelect:
    case MenuActions.Space:
      event.preventDefault();
      this.selectOption(this.activeIndex);
    case MenuActions.Close:
      event.preventDefault();
      return this.updateMenuState(false);
    case MenuActions.Type:
      this.updateMenuState(true);
      var searchString = this.getSearchString(key);
      return this.onOptionChange(
        Math.max(0, getIndexByLetter(this.options, searchString))
      );
    case MenuActions.Open:
      event.preventDefault();
      return this.updateMenuState(true);
  }
};

FiSelect.prototype.onComboBlur = function () {
  if (this.ignoreBlur) {
    this.ignoreBlur = false;
    return;
  }

  if (this.open) {
    this.selectOption(this.activeIndex);
    this.updateMenuState(false, false);
  }
};

FiSelect.prototype.onOptionChange = function (index) {
  this.activeIndex = index;
  this.comboEl.setAttribute("aria-activedescendant", `${this.idBase}-${index}`);

  // update active style
  const options = this.el.querySelectorAll("[role=option]");
  [...options].forEach((optionEl) => {
    optionEl.classList.remove("option-current");
  });
  options[index].classList.add("option-current");

  if (isScrollable(this.listboxEl)) {
    maintainScrollVisibility(options[index], this.listboxEl);
  }
};

FiSelect.prototype.onOptionClick = function (index) {
  this.onOptionChange(index);
  this.selectOption(index);
  this.updateMenuState(false);
};

FiSelect.prototype.onOptionMouseDown = function () {
  this.ignoreBlur = true;
};

FiSelect.prototype.selectOption = function (index) {
  const selected = this.options[index];
  this.valueEl.innerHTML = selected;
  this.activeIndex = index;

  // update aria-selected
  const options = this.el.querySelectorAll("[role=option]");
  [...options].forEach((optionEl) => {
    optionEl.setAttribute("aria-selected", "false");
  });
  options[index].setAttribute("aria-selected", "true");
};

FiSelect.prototype.updateMenuState = function (open, callFocus = true) {
  this.open = open;

  this.comboEl.setAttribute("aria-expanded", `${open}`);
  open ? this.el.classList.add("open") : this.el.classList.remove("open");
  callFocus && this.comboEl.focus();

  // update activedescendant
  const activeID = open
    ? `${this.idBase}-${this.activeIndex}`
    : this.valueEl.id;
  this.comboEl.setAttribute("aria-activedescendant", activeID);
};

// init select
const selectEl = document.querySelector(".js-select");
const selectComponent = new FiSelect(selectEl, options);
selectComponent.init();

/*
 * Multiselect code
 */
const Multiselect = function (el, options) {
  // element refs
  this.el = el;
  this.inputEl = el.querySelector("input");
  this.listboxEl = el.querySelector("[role=listbox]");

  this.idBase = this.inputEl.id;
  this.selectedEl = document.getElementById(`${this.idBase}-selected`);

  // data
  this.options = options;

  // state
  this.activeIndex = 0;
  this.open = false;
};

Multiselect.prototype.init = function () {
  this.inputEl.addEventListener("input", this.onInput.bind(this));
  this.inputEl.addEventListener("blur", this.onInputBlur.bind(this));
  this.inputEl.addEventListener("click", () => this.updateMenuState(true));
  this.inputEl.addEventListener("keydown", this.onInputKeyDown.bind(this));
  this.listboxEl.addEventListener("blur", this.onInputBlur.bind(this));

  this.options.map((option, index) => {
    const optionEl = document.createElement("div");
    optionEl.setAttribute("role", "option");
    optionEl.id = `${this.idBase}-${index}`;
    optionEl.className =
      index === 0 ? "combo-option option-current" : "combo-option";
    optionEl.setAttribute("aria-selected", "false");
    optionEl.innerText = option;

    optionEl.addEventListener("click", () => {
      this.onOptionClick(index);
    });
    optionEl.addEventListener("mousedown", this.onOptionMouseDown.bind(this));

    this.listboxEl.appendChild(optionEl);
  });
};

Multiselect.prototype.onInput = function () {
  const curValue = this.inputEl.value;
  const matches = filterOptions(this.options, curValue);

  // set activeIndex to first matching option
  // (or leave it alone, if the active option is already in the matching set)
  const filterCurrentOption = matches.filter(
    (option) => option === this.options[this.activeIndex]
  );
  if (matches.length > 0 && !filterCurrentOption.length) {
    this.onOptionChange(this.options.indexOf(matches[0]));
  }

  const menuState = this.options.length > 0;
  if (this.open !== menuState) {
    this.updateMenuState(menuState, false);
  }
};

Multiselect.prototype.onInputKeyDown = function (event) {
  const max = this.options.length - 1;

  const action = getActionFromKey(event, this.open);

  switch (action) {
    case MenuActions.Next:
    case MenuActions.Last:
    case MenuActions.First:
    case MenuActions.Previous:
      event.preventDefault();
      return this.onOptionChange(
        getUpdatedIndex(this.activeIndex, max, action)
      );
    case MenuActions.CloseSelect:
      event.preventDefault();
      return this.updateOption(this.activeIndex);
    case MenuActions.Close:
      event.preventDefault();
      return this.updateMenuState(false);
    case MenuActions.Open:
      return this.updateMenuState(true);
  }
};

Multiselect.prototype.onInputBlur = function () {
  if (this.ignoreBlur) {
    this.ignoreBlur = false;
    return;
  }

  if (this.open) {
    this.updateMenuState(false, false);
  }
};

Multiselect.prototype.onOptionChange = function (index) {
  this.activeIndex = index;
  this.inputEl.setAttribute("aria-activedescendant", `${this.idBase}-${index}`);

  // update active style
  const options = this.el.querySelectorAll("[role=option]");
  [...options].forEach((optionEl) => {
    optionEl.classList.remove("option-current");
  });
  options[index].classList.add("option-current");

  if (this.open && isScrollable(this.listboxEl)) {
    maintainScrollVisibility(options[index], this.listboxEl);
  }
};

Multiselect.prototype.onOptionClick = function (index) {
  this.onOptionChange(index);
  this.updateOption(index);
  this.inputEl.focus();
};

Multiselect.prototype.onOptionMouseDown = function () {
  this.ignoreBlur = true;
};

Multiselect.prototype.removeOption = function (index) {
  const option = this.options[index];

  // update aria-selected
  const options = this.el.querySelectorAll("[role=option]");
  options[index].setAttribute("aria-selected", "false");
  options[index].classList.remove("option-selected");

  // remove button
  const buttonEl = document.getElementById(`${this.idBase}-remove-${index}`);
  this.selectedEl.removeChild(buttonEl.parentElement);
};

Multiselect.prototype.selectOption = function (index) {
  const selected = this.options[index];
  this.activeIndex = index;

  // update aria-selected
  const options = this.el.querySelectorAll("[role=option]");
  options[index].setAttribute("aria-selected", "true");
  options[index].classList.add("option-selected");

  // add remove option button
  const buttonEl = document.createElement("button");
  const listItem = document.createElement("li");
  buttonEl.className = "remove-option";
  buttonEl.type = "button";
  buttonEl.id = `${this.idBase}-remove-${index}`;
  buttonEl.setAttribute("aria-describedby", `${this.idBase}-remove`);
  buttonEl.addEventListener("click", () => {
    this.removeOption(index);
  });
  buttonEl.innerHTML = selected + " ";

  listItem.appendChild(buttonEl);
  this.selectedEl.appendChild(listItem);
};

Multiselect.prototype.updateOption = function (index) {
  const option = this.options[index];
  const optionEl = this.el.querySelectorAll("[role=option]")[index];
  const isSelected = optionEl.getAttribute("aria-selected") === "true";

  if (isSelected) {
    this.removeOption(index);
  } else {
    this.selectOption(index);
  }

  this.inputEl.value = "";
};

Multiselect.prototype.updateMenuState = function (open, callFocus = true) {
  this.open = open;

  this.inputEl.setAttribute("aria-expanded", `${open}`);
  open ? this.el.classList.add("open") : this.el.classList.remove("open");
  callFocus && this.inputEl.focus();
};

// init multiselect
const multiselectEl = document.querySelector(".js-multiselect");

const multiselectComponent = new Multiselect(multiselectEl, options);
multiselectComponent.init();

//document.getElementById("").innerHTML;
