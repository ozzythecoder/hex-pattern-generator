import {$} from './utils.js'

/**
 * @typedef HexGridInput
 * @prop {number} width
 * @prop {number} height
 * @prop {Orientation} orientation
 * @prop {number} randomnessModifier
 */

/**
 * @typedef {'vertical' | 'horizontal'} Orientation
 */

/**
 * @typedef HexagonDimensions
 * @prop {boolean} fill true = solid, false = hollow
 * @prop {boolean} whole true is whole, false is half
 */

class HexagonDimensions {
    constructor(fill, whole) {
        this.fill = fill;
        this.whole = whole;
    }
}

/**
 * @param {HexGridInput}
 * @return HexagonDimensions[][]
 */
function buildHexGrid(
    {width, height, orientation, randomnessModifier}
) {
    /**
     * @type {HexagonDimensions[][]}
     */
    const hexagons = [];

    // get orientation
    // if vertical,
    //  - every odd row should have an extra hex at end
    //  - every even row should have an extra hex at beginning
    // if horizontal,
    //  - first and last rows should have twice as many hexes
    //  - first row: every even hex offset up by 1/2 a hex
    //  - last row: every odd hex offset down by 1/2 a hex
    let renderHeight = parseInt(height);
    if (orientation === "horizontal") {
        renderHeight += 1;
    }

    for (let i = 0; i < renderHeight; i++) {
        const row = [];

        let renderWidth = parseInt(width);
        if (orientation === "vertical") {
            renderWidth += 1;
        }

        for (let j = 0; j < renderWidth; j++) {
            const hex = new HexagonDimensions(
                Math.random() < randomnessModifier,
                Math.random() < randomnessModifier
            );
            row.push(hex)
        }
        hexagons.push(row);
    }

    return hexagons;
}

/**
 * @param {HexagonDimensions[][]} grid
 * @param {'vertical' | 'horizontal'} orientation
 */
function renderHexGrid(grid, orientation) {
    const gridRoot = $.id('hex-grid');
    gridRoot.innerHTML = '';
    gridRoot.style.boxSizing = 'border-box';
    gridRoot.style.width = 'fit-content';
    gridRoot.style.lineHeight = '0';

    console.log('rows:', grid.length)
    console.log('columns:', grid[0].length)

    for (let row = 0; row < grid.length; row++) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('hex-row', orientation);
        for (let col = 0; col < grid[row].length; col++) {
            const el = grid[row][col];
            const hex = document.createElement('hexagon-block');
            hex.classList.add('hex-element');
            hex.setAttribute('orientation', orientation);
            if (el.fill) {
                hex.setAttribute('fill', 'true');
            }
            rowElement.appendChild(hex);
        }
        gridRoot.appendChild(rowElement);
    }

}

export {buildHexGrid, renderHexGrid}