const container = document.querySelector('.container');

initializeGrid(squaresPerSide = 50);
setNewCanvasListener();

function initializeGrid(squaresPerSide) {
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

function setNewCanvasListener() {
  const button = document.querySelector('.new-canvas');
  button.addEventListener('click', () => showPrompt());
}

function showPrompt() {
  squaresPerSide = prompt(
    'Enter the number of squares each side of the canvas should have:', 50);
  squaresPerSide = Math.round(squaresPerSide);
  if (checkValidSquareNumber(squaresPerSide)) {
    drawNewCanvas(squaresPerSide);
  }
}

function drawNewCanvas(squaresPerSide) {
  squares = getSquares();
  squares.forEach((square) => square.remove());
  initializeGrid(squaresPerSide);
}

function getSquares() {
  return document.querySelectorAll('.container div');
}

function checkValidSquareNumber(squaresPerSide) {
  // Prompt again if input is invalid
  if (
    Number.isInteger(squaresPerSide)
    && squaresPerSide <= 100
    && squaresPerSide > 0
  ) {
    return true;
  }
  else {
    alert('Please enter a number between 1 and 100.');
    showPrompt();
  };
}
