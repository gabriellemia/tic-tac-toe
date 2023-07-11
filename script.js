const displayController = (() => {
    const displayMessage = (message) => {
        document.querySelector("#message").textContent = message;
    }
    return {
        displayMessage,
    }
})();

const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    
    const displayBoard = () => {
        let board = "";
        gameboard.forEach((box, index) => {
            board += `<div class="box" id="box-${index}">${box}</div>`
        })
        document.querySelector("#gameboard").innerHTML = board;
        const boxes = document.querySelectorAll(".box");
        boxes.forEach((box) => {
            box.addEventListener("click", Game.handleClick);
    });
    }
    const update = (index, value) => {
        gameboard[index] = value;
        displayBoard();
    };

    const getGameboard = () => gameboard;

    return {
        displayBoard,
        update,
        getGameboard
    }
    
})();


const createPlayer = (playerName, marker) => {
    return {
        playerName,
        marker 
    }
}


const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ]
        currentPlayerIndex = 0;
        gameOver = false; 
        Gameboard.displayBoard();

        const boxes = document.querySelectorAll(".box");
        boxes.forEach((box) => {
            box.addEventListener("click", handleClick);
        })
    }

    const handleClick = (event) => {
        if (gameOver) {
            return;
        }
        let index = parseInt(event.target.id.split("-")[1]);
        if (Gameboard.getGameboard()[index] !== "")
        return;

        Gameboard.update(index, players[currentPlayerIndex].marker);

        if (checkWinner(Gameboard.getGameboard(), players[currentPlayerIndex].marker)) {
            gameOver = true;
            displayController.displayMessage(`${players[currentPlayerIndex].playerName} wins!`);
        } else if (checkDraw(Gameboard.getGameboard())) {
            gameOver = true;
            displayController.displayMessage("It's a draw!");
        }
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    const restart = () => {
        for (let i = 0; i < 9; i++) {
            Gameboard.update(i, "");
        }
        Gameboard.displayBoard();
        gameOver = false;
        document.querySelector("#message").textContent = "";
    }

    return {
        start,
        restart,
        handleClick
    }
})();


function checkWinner(board) {
    const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
    for (let i = 0; i < winningCombo.length; i++) {
        const [a, b, c] = winningCombo[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw(board) {
    return board.every(cell => cell !== "")
}

const restart = document.querySelector("#restart-btn");
restart.addEventListener("click", () => {
    Game.restart();
})

const newBtn = document.querySelector("#new-btn");
newBtn.addEventListener("click", () => {
    Game.start();
});