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
} from "./fiComboHelper.js";

/*
 * Editable Combobox code
 */
export class FiComboBoxEdit {
    el;
    inputEl;
    listboxEl;
    idBase;
    options;
    activeIndex;
    open;
    ignoreBlur;

    constructor(el, options) {
        // element refs
        this.el = el;
        this.inputEl = el.querySelector("input");
        this.listboxEl = el.querySelector("[role=listbox]");

        // data
        this.idBase = this.inputEl.id;
        this.options = options;

        // state
        this.activeIndex = 0;
        this.open = false;
    }

    init() {
        this.inputEl.value = this.options[0];
        //console.log('events');
        // event listener
        this.inputEl.addEventListener("input", this.onInput.bind(this));
        this.inputEl.addEventListener("blur", this.onInputBlur.bind(this));
        this.inputEl.addEventListener("click", () => this.updateMenuState(true));
        this.inputEl.addEventListener("keydown", this.onInputKeyDown.bind(this));

        this.options.map((option, index) => {
            const optionEl = document.createElement("div");
            optionEl.setAttribute("role", "option");
            optionEl.id = `${this.idBase}-${index}`;
            optionEl.className =
                index === 0 ? "combo-option option-current" : "combo-option";
            optionEl.setAttribute("aria-selected", `${index === 0}`);
            optionEl.innerText = option;

            optionEl.addEventListener("click", () => {
                this.onOptionClick(index);
            });
            optionEl.addEventListener("mousedown", this.onOptionMouseDown.bind(this));

            this.listboxEl.appendChild(optionEl);
        });
    }

    onInput() {
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
        this.inputEl.setAttribute(
            "aria-activedescendant",
            `${this.idBase}-${index}`
        );

        // update active style
        const options = this.el.querySelectorAll("[role=option]");
        [...options].forEach((optionEl) => {
            optionEl.classList.remove("option-current");
        });
        options[index].classList.add("option-current");

        if (this.open && isScrollable(this.listboxEl)) {
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
        this.inputEl.value = selected;
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

        this.inputEl.setAttribute("aria-expanded", `${open}`);
        open ? this.el.classList.add("open") : this.el.classList.remove("open");
        callFocus && this.inputEl.focus();
    }
}
