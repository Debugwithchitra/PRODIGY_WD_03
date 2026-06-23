const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

const xScoreEl = document.getElementById("x-score");
const oScoreEl = document.getElementById("o-score");
const drawScoreEl = document.getElementById("draw-score");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

let xScore = 0;
let oScore = 0;
let drawScore = 0;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function handleCellClick(){
    const index = this.dataset.index;

    if(board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();
}

function checkWinner(){

    for(let pattern of winPatterns){

        let [a,b,c] = pattern;

        if(
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ){

            gameActive = false;

            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

            statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
            launchConfetti();
            if(currentPlayer === "X"){
                xScore++;
                xScoreEl.textContent = xScore;
            }else{
                oScore++;
                oScoreEl.textContent = oScore;
            }
            const popup = document.getElementById("popup");
            return;
        }
    }

    if(!board.includes("")){
        gameActive = false;
        drawScore++;
        drawScoreEl.textContent = drawScore;
        statusText.textContent = "🤝 It's a Draw!";
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame(){

    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell=>{
        cell.textContent = "";
        cell.classList.remove("winner");
    });
    popup.classList.add("hidden");
}

cells.forEach(cell=>{
    cell.addEventListener("click",handleCellClick);
});

restartBtn.addEventListener("click",restartGame);
function launchConfetti() {
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
    });

    setTimeout(() => {
        confetti({
            particleCount: 100,
            angle: 60,
            spread: 80,
            origin: { x: 0 }
        });

        confetti({
            particleCount: 100,
            angle: 120,
            spread: 80,
            origin: { x: 1 }
        });
    }, 300);
}
const popup = document.getElementById("popup");