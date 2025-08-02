import {$} from './utils.js'
import {buildHexGrid, renderHexGrid} from "./hexGrid.js";
import {clearErrors, printErrors, validateInputs} from "./errors.js";

window.onload = () => {
    console.log('Loaded')
}

/**
 * @typedef HexGridInputs
 * @prop
 */

// Generate hexes
$.id('generate').addEventListener('click', () => {
    clearErrors();

    const input = {
        height: $.id('height-input').value,
        width: $.id('width-input').value,
        orientation: $.id('orientation-input').value,
        randomnessModifier: $.id('hex-range-input').value
    }

    const isValidInput = validateInputs(input);
    if (!isValidInput) {
        return;
    }

    const hexGrid = buildHexGrid(input)
    renderHexGrid(hexGrid, input.orientation)
});

// Clear screen
$.id('clear').addEventListener('click', () => {
    clearErrors();
    $.id('hex-grid').innerHTML = '';
})

$.id('print').addEventListener('click', sendHexGridToPrinter);


///////////////////

function sendHexGridToPrinter() {
    console.log('Got here')
    const hexRoot = $.id('hex-root');
    const hexGrid = $.id('hex-grid');
    if (!hexGrid || hexGrid.innerHTML === '') {
        printErrors(["Can't print an empty grid"])
        return;
    }

    window.print();
}