const container = document.querySelector('.container');
const squaresPerSide = 15;

createGrid(squaresPerSide);
changeSquareColor();
clearCanvas();

function createGrid(squaresPerSide) {
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
  })
}

function clearCanvas() {
  const button = document.querySelector('.clear-canvas');
  const squares = getSquares();
  button.addEventListener('click', () => {
    squares.forEach((square) => {
    square.classList.remove('color-changed');
  });
  })
}

function getSquares() {
  return document.querySelectorAll('.container div');
}