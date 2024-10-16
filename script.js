const board = document.querySelector(".board");
let currPlayer = "O";
let winner = null;
const cells = Array.from({ length: 9 }).fill(null);

function checkWinner() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (cells[a] && cells[a] == cells[b] && cells[a] == cells[c])
      return cells[a];
  }
  return null; //no winner yet
}
function CellClick(index) {
  if (winner || cells[index]) return;
  cells[index] = currPlayer;
  render();
  winner = checkWinner();
  if (winner) {
    setTimeout(() => {
      alert(`Player ${winner} wins!`);
      resetGame();
    }, 200);
  } else if (!cells.includes(null)) {
    setTimeout(() => {
      alert("It's a tie!");
      resetGame();
    }, 200);
  } else {
    currPlayer = currPlayer === "X" ? "O" : "X";
  }
}
function render() {
  board.innerHTML = "";
  cells.forEach((value, index) => {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = value || "";
    cell.addEventListener("click", () => {
      CellClick(index);
    });
    board.appendChild(cell);
  });
}
function resetGame() {
  cells.fill(null);
  currPlayer = "O";
  winner = null;
  render();
}
render();
