//GameBoard
const gameBoard = (function () {
  let game_board = ["", "", "", "", "", "", "", "", ""];

  function print_board() {
    console.log(`
        ${game_board[0] || "0"} | ${game_board[1] || "1"} | ${
      game_board[2] || "2"
    }
        ${game_board[3] || "3"} | ${game_board[4] || "4"} | ${
      game_board[5] || "5"
    }
        ${game_board[6] || "6"} | ${game_board[7] || "7"} | ${
      game_board[8] || "8"
    }
        `);
  }
  function updateBoard(index, marker) {
    if (game_board[index] === "") {
      game_board[index] = marker;
    } else {
      console.log("This spot is taken");
    }
  }
  function resetBoard() {
    game_board = ["", "", "", "", "", "", "", "", ""];
  }
  function getBoard() {
    return game_board;
  }
  return { print_board, getBoard, updateBoard, resetBoard };
})();

//PLayer Name and Marker
function createPlayer(name, marker) {
  return { name, marker };
}

//gameController
const gameController = (function () {
  let player1;
  let player2;
  let currentPlayer;
  function startGame(name1, marker1, name2, marker2) {
    if (marker1 === marker2) {
      console.log("Markers must be different.");
      return;
    }
    player1 = createPlayer(name1, marker1);
    player2 = createPlayer(name2, marker2);
    currentPlayer = player1;
    console.log(`${player1.name} vs ${player2.name}`);
    gameBoard.resetBoard();
    gameBoard.print_board();
  }
  function playTurn(index) {
    const board = gameBoard.getBoard();
    if (board[index] !== "") {
      console.log("Spot already taken!");
      return;
    }
    gameBoard.updateBoard(index, currentPlayer.marker);
    gameBoard.print_board();

    if (checkWinner(gameBoard.getBoard(), currentPlayer.marker)) {
      console.log(`${currentPlayer.name} wins! 🎉`);
      return;
    }
    if (board.every((cell) => cell !== "")) {
      console.log("It's a draw!");
      return;
    }
    switchPlayer();
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  return { startGame, playTurn };
})();

function checkWinner(board, marker) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some((pattern) =>
    pattern.every((index) => board[index] === marker)
  );
}

gameController.startGame("Nebiyu", "X", "Sara", "O");
gameController.playTurn(1);
gameController.playTurn(4);
gameController.playTurn(2);
gameController.playTurn(5);
gameController.playTurn(3);
gameController.playTurn(8);
gameController.playTurn(6);
gameController.playTurn(0);
