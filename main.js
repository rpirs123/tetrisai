import { Grid } from "./grid.js"
import { SelectRandomTetromino } from "./selectRandomTetromino.js";
import { AnimationTimer } from "./animationTimer.js";
import { PlayerTimer } from "./playerTimer.js";


const grid = new Grid(22,10)
const srt = new SelectRandomTetromino


const gridCanvas = document.getElementById("grid-canvas");
const gridCtx = gridCanvas.getContext("2d");
const nextCanvas = document.getElementById("next-canvas")
const nextCtx = nextCanvas.getContext("2d")

const button = document.getElementById("view-button")
const modeButton = document.getElementById("toggle-mode")
const scoreContainer = document.querySelector(".score-container")
const body = document.body

let activeTetrominoes = [null,srt.getNextPiece()]
let activeTetromino = null 

let isBotActive = false
let score = 0;

const playerTimer = new PlayerTimer(startPlayerTimer,500)
playerTimer.start()

document.addEventListener("keydown",onKeyDown)


function startPlayerTimer(){

    if(activeTetromino.canMoveDown(grid)){
        activeTetromino.moveDown(grid)
        drawGridCanvas()
        return
    }

    playerTimer.stop()

    if(!endTurn()){
        isBotActive = false
        alert("game is over bruh")
        return;
    }
    startGame()
}

function onKeyDown(event){

    if(isBotActive){
        return
    }
   

    console.log("hello",event)

    switch(event.which){
        case 40: // move down
            playerTimer.dropTetromino(500)
            break;
        case 38: // rotate
            activeTetromino.rotate(grid)
            drawGridCanvas()
            break;
        case 37: //move left
            if(activeTetromino.canMoveLeft(grid)){
                activeTetromino.moveLeft(grid)
                drawGridCanvas()
            }
            break;
        case 39:  //move right s
            if(activeTetromino.canMoveRight(grid)){
                activeTetromino.moveRight(grid)
                drawGridCanvas()
            }
            break;
        case 32: // spacebar move instantly down
            while(activeTetromino.canMoveDown(grid)){
                activeTetromino.moveDown(grid)
            }
            if(!endTurn()){
                alert('game is over bruh');
                return;
            }
            drawGridCanvas()
            startGame()
            break; 
    }

}

function drawGridCanvas(verticalOffset = 0){
    
    
     gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);


    // draw existing piecees 
    for(let r = 2; r < grid.rows; r++){
        for(let c = 0; c < grid.cells[r].length; c++){
            if(grid.cells[r][c] != 0){
                gridCtx.fillStyle = hexToRGBBitwise(grid.cells[r][c])
                gridCtx.fillRect(20 * c, 20 * (r-2) , 20, 20)
                gridCtx.strokeStyle = "black"
                gridCtx.strokeRect(20 * c, 20 * (r-2), 20, 20)
            }
        }
    }
    // draw active tetromino
    for(let r = 0; r < activeTetromino.cells.length; r++){
        for(let c = 0; c < activeTetromino.cells[r].length; c++){
            if(activeTetromino.cells[r][c] != 0){
                gridCtx.fillStyle = hexToRGBBitwise(activeTetromino.cells[r][c]) 
                gridCtx.fillRect(20 * (activeTetromino.column + c), 20 * (activeTetromino.row + r - 2) + verticalOffset , 20, 20)
                gridCtx.strokeStyle = "black"
                gridCtx.strokeRect(20 * (activeTetromino.column + c), 20 * (activeTetromino.row + r - 2) + verticalOffset , 20, 20)
            }
        }
    }

    
}

function drawNextCanvas(){
    let next = activeTetrominoes[1]
    console.log(next)

    nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);

    for(let r = 0; r < next.cells.length; r++){
        for(let c = 0; c < next.dimension; c++){
            if(next.cells[r][c] !=0){
                console.log("drawing")
                nextCtx.fillStyle = hexToRGBBitwise(next.cells[r][c])
                nextCtx.fillRect(20 * c, 20 * r, 20,20)
                nextCtx.strokeStyle = "black"
                nextCtx.strokeRect(20 * c, 20 * r, 20,20)

                
            }
        }
    }
}


function startGame(){
    for(let i = 0; i < activeTetrominoes.length; i++){ 
        activeTetrominoes[i] = activeTetrominoes[i+1]
    }
    activeTetrominoes[activeTetrominoes.length - 1] = srt.getNextPiece()
    activeTetromino = activeTetrominoes[0]

    drawNextCanvas()


    if(isBotActive){
        startAnimation(function(){
            while(activeTetromino.moveDown(grid));
            if(!endTurn()){
                alert("game is over bruh")
                return;
            }
            startGame()
        })
        
    }else{
        playerTimer.dropTetromino(500)
        
        
    }
   

}

function endTurn(){
    grid.addToBoard(activeTetromino)

    score += grid.clearLines()

    updateScore()
    drawGridCanvas()
    return !grid.exceededGrid()
}


function startAnimation(callback = function(){}){
    let dropHeight = 0;


    let _activeTetromino = activeTetromino.clone()
    console.log(grid)
    
    while(_activeTetromino.moveDown(grid)){
        dropHeight++
    }
    const animationTimer = new AnimationTimer(function(elapsedTime){
        if(elapsedTime >= dropHeight * 20){
            animationTimer.stopTimer()
            drawGridCanvas(20 * dropHeight)
            callback()
            return
            
        }

        drawGridCanvas(elapsedTime) 
    })
    

    requestAnimationFrame(() => animationTimer.animateFrame())
}

function hexToRGBBitwise(v) { 
    const red = (v >> 16) & 0xFF;   // Shift right by 16 bits and mask with 0xFF for red
    const green = (v >> 8) & 0xFF;  // Shift right by 8 bits and mask with 0xFF for green
    const blue = v & 0xFF;          // Mask the last 8 bits for blue

    return `rgb(${red}, ${green}, ${blue})`;
}

function updateScore(){
     scoreContainer.innerHTML = score.toString()
}

button.addEventListener("click",() => {
    body.classList.toggle("light-mode");

})

modeButton.addEventListener("click", () =>{
    if(!isBotActive){
        isBotActive = true
        modeButton.style.color = "green"
        playerTimer.stop()
        startAnimation(function(){
            while(activeTetromino.moveDown(grid));
            if(!endTurn()){
                alert("game is over bruh")
                return;
            }
            startGame()
        })
    }else{
        // playerTimer.start()
        isBotActive =false 
        modeButton.style.color = "red"
    }
    
})


startGame()




