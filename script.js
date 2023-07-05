
    const Gameboard = (() => {
    let gameboard = document.querySelector("#gameBoard");
    gameboard = ["", "", "", "", "", "", "", "", ""];
    
   
    const update = (index, value) => { index = 6, value = "X"
        gameboard[index].textContent = value;
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

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ]
        currentPlayerIndex = 0;
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

        Gameboard.update(index, players[currentPlayerIndex].marker);
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
            
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