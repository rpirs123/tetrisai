import { Grid } from "./grid.js"
import { SelectRandomTetromino } from "./selectRandomTetromino.js";
import { AnimationTimer } from "./animationTimer.js";


const grid = new Grid(22,10)
const srt = new SelectRandomTetromino

const gridCanvas = document.getElementById("grid-canvas");
const gridCtx = gridCanvas.getContext("2d");

const button = document.getElementById("view-button")
const body = document.body

let activeTetrominoes = [srt.getNextPiece()]
let activeTetromino = null 

activeTetromino = activeTetrominoes[0]
console.log(activeTetromino)

drawGridCanvas()

function drawGridCanvas(verticalOffset = 0){
    
    
    gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);

    // draw active tetromino
    for(let r = 0; r < activeTetromino.cells.length; r++){
        for(let c = 0; c < activeTetromino.cells[r].length; c++){
            if(activeTetromino.cells[r][c] != 0){
                gridCtx.fillStyle = hexToRGBBitwise(activeTetromino.cells[r][c]) //  width="200px" height="400px"
                gridCtx.fillRect(20 * (activeTetromino.column + c), 20 * (activeTetromino.row + r- 2) + verticalOffset , 20, 20)
                gridCtx.strokeStyle = "black"
                gridCtx.strokeRect(20 * (activeTetromino.column + c), 20 * (activeTetromino.row + r- 2) + verticalOffset , 20, 20)
            }
        }
    }

    
}


function startGame(){



    startAnimation(function(){
        while(activeTetromino.moveDown(grid));
            
    })
    

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
            return
            
        }

        drawGridCanvas(elapsedTime) 
    })
    console.log(animationTimer)

    requestAnimationFrame(() => animationTimer.animateFrame())
}


function hexToRGBBitwise(v) { 
    const red = (v >> 16) & 0xFF;   // Shift right by 16 bits and mask with 0xFF for red
    const green = (v >> 8) & 0xFF;  // Shift right by 8 bits and mask with 0xFF for green
    const blue = v & 0xFF;          // Mask the last 8 bits for blue

    return `rgb(${red}, ${green}, ${blue})`;
}


button.addEventListener("click",() => {
    body.classList.toggle("light-mode");

})


startGame()




