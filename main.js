/* TODO: 
- Change drawing mechanism to use canvas. This will alleviate the problem
that not all squares are drawn when the cursor moves quickly.
- Display current painting mode.
- Color picker.
*/

initializeGrid(squaresPerSide = 25);
attachButtonEventListeners();

function initializeGrid(squaresPerSide) {
  drawGrid(squaresPerSide);
  preventDragging();
  changeSquare('paint'); // Enables painting mode by default
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

function attachButtonEventListeners() {
  const paintButton = document.querySelector('.paint');
  paintButton.addEventListener('click', () => changeSquare('paint'));

  const paintRainbowButton = document.querySelector('.rainbow');
  paintRainbowButton.addEventListener('click', () => changeSquare('rainbow'));

  const eraseButton = document.querySelector('.eraser');
  eraseButton.addEventListener('click', () => changeSquare('erase'));

  const newCanvasButton = document.querySelector('.new-canvas');
  newCanvasButton.addEventListener('click', () => showPrompt());
}

function changeSquare(paintMode) {
  /* Paint/unpaint when mouse is on div and pressed down,
 and also when mouse is held down and moved over next div. */
  const squares = getSquares();

  squares.forEach((square) => {
    square.addEventListener('mousedown', () => {
      if (paintMode === 'paint') {
        paintSquare(square);
      }
      else if (paintMode === 'rainbow') {
        paintSquareRainbow(square);
      }
      else if (paintMode === 'erase') {
        unpaintSquare(square);
      }
    });
    square.addEventListener('mouseover', (e) => {
      if ((paintMode === 'paint') && (e.buttons === 1)) {
        paintSquare(square);
      }
      else if (paintMode === 'rainbow' && (e.buttons === 1)) {
        paintSquareRainbow(square);
      }
      else if ((paintMode === 'erase') && (e.buttons === 1)) {
        unpaintSquare(square);
      }
    });
  });
}

function showPrompt() {
  squaresPerSide = prompt(
    'Enter the number of squares each side of the canvas should have:',
    squaresPerSide);

  // Exit prompt if user cancels
  if (squaresPerSide === null) {
    squaresPerSide = 25;
    return;
  }

  squaresPerSide = Math.round(squaresPerSide);

  // Prompt again if input is invalid
  if (checkValidSquareNumber(squaresPerSide)) {
    drawNewCanvas(squaresPerSide);
  }
  else {
    squaresPerSide = 25;
    alert('Please enter a number between 1 and 100.');
    showPrompt();
  }
}

function drawNewCanvas(squaresPerSide) {
  squares = getSquares();
  squares.forEach((square) => square.remove());
  initializeGrid(squaresPerSide);
}

function paintSquare(square) {
  // Use .add, not .toggle because .add causes unintentional unpainting
  square.style['background-color'] = 'black';
}

function paintSquareRainbow(square) {
  // Credit https://css-tricks.com/snippets/javascript/random-hex-color/
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  square.style['background-color'] = "#" + randomColor;
}

function unpaintSquare(square) {
  square.style['background-color'] = '#f0f2eb';
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
