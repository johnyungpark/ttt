let button1 = document.querySelector('button.pvp');
let button2 = document.querySelector('.restart');
let gameArray = [];
let winCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let startGame = (function() {
    let grid = document.querySelector('.grid');
    let main = document.querySelector('.main');
    let start = document.querySelector('.start');
    let info = document.querySelector('.info');
    let showturn = document.querySelector('.showturn');
    let oturn;
    function makeGrid() {
        main.removeChild(start);
        oturn = false;
        for (let i = 0; i < 9; i++) {
            let square = document.createElement('div');
            square.classList.add("square");
            square.addEventListener("click", markBox, { once: true })
            grid.appendChild(square);
            gameArray.push(square);
        }
    button2.classList.add('show');
    showturn.textContent = `${oturn ? "O" : "X"}'s turn!`;
    }
    function markBox(e) {
        const box = e.target;
        const currentTurn = oturn ? player2 : player1;
        markSpot(box, currentTurn)
        if (checkWin(currentTurn)) {
            endGame(false);
            showturn.textContent = "";
        } else if (isTie()) {
            endGame(true);
            showturn.textContent = "";
        } else {
            changeTurns();
        }
    }
    function restart() {
        gameArray.forEach(item => {
            item.classList.remove(player1.mark);
            item.classList.remove(player2.mark);
            item.innerText = "";
            item.removeEventListener("click", markBox);
            item.addEventListener("click", markBox, { once: true });
        })
        info.innerText = "";
        showturn.textContent = `${oturn ? "O" : "X"}'s turn!`;
    }
    function markSpot(box, currentTurn) {
        box.innerHTML = currentTurn.mark;
        box.classList.add(currentTurn.mark);
    }
    function endGame(tie) {
        if (tie) {
            info.innerText = "No winner this time!";
            gameArray.forEach(item => {
                item.removeEventListener("click", markBox);
            })
        } else {
            info.innerText = `${oturn ? "O" : "X"} wins!`;
            gameArray.forEach(item => {
                item.removeEventListener("click", markBox);
            })
        }
    }
    function isTie() {
        return gameArray.every(part => {
            return part.classList.contains(player1.mark) || part.classList.contains(player2.mark)
        })
    }
    function changeTurns() {
        oturn = !oturn;
        showturn.textContent = `${oturn ? "O" : "X"}'s turn!`;
    }
    function checkWin(currentTurn) {
        return winCombo.some(combo => {
            return combo.every(index => {
                return gameArray[index].classList.contains(currentTurn.mark)
            })
        })
    }
    return {
        grid: makeGrid,
        restart: restart,
    }
})();

const playerAssign = (pname, mark) => {
    return { pname, mark };
}

let player1 = playerAssign("P1", "X");
let player2 = playerAssign("P2", "O");

button1.addEventListener('click', startGame.grid);
button2.addEventListener('click', startGame.restart);