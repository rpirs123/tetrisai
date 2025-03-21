import { Grid } from "./grid.js"
import { SelectRandomTetromino } from "./selectRandomTetromino.js";


const grid = new Grid(22,10)
const srt = new SelectRandomTetromino()
const canvas = document.getElementById("grid-canvas");
const ctx = canvas.getContext("2d");
const button = document.getElementById("view-button")
const body = document.body
button.addEventListener("click",() => {
    body.classList.toggle("light-mode");

})
const nextPiece = srt.getNextPiece() 
grid.addToBoard(nextPiece)

function drawGridCanvas(){
    // ctx.fillStyle = "white"
    // ctx.fillRect(10, 20, 23, 23);

    for(let r = 2; r < grid.rows; r++){
        for(let c = 0; c < grid.columns; c++){
            if(grid.cells[r][c] != 0){
                ctx.fillStyle = hexToRGBBitwise(grid.cells[r][c])
                ctx.fillRect(20 * c, 20 * (r-2), 20, 20)
                ctx.strokeStyle="#000000";
                ctx.strokeRect(20 * c, 20 * (r - 2), 20, 20);
            }
        }
    }

}



function hexToRGBBitwise(v) { 
    const red = (v >> 16) & 0xFF;   // Shift right by 16 bits and mask with 0xFF for red
    const green = (v >> 8) & 0xFF;  // Shift right by 8 bits and mask with 0xFF for green
    const blue = v & 0xFF;          // Mask the last 8 bits for blue

    return `rgb(${red}, ${green}, ${blue})`;
}

window.onload = drawGridCanvas()
console.log(grid.columns,grid.rows)
console.log(grid.cells)
