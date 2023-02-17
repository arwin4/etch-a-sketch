const container = document.querySelector('.container');
let squaresPerSide = 15;

initializeGrid();
newCanvas();

function initializeGrid() {
  drawGrid(squaresPerSide);
  changeSquareColor();
}

function drawGrid(squaresPerSide) {
  // Create the divs, then put them in a grid.
  const numDivs = squaresPerSide ** 2;
  for (let i = 0; i < numDivs; i++) {
    const div = document.createElement('div');
    container.appendChild(div);
  }
  /* The divs don't have an explicit shape yet.
  Here they're placed in an implicit grid such that they become square. */
  container.style.gridTemplateColumns = `repeat(${squaresPerSide}, 1fr)`
}

function changeSquareColor() {
  const squares = getSquares();
  squares.forEach((square) => {
    square.addEventListener('mouseover', () => {
      square.classList.add('color-changed');
    });
  });
}

function newCanvas() {
  const button = document.querySelector('.new-canvas');
  button.addEventListener('click', () => {
    squaresPerSide = prompt(
    `Enter the number of squares each side of the canvas should have:`, '50');
    squares = getSquares();
    squares.forEach((square) => square.remove());
    initializeGrid();
  });
}

function getSquares() {
  return document.querySelectorAll('.container div');
}
