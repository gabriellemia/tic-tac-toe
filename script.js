
    const Gameboard = (() => {
    let gameboard = document.querySelector("#gameBoard");
    gameboard = ["", "", "", "", "", "", "", "", ""];
    
   
    const update = (index, value) => {
        gameboard[index] = value;
    };

    const getGameboard = () => gameboard;

    return {
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
    const o = "O";
    const x = "X"; 

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ]
        currentPlayerIndex = "X";
        gameOver = false; 

        const boxes = document.querySelectorAll(".box");
        boxes.forEach((box) => {
            box.addEventListener("click", handleClick);
        })

    
    }

    const handleClick = (event) => {
        let index = parseInt(event.target.id);
        if (Gameboard.getGameboard()[index] !== "")
            return;

        Gameboard.update(index, players[currentPlayerIndex]);
        event.target.textContent = currentPlayerIndex;
        currentPlayerIndex = currentPlayerIndex === x ? o : x;
            
    }
    return {
        start,
        handleClick
    }
})();

const newBtn = document.querySelector("#new-btn");
newBtn.addEventListener("click", () => {
    Game.start();
})
