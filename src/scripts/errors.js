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
    if (inputs.height < 1) {
        errors.push('Height must be greater than 0');
    }
    if (inputs.width < 1) {
        errors.push('Width must be greater than 0');
    }
    if (inputs.randomnessModifier < 0) {
        errors.push('Randomness modifier must be a double precision float between 0 and 1 non-inclusive');
    }
    if (inputs.orientation !== 'vertical' && inputs.orientation !== 'horizontal') {
        errors.push('Orientation must be either vertical or horizontal');
    }
    if (errors.length > 0) {
        printErrors(errors);
        return false;
    }
    return true;
}

export {printErrors, clearErrors, validateInputs}