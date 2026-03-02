let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOn = 'yes';

let scoreX = 0;
let computer = 0;

document.getElementById('scoreX').innerHTML = "Player X :  " + scoreX;
document.getElementById('computer').innerHTML = "Computer :  " + computer;

const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
  cell.addEventListener('click', function() {
    const index = parseInt(this.getAttribute('game-move'));
    gameMove(index);
  });
});

function gameMove(index) {
  if (gameOn === 'no' || board[index] !== '') {
    return;
  }

  board[index] = 'X';
  
  const cell = document.querySelector(`[game-move="${index}"]`);
  cell.innerHTML = 'X';
  cell.style.color = '#ff0000';
  cell.style.font = 'bold 24px Arial';

  checkWinner();

  if (gameOn === 'yes') {
    currentPlayer = 'O';
    document.getElementById('plays').innerHTML = "Computer's Turn";
    
    setTimeout(computerMove, 800);
  }
}

function computerMove() {
  if (gameOn === 'no') return;

function winningMove(player) {
  const winMethods = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let combination of winMethods) {
    const [a, b, c] = combination;
    
    let count = 0;
    if (board[a] === player) count++;
    if (board[b] === player) count++;
    if (board[c] === player) count++; 

    if (count === 2) {
      if (board[a] === '') return a;
      if (board[b] === '') return b;
      if (board[c] === '') return c;
    }
  }

  return -1;
}

function makeMove(index) {
  board[index] = 'O';

  const cell = document.querySelector(`[game-move="${index}"]`);
  cell.innerHTML = 'O';
  cell.style.color = '#0099ff';
  cell.style.font = 'bold 24px Arial';

  checkWinner();

  if (gameOn === 'yes') {
    currentPlayer = 'X';
    document.getElementById('plays').innerHTML = "Player X's Turn";
  }
}

 let bestMove = -1;
  
  bestMove = winningMove('O');
  if (bestMove !== -1) {
    makeMove(bestMove);
    return;
  }
  
  bestMove = findWinningMove('X');
  if (bestMove !== -1) {
    makeMove(bestMove);
    return;
  }
  // center
  if (board[4] === '') {
    makeMove(4);
    return;
  }
  //  corners
  const corners = [0, 2, 6, 8];
  for (let corner of corners) {
    if (board[corner] === '') {
      makeMove(corner);
      return; 
    }
  }
  // 
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      makeMove(i);
      return;
    }
  }
}

function checkWinner() {
  const winMethods = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [2, 4, 6], [0, 4, 8]
  ];

  for (let i = 0; i < winMethods.length; i++) {
    const [a, b, c] = winMethods[i];
    const box1 = board[a];
    const box2 = board[b];
    const box3 = board[c];

    if (box1 !== '' && box1 === box2 && box2 === box3) {
      gameOn = 'no';

      if (box1 === 'X') {
        scoreX++;
        document.getElementById('plays').innerHTML = 'You Win! 🎉';
        document.getElementById('scoreX').innerHTML = "Player X :  " + scoreX;
      } else {
        computer++;
        document.getElementById('plays').innerHTML = 'Computer Wins! 🤖';
        document.getElementById('computer').innerHTML = "Computer :  " + computer;
      }
      return;
    }
  }

  if (!board.includes('') && gameOn === 'yes') {
    gameOn = 'no';
    document.getElementById('plays').innerHTML = "It's a tie 🤝";
  }
}

function playAgain() {
  board = ['', '', '', '', '', '', '', '', ''];

  
  const allCells = document.querySelectorAll('.cell');
  for (let i = 0; i < allCells.length; i++) {
    allCells[i].innerHTML = '';
  }

  gameOn = 'yes';
  currentPlayer = 'X';
  document.getElementById('plays').innerHTML = "Player X's Turn";
}

function resetGame() {
  scoreX = 0;
  computer = 0;
  document.getElementById('scoreX').innerHTML = "Player X : " + scoreX;
  document.getElementById('computer').innerHTML = "Computer : " + computer;

  playAgain();
}