const btn = document.querySelector("button");

btn.addEventListener("click", function () {
  // Prevent multiple insertions
  if (
    document.querySelector(".divNameParent") ||
    document.querySelector(".button1")
  ) {
    console.log("Already added!");
    return;
  }

  // Disable the button so it can’t be clicked again
  btn.disabled = true;

  const divNameParent = document.createElement("div");
  divNameParent.classList.add("divNameParent");

  // Input for name1
  const divInput = document.createElement("div");
  divInput.classList.add("input-container");
  const input = document.createElement("input");
  input.id = "first-player-input";
  input.type = "text";
  input.required = true;
  input.placeholder = "First player name";
  input.classList.add("input-field");
  const label = document.createElement("label");
  label.classList.add("input-label");
  label.textContent = "First player name";
  const underline = document.createElement("span");
  underline.classList.add("input-highlight");
  divInput.appendChild(input);
  divInput.appendChild(label);
  divInput.appendChild(underline);

  // Input for name2
  const divInput2 = document.createElement("div");
  divInput2.classList.add("input-container");
  const input2 = document.createElement("input");
  input2.id = "second-player-input";
  input2.type = "text";
  input2.required = true;
  input2.placeholder = "Second player name";
  input2.classList.add("input-field");
  const label2 = document.createElement("label");
  label2.classList.add("input-label");
  label2.textContent = "Second player name";
  const underline2 = document.createElement("span");
  underline2.classList.add("input-highlight");
  divInput2.appendChild(input2);
  divInput2.appendChild(label2);
  divInput2.appendChild(underline2);

  divNameParent.appendChild(divInput);
  divNameParent.appendChild(divInput2);
  document.body.appendChild(divNameParent);

  // Submit button
  const btn2 = document.createElement("button");
  btn2.classList.add("button1");

  const div1 = document.createElement("div");
  div1.classList.add("svg-wrapper-1");
  const div2 = document.createElement("div");
  div2.classList.add("svg-wrapper");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "30");
  svg.setAttribute("height", "30");
  svg.setAttribute("class", "icon");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z"
  );
  svg.appendChild(path);

  const span = document.createElement("span");
  span.textContent = "Submit";

  document.body.appendChild(btn2);
  btn2.appendChild(div1);
  div1.appendChild(div2);
  div2.appendChild(svg);
  btn2.appendChild(span);
  //submit
  btn2.addEventListener("click", function () {
    const firstPlayerInput = document.querySelector("#first-player-input");
    const secondPlayerInput = document.querySelector("#second-player-input");

    const firstPlayerName = firstPlayerInput.value.trim();
    const secondPlayerName = secondPlayerInput.value.trim();

    if (!firstPlayerName || !secondPlayerName) {
      alert("Please enter both player names!");
      return;
    }

    //GameBoard
    const gameBoard = (function () {
      let game_board = ["", "", "", "", "", "", "", "", ""];

      function print_board(onClickCell) {
        const oldBoard = document.querySelector(".container");
        if (oldBoard) oldBoard.remove();

        const container = document.createElement("div");
        container.classList.add("container");

        for (let i = 0; i < 9; i++) {
          const cell = document.createElement("button");
          cell.classList.add("cell");
          cell.textContent = game_board[i];
          cell.dataset.index = i;
          cell.addEventListener("click", () => onClickCell(i));
          container.appendChild(cell);
        }
        document.body.appendChild(container);
      }
      function updateBoard(index, marker) {
        if (game_board[index] === "") {
          game_board[index] = marker;
        } else {
          alert("This spot is taken");
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
      function startGame(name1, name2) {
        player1 = createPlayer(name1, "X");
        player2 = createPlayer(name2, "O");
        currentPlayer = player1;
        console.log(`${player1.name} vs ${player2.name}`);
        gameBoard.resetBoard();
        gameBoard.print_board(playTurn);
        alert(`${player1.name} (X) vs ${player2.name} (O)`);
      }
      function playTurn(index) {
        const board = gameBoard.getBoard();
        if (board[index] !== "") {
          alert("Spot already taken!");
          return;
        }
        gameBoard.updateBoard(index, currentPlayer.marker);
        gameBoard.print_board(playTurn);

        if (checkWinner(gameBoard.getBoard(), currentPlayer.marker)) {
          alert(`${currentPlayer.name} wins! 🎉`);
          window.location.reload();
          return;
        }
        if (board.every((cell) => cell !== "")) {
          alert("It's a draw!");
          window.location.reload();
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
    gameController.startGame(firstPlayerName, secondPlayerName);
  });
});
