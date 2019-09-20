/* html example
<label class="bb-checkbox js-bb-checkbox">
    <input type="checkbox">
    <span class="bb-checkbox__box"></span>
    <span class="bb-checkbox__title">WhatsApp</span>
</label>
*/
class CheckBox {
    constructor(args) {
        this.selector = document.querySelectorAll(args.selector);

        if (typeof this.selector == 'undefined') {
            return;
        }

        // this.init();
        this.checkStatus();
    }

    init() {
        let checkbox = this.selector;

        for (let i = 0; i < checkbox.length; i++) {
            let label = checkbox[i];
            let checkboxInput = label.querySelector('input[type="checkbox"]');

            label.addEventListener('click', e => e.stopImmediatePropagation());

            if (checkboxInput) {
                checkboxInput.addEventListener('change', function(e) {
                    let input = e.target;

                    if (input.checked) {
                        label.classList.add('is-checked');
                        input.setAttribute('checked', 'checked');
                    } else {
                        label.classList.remove('is-checked');
                        input.removeAttribute('checked');
                        label.classList.remove('is-checked');
                        input.removeAttribute('checked');
                    }
                });
            }

            // checkbox[i].addEventListener('click', function(e) {
            //     let elem = this;
            //     let elementToggle = elem.querySelector(
            //         'input[type="checkbox"]'
            //     );
            //     if (elementToggle.checked) {
            //         elem.classList.remove('is-checked');
            //         elementToggle.checked = false;
            //         elementToggle.removeAttribute('checked');
            //     } else {
            //         elem.classList.add('is-checked');
            //         elementToggle.checked = true;
            //         elementToggle.setAttribute('checked', 'checked');
            //     }
            //     e.stopPropagation();
            //     // e.preventDefault();
            // });
        }
    }

    checkStatus() {
        let check = [];
        let noCheck = [];
        let togCheck = [];
        let togNoCheck = [];
        let checkbox = this.selector;

        let i;
        let len;

        for (i = 0, len = checkbox.length; i < len; i++) {
            let elem = checkbox[i];
            let elementToggle = elem.querySelector('input[type="checkbox"]');
            if (typeof elementToggle == 'null') {
                if (!elementToggle.checked) {
                    noCheck.push(elem);
                    togNoCheck.push(elementToggle);
                } else {
                    check.push(elem);
                    togCheck.push(elementToggle);
                }
            }
        }
        for (i = 0, len = check.length; i < len; i++) {
            check[i].classList.add('is-checked');
        }

        for (i = 0, len = noCheck.length; i < len; i++) {
            noCheck[i].classList.remove('is-checked');
        }

        for (i = 0, len = togNoCheck.length; i < len; i++) {
            togNoCheck[i].removeAttribute('checked');
            togNoCheck[i].checked = false;
        }

        for (i = 0, len = togCheck.length; i < len; i++) {
            togCheck[i].setAttribute('checked', 'checked');
            togCheck[i].checked = true;
        }
    }
}

// html example
// <label class="bb-checkbox bb-checkbox--radio js-bb-radio">
//     <input name="role" type="radio">
//     <span class="bb-checkbox__box"></span>
//     <span class="bb-checkbox__title">Салон</span>
// </label>
class Radio {
    constructor(args) {
        this.selector = args.selector;

        if (typeof this.selector == 'undefined') {
            return;
        }

        this.init();
    }

    init() {
        let mainScope = this;
        $(this.selector).click(function(event) {
            let element = $(this),
                elementToggle =
                    element.find('input[type="radio"]') ||
                    element.find('.bb-checkbox__toggle');
            let elementToggleName = elementToggle.attr('name');
            let allElements = $(
                mainScope.selector,
                '[name="' + elementToggleName + '"]'
            ).prevObject;
            for (let a = 0; a < allElements.length; a++) {
                if (allElements[a] != elementToggle[0]) {
                    let otherRadio = $(
                            mainScope._getClickElement(
                                mainScope.selector.split('.')[1],
                                allElements[a]
                            )
                        ),
                        otherRadioToggle = otherRadio.find(
                            'input[type="radio"]'
                        );
                    otherRadioToggle.removeAttr('checked');
                    otherRadioToggle.prop('checked', false).trigger('change');
                    otherRadio.removeClass('is-checked');
                }
            }
            if (!elementToggle.prop('checked')) {
                elementToggle.attr('checked', 'checked');
                elementToggle.prop('checked', true).trigger('change');
                element.addClass('is-checked');
            }
        });
    }

    _getClickElement(elementClass, newTarget) {
        let target = newTarget != undefined ? newTarget : event.target,
            body = document.querySelector('body');
        while (!target.classList.contains(elementClass) && target != body) {
            target = target.parentNode;
        }
        return target == body ? undefined : target;
    }
}

export { CheckBox, Radio };
