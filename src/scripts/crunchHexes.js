/**
 * @typedef Hexagon
 * @prop {boolean} fill true = solid, false = hollow
 * @prop {boolean} whole true is whole, false is half
 */

class Hexagon {
    constructor(fill, whole) {
        this.fill = fill;
        this.whole = whole;
    }
}

/**
 * @param width {number}
 * @param height {number}
 * @param orientation {"vertical" | "horizontal"}
 * @param randomnessModifier {number}
 *
 * @return Hexagon[][]
 */
function buildHexGrid(
    width,
    height,
    orientation = "vertical",
    randomnessModifier
) {
    /**
     * @type {Hexagon[][]}
     */
    const hexagons = [];

    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            const hex = new Hexagon(
                Math.random() < randomnessModifier,
                Math.random() < randomnessModifier
            );
            row.push(hex)
        }
        hexagons.push(row);
    }

    return hexagons;
}

export { buildHexGrid }