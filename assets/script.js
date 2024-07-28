// All Cells 
let cells = document.querySelectorAll(".col");
// Player ( X )
let x = "assets/icons/icon-x.svg";
let xTurn = "assets/icons/icon-x-turn.svg";
let xHover = "assets/icons/icon-x-outline.svg";
let xWin = "assets/icons/icon-x-win.svg";
let xScore = 0;
// Player ( O )
let o = "assets/icons/icon-o.svg";
let oTurn = "assets/icons/icon-o-turn.svg";
let oHover = "assets/icons/icon-o-outline.svg";
let oWin = "assets/icons/icon-o-win.svg";
let oScore = 0;
// Current Player ( Default )
let currentPlayer = x;
let hover = xHover;
// Players's Turn
let playerTurn = document.querySelector(".currentPlayer img");
// Reset Button 
let resetBtn = document.querySelector(".resetBtn");
// Winner 
let winner ;
// Draw
let drawScore = 0 ;
// Game Over 
let gameIsOver = false;
let gameOverPanel = document.querySelector(".gameOverPanel");
// Logo Icon 
let logoIcon = "assets/icons/logo.svg";
// Game Audio
let clickSound = document.querySelector("#clickSound");
let winSound = document.querySelector("#winSound");
let gameOverSound = document.querySelector("#gameOverSound");

// Reset Function ( Clear Board )
resetBtn.addEventListener("click", reset);
function reset(){
    document.querySelector(".gameBody").style.cssText = "filter: none";
    gameOverPanel.style.display = "none";
    for(let i = 0; i < 9; i ++){
        let cell = cells[i];
        cell.querySelector("img").setAttribute('src', "");
    }
    playerTurn.src = xTurn;
    currentPlayer = x;
    hover = xHover;
    for(let i = 0; i < 9 ; i ++){
        cells[i].style.background = "#1f3540";
    }
    winner = undefined;
    gameIsOver = false;
}

// Current Player Hover Effect.
for (let i = 0; i < 9; i++) {
    let cell = cells[i];
    cell.addEventListener("mouseover", function() {
        if(this.querySelector("img").getAttribute('src') == "" && gameIsOver == false){
            this.querySelector("img").src = hover ; 
        }
    });
    cell.addEventListener("mouseout", function() {
        if(this.querySelector("img").getAttribute('src') == hover){
            this.querySelector("img").src = "" ; 
        }
    });
}

// Add Current Player's Icon on Click
for (let i = 0; i < 9; i++) {
    let cell = cells[i];
    cell.addEventListener("click", function() {
        // Player Icon ( X / O)
        let occupied = this.querySelector("img").getAttribute('src');
        // Checks If the currect elemnt doest have any icon 
        if(currentPlayer == x && occupied !== x && occupied !== o && gameIsOver == false) {
            this.querySelector("img").src = currentPlayer ; 
            playerTurn.src = oTurn;
            checkWinner();
            currentPlayer = o ;
            hover = oHover;
            clickSound.play();
        }
        else if(currentPlayer == o && occupied !== x && occupied !== o && gameIsOver == false){
            this.querySelector("img").src = currentPlayer ; 
            playerTurn.src = xTurn;
            checkWinner();
            currentPlayer = x ;
            hover = xHover;
            clickSound.play();
        }
    });
}

