import {
  MenuActions,
  getUpdatedIndex,
  getActionFromKey,
  maintainScrollVisibility,
  isScrollable,
  getIndexByLetter,
} from "./Helper";

export class FiSelect {
  el: any;
  comboEl: any;
  valueEl: any;
  listboxEl: any;
  idBase: any;
  options: any;
  activeIndex: number;
  open: boolean;
  searchString: string;
  searchTimeout;
  ignoreBlur: any;

  /*
   * Read-only select code
   */
  constructor(el, options) {
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
  }

  init() {
    this.valueEl.innerHTML = this.options[0];

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
  }

  getSearchString(char) {
    if (typeof this.searchTimeout === "number") {
      window.clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = window.setTimeout(() => {
      this.searchString = "";
    }, 1000);

    this.searchString += char;
    return this.searchString;
  }

  onComboKeyDown(event) {
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
  }

  onComboBlur() {
    if (this.ignoreBlur) {
      this.ignoreBlur = false;
      return;
    }

    if (this.open) {
      this.selectOption(this.activeIndex);
      this.updateMenuState(false, false);
    }
  }

  onOptionChange(index) {
    this.activeIndex = index;
    this.comboEl.setAttribute(
      "aria-activedescendant",
      `${this.idBase}-${index}`
    );

    // update active style
    const options = this.el.querySelectorAll("[role=option]");
    [...options].forEach((optionEl) => {
      optionEl.classList.remove("option-current");
    });
    options[index].classList.add("option-current");

    if (isScrollable(this.listboxEl)) {
      maintainScrollVisibility(options[index], this.listboxEl);
    }
  }

  onOptionClick(index) {
    this.onOptionChange(index);
    this.selectOption(index);
    this.updateMenuState(false);
  }

  onOptionMouseDown() {
    this.ignoreBlur = true;
  }

  selectOption(index) {
    const selected = this.options[index];
    this.valueEl.innerHTML = selected;
    this.activeIndex = index;

    // update aria-selected
    const options = this.el.querySelectorAll("[role=option]");
    [...options].forEach((optionEl) => {
      optionEl.setAttribute("aria-selected", "false");
    });
    options[index].setAttribute("aria-selected", "true");
  }

  updateMenuState(open, callFocus = true) {
    this.open = open;

    this.comboEl.setAttribute("aria-expanded", `${open}`);
    open ? this.el.classList.add("open") : this.el.classList.remove("open");
    callFocus && this.comboEl.focus();

    // update activedescendant
    const activeID = open
      ? `${this.idBase}-${this.activeIndex}`
      : this.valueEl.id;
    this.comboEl.setAttribute("aria-activedescendant", activeID);
  }
}
