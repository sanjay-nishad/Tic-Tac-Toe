document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("reset");

    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];

    function checkWinner() {
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

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }

        return false;
    }

    function checkDraw() {
        return !board.includes("");
    }

    function updateMessage() {
        if (checkWinner()) {
            currentPlayer = currentPlayer === "X" ? "O" : "X"; 
            message.textContent = `Player ${currentPlayer} wins!`;
        } else if (checkDraw()) {
            message.textContent = "It's a draw!";
        } else {
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
    

    function handleCellClick(index) {
        if (board[index] === "" && !checkWinner()) {
            board[index] = currentPlayer;
            cells[index].textContent = currentPlayer;
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateMessage();
        }
    }

    function handleResetClick() {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        cells.forEach((cell) => {
            cell.textContent = "";
        });
        updateMessage();
    }

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleCellClick(index));
    });

    resetButton.addEventListener("click", handleResetClick);
});
