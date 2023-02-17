/* TODO: Change drawing mechanism to use canvas. This will alleviate the problem
that not all squares are drawn when the cursor moves quickly. */

initializeGrid(squaresPerSide = 25);
setNewCanvasListener();

function initializeGrid(squaresPerSide) {
  drawGrid(squaresPerSide);
  paint();
  preventDragging();
}

function drawGrid(squaresPerSide) {
  const container = document.querySelector('.container');

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

function preventDragging() {
  // Prevent dragging on divs
  const squares = getSquares();
  squares.forEach((square) => {
    square.addEventListener('dragstart', (e) => e.preventDefault());
  });
}

function paint() {
  /* Paint when mouse is on div and pressed down,
  and also when mouse is held down and moved over next div. */
  const squares = getSquares();
  squares.forEach((square) => {
    square.addEventListener('mouseover', (e) => {
      if (e.buttons === 1) square.classList.add('color-changed');
    });
    square.addEventListener('mousedown', () => {
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
    'Enter the number of squares each side of the canvas should have:', 25);
  squaresPerSide = Math.round(squaresPerSide);

  // Prompt again if input is invalid
  if (checkValidSquareNumber(squaresPerSide)) {
    drawNewCanvas(squaresPerSide);
  }
  else {
    alert('Please enter a number between 1 and 100.');
    showPrompt();
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
  if (
    Number.isInteger(squaresPerSide)
    && squaresPerSide <= 100 // Larger numbers might make browser unstable
    && squaresPerSide > 0
  ) {
    return true;
  }
  else return false;
}
