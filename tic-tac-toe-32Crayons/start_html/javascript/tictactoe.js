/* Taking player names as input*/
var Player1 = prompt("Player 1, please enter your name", "<name goes here>");
while(Player1 === null || Player1 === "<name goes here>" || Player1 === "")
  Player1 = prompt("Please give your name, Player 1", "<name goes here>");
var Player2 = prompt("Player 2, please enter your name", "<name goes here>");
while(Player2 === null || Player2 === "<name goes here>" || Player2 === "")
  Player2 = prompt("Please give your name, Player 2", "<name goes here>");
while(Player1 === Player2 || Player2 === null || Player2 === "<name goes here>" || Player2 === "")
  Player2 = prompt("Player 2, Please give a different name other than Player 1", "<name goes here>");


var size_matrix = 3,
  empty = '&nbsp;',
  boxes = [],
  chance = Player1,
  score,
  moves;

function init() {
  var board = document.createElement('table');
  board.setAttribute('border', 1);
  board.setAttribute('cellspacing', 0);

  var identifier = 1;
  for (var i = 0; i < size_matrix; i++) {
    var row = document.createElement('tr');
    board.appendChild(row);
    for (var j = 0; j < size_matrix; j++) {
      var cell = document.createElement('td');
      cell.setAttribute('height', 135);
      cell.setAttribute('width', 135);
      cell.setAttribute('align', 'center');
      cell.setAttribute('valign', 'center');
      cell.classList.add('col' + j, 'row' + i);
      if (i == j) {
        cell.classList.add('diagonal0');
      }
      if (j == size_matrix - i - 1) {
        cell.classList.add('diagonal1');
      }
      cell.identifier = identifier;
      cell.addEventListener('click', set);
      row.appendChild(cell);
      boxes.push(cell);
      identifier += identifier;
    }
  }

  document.getElementById('tictactoe').appendChild(board);
  startNewGame();
}

/**
 * New game
 */
function startNewGame() {
  score = {
    'X': 0,
    'O': 0
  };
  moves = 0;
  chance = Player1;
  boxes.forEach(function (square) {
    square.innerHTML = empty;
  });
  document.getElementById('chance').textContent = "Hey " + chance + ", it's your chance!";
}

/**
 * Check if a win or not
 */
function win(clicked) {
  // Get all cell classes
  var memberOf = clicked.className.split(/\s+/);
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = '.' + memberOf[i];
    var checker;
    if(chance == Player1){
    checker = 'X';
    }
    else{
    checker = 'O';
    }
    var items = contains('#tictactoe ' + testClass, checker);
    // winning condition: chance == size_matrix
    if (items.length == size_matrix) {
      return true;
    }
  }
  return false;
}

/**
 * Helper function to check if NodeList from selector has a particular text
 */
function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

/**
 * Sets clicked square and also updates the chance.
 */
function set() {
  if (this.innerHTML !== empty) {
    return;
  }
  if(chance == Player1){
  this.innerHTML = 'X';
  }
  else{
  this.innerHTML = 'O';
  }
  moves += 1;
  score[chance] += this.identifier;
  if (win(this)) {
    alert('Game ends, ' + chance + ' wins!');
    startNewGame();
  } else if (moves === size_matrix * size_matrix) {
    alert("There is no winner, it's a draw!");
    startNewGame();
  } else {
    chance = chance === Player1 ? Player2 : Player1;
    document.getElementById('chance').textContent = "Hey " + chance + ", it's your chance!";
  }
}

init();