// Check Winner (After Each Player's Turn)
function checkWinner(){
    // Check Rows
    for(let i = 0 ; i < 7 ; i = i + 3){
        let a = cells[i];
        let b = cells[i + 1];
        let c = cells[i + 2];
        if(currentPlayer == a.querySelector("img").getAttribute('src') 
        && currentPlayer == b.querySelector("img").getAttribute('src') 
        && currentPlayer == c.querySelector("img").getAttribute('src')){
            currentPlayer == x? winner = "x" : winner = "o";
            gameOver(a,b,c);
        }
    }
    // Check Columns
    for(let i = 0 ; i < 3 ; i ++){
        let a = cells[i];
        let b = cells[i + 3];
        let c = cells[i + 6];
        if(currentPlayer == a.querySelector("img").getAttribute('src') 
        && currentPlayer == b.querySelector("img").getAttribute('src') 
        && currentPlayer == c.querySelector("img").getAttribute('src')){
            currentPlayer == x? winner = "x" : winner = "o";
            gameOver(a,b,c);
        }
    }
    // Check Diagonals
    for(let i = 0 ; i < 2 ; i ++){
        let a = cells[i + (i == 0? 0 : 1)];
        let b = cells[i + (i == 0? 4 : 3)];
        let c = cells[i + (i == 0? 8 : 5)];
        if(currentPlayer == a.querySelector("img").getAttribute('src') 
        && currentPlayer == b.querySelector("img").getAttribute('src') 
        && currentPlayer == c.querySelector("img").getAttribute('src')){
            currentPlayer == x? winner = "x" : winner = "o";
            gameOver(a,b,c);
        }
    }

    // Check Draw
    let cellOccupied = 0 ;
    for(let i = 0 ; i < 9 ; i ++ ){
        if (cells[i].querySelector("img").getAttribute("src") != "") {
            cellOccupied ++;
        }        
    }
    if(cellOccupied > 8 && winner == undefined){
        gameOverSound.play();
        gameIsOver = true;
        for(let i =0 ; i < 9; i ++){
            let cell = cells[i];
            cell.style.background = "#a8bec9";
            if(cell.querySelector("img").getAttribute('src') == x ){
                cell.querySelector("img").setAttribute('src', xWin);
            }
            else{
                cell.querySelector("img").setAttribute('src', oWin);
            }
        }
        drawScore ++ ;
        document.querySelector(".drawPoints .score").innerHTML = drawScore ;
        // Game Over Result ( If Draw )
        setTimeout(function(){
            document.querySelector(".gameBody").style.cssText = "filter: blur(5px);";
            gameOverPanel.style.display = "flex";
            gameOverPanel.querySelector("img").setAttribute("src", logoIcon);
            gameOverPanel.querySelector("h2").innerHTML = "IT'S A STALEMATE !";
        }, 500);
    }
}

// Game Over
function gameOver(a,b,c){
    winSound.play();
    gameIsOver = true;
    if(winner == "x"){
        a.style.background = "#31c3bdff";
        a.querySelector("img").setAttribute('src', xWin);
        b.style.background = "#31c3bdff";
        b.querySelector("img").setAttribute('src', xWin);
        c.style.background = "#31c3bdff";
        c.querySelector("img").setAttribute('src', xWin);
        xScore = xScore + 1 ;
        document.querySelector(".playerOne .score").innerHTML = xScore;
        // Game Over Result ( If X wins )
        setTimeout(function(){
            document.querySelector(".gameBody").style.cssText = "filter: blur(5px);";
            gameOverPanel.style.display = "flex";
            gameOverPanel.querySelector("img").setAttribute("src", x);
            gameOverPanel.querySelector("h2").innerHTML = "TAKES THE ROUND !";
        }, 500);
    }
    else if(winner == "o"){
        a.style.background = "#f2b137ff";
        a.querySelector("img").setAttribute('src', oWin);
        b.style.background = "#f2b137ff";
        b.querySelector("img").setAttribute('src', oWin);
        c.style.background = "#f2b137ff";
        c.querySelector("img").setAttribute('src', oWin);
        oScore = oScore + 1 ;
        document.querySelector(".playerTwo .score").innerHTML = oScore;
        // Game Over Result ( If O wins )
        setTimeout(function(){
            document.querySelector(".gameBody").style.cssText = "filter: blur(5px);";
            gameOverPanel.style.display = "flex";
            gameOverPanel.querySelector("img").setAttribute("src", o);
            gameOverPanel.querySelector("h2").innerHTML = "TAKES THE ROUND !";
        }, 500);
    }
}

// Next Round ( Clear the Game Board )
document.querySelector(".nextRound").addEventListener("click", function(){
    reset();
    gameOverPanel.style.display = "none";
});
// Quit Game
document.querySelector(".quit").addEventListener("click", function(){
    reset();
    document.querySelector(".playerOne .score").innerHTML = 0;
    xScore = 0;
    document.querySelector(".playerTwo .score").innerHTML = 0;
    oScore = 0;
    document.querySelector(".drawPoints .score").innerHTML = 0;
    drawScore = 0;
});