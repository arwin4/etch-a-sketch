const container = document.querySelector('.container');
const squaresPerSide = 21;

createDivs(squaresPerSide);
createGrid(squaresPerSide);

function createDivs(squaresPerSide) {
    const numDivs = squaresPerSide ** 2;
    for (let i = 0; i < numDivs; i++) {
        const div = document.createElement('div');
        container.appendChild(div);
    }
}

function createGrid(squaresPerSide) {
    /* The divs made by createDivs don't have an explicit shape yet.
    Here they're placed in an implicit grid such that they become square. */
    container.style.gridTemplateColumns = `repeat(${squaresPerSide}, 1fr)`
}