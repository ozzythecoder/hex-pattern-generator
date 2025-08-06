import {$} from './utils.js'

/**
 * @param {string[]} errors
 */
function printErrors(errors) {
    const errorRoot = $.id('error-root');
    const errorHeader = document.createElement("h2");
    errorHeader.innerText = "Error";
    errorRoot.appendChild(errorHeader);
    const errorList = document.createElement("ul")
    errorRoot.appendChild(errorList);

    for (let error of errors) {
        errorList.appendChild(document.createElement("li")).innerText = error;
    }
}

function clearErrors() {
    const errorRoot = $.id('error-root');
    errorRoot.innerHTML = '';
}


/**
 * @param {HexGridInputs} inputs
 */
function validateInputs(inputs) {
    const errors = [];

    const result = validateAll([
        {
            condition: () => inputs.height > 0,
            invalidMessage: 'Height must be greater than 0'
        },
        {
            condition: () => inputs.width > 0,
            invalidMessage: 'Width must be greater than 0'
        },
        {
            condition: () => inputs.randomnessModifier >= 0 && inputs.randomnessModifier <= 1,
            invalidMessage: 'Randomness modifier must be a double precision float between 0 and 1 non-inclusive'
        },
        {
            condition: () => inputs.orientation === 'vertical' || inputs.orientation === 'horizontal',
            invalidMessage: 'Orientation must be either vertical or horizontal'
        }
    ])

    if (result.success) return true;
    printErrors(result.errors);
    return false;
}

/**
 * @typedef Validator
 * @prop {() => boolean} condition
 * @prop {string} invalidMessage
 */

/**
 * @param {Validator[]} validators
 * @return {{ success: true, errors: undefined } || { success: false, errors: string[] }}
 */
function validateAll(validators) {
    for (let validator of validators) {
        if (!validator.condition()) {
            return {
                success: false,
                errors: [validator.invalidMessage]
            }
        }
    }
    return {
        success: true,
        errors: undefined
    }
}

export {printErrors, clearErrors, validateInputs}