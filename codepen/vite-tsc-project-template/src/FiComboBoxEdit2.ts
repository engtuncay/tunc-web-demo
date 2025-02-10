import {
  MenuActions,
  filterOptions,
  getUpdatedIndex,
  getActionFromKey,
  maintainScrollVisibility,
  isScrollable,
} from "./Helper";

/*
 * Editable Combobox code
 */
export class FiComboBoxEdit2 {
  elDiv: Element;
  elInput: HTMLInputElement;
  elListboxDiv: Element;
  idBase;
  options: any[];
  activeIndex;
  open: boolean;
  ignoreBlur: boolean;

  constructor(el: Element, options: any[]) {
    // element refs (js-combobox sınıfı tanımlı element-div)
    this.elDiv = el;
    this.elInput = el.querySelector("input");
    this.elListboxDiv = el.querySelector("[role=listbox]");

    // data
    this.idBase = this.elInput.id;
    this.options = options;

    // state
    this.activeIndex = 0;
    this.open = false;
  }

  // initialize component
  init() {
    if (this.getOptionsInit().length > 0) {
      this.elInput.value = this.options[0];
    }

    //console.dir(this.onInput.bind(this));
    this.elInput.addEventListener("input", this.onInput.bind(this));
    this.elInput.addEventListener("blur", this.onInputBlur.bind(this));
    this.elInput.addEventListener("click", () => this.updateMenuState(true));
    this.elInput.addEventListener("keydown", this.onInputKeyDown.bind(this));

    //console.group("options");
    //seçenekler burada ekleniyor
    this.options.map((txOption, index) => {
      const optionEl = document.createElement("div");
      optionEl.setAttribute("role", "option");
      optionEl.id = `${this.idBase}-${index}`;
      optionEl.className =
        index === 0 ? "combo-option option-current" : "combo-option";
      optionEl.setAttribute("aria-selected", `${index === 0}`);
      optionEl.innerText = txOption;

      optionEl.addEventListener("click", () => {
        this.onOptionClick(index);
      });
      optionEl.addEventListener("mousedown", this.onOptionMouseDown.bind(this));

      this.elListboxDiv.appendChild(optionEl);
      //console.log(optionEl);
    });
    //console.groupEnd();
  }

  onInput() {
    //console.log("onInput triggered");
    const curValue = this.elInput.value;
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
  }

  onInputKeyDown(event) {
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
        this.selectOption(this.activeIndex);
        return this.updateMenuState(false);
      case MenuActions.Close:
        event.preventDefault();
        return this.updateMenuState(false);
      case MenuActions.Open:
        return this.updateMenuState(true);
    }
  }

  onInputBlur() {
    //console.log("onInputBlur triggered");
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
    this.elInput.setAttribute(
      "aria-activedescendant",
      `${this.idBase}-${index}`
    );

    // update active style
    const options = this.elDiv.querySelectorAll("[role=option]");
    [...options].forEach((optionEl) => {
      optionEl.classList.remove("option-current");
    });
    options[index].classList.add("option-current");

    if (this.open && isScrollable(this.elListboxDiv)) {
      maintainScrollVisibility(options[index], this.elListboxDiv);
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
    this.elInput.value = selected;
    this.activeIndex = index;

    // update aria-selected
    const options = this.elDiv.querySelectorAll("[role=option]");
    [...options].forEach((optionEl) => {
      optionEl.setAttribute("aria-selected", "false");
    });
    options[index].setAttribute("aria-selected", "true");
  }

  updateMenuState(open, callFocus = true) {
    this.open = open;

    this.elInput.setAttribute("aria-expanded", `${open}`);
    open
      ? this.elDiv.classList.add("open")
      : this.elDiv.classList.remove("open");
    callFocus && this.elInput.focus();
  }

  public getOptionsInit(): any[] {
    if (this.options == undefined) {
      this.options = [];
    }
    return this.options;
  }
}
