import { $ } from './utils.js'
import { buildHexGrid } from "./crunchHexes.js";

$.id('generate-h').addEventListener('click', () => {
    // const hexWall = buildHexGrid(10, 10, 'horizontal', 0.5)
    // console.log(hexWall)

    const hex = document.createElement('hexagon-block')

    $.id('hex-grid').append(hex)
})

$.id('generate-v').addEventListener('click', () => {
    // const hexWall = buildHexGrid(10, 10, 'horizontal', 0.5)
    // console.log(hexWall)

    const hex = document.createElement('hexagon-block')
    hex.setAttribute('orientation', 'vertical');

    $.id('hex-grid').append(hex)
})
