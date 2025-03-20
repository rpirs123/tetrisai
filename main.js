import { Grid } from "./grid.js"
import { SelectRandomTetromino } from "./selectRandomTetromino.js";


const grid = new Grid(22,10)
const srt = new SelectRandomTetromino()

const canvas = document.getElementById("grid-canvas");
const ctx = canvas.getContext("2d");

const button = document.getElementById("view-button")
const body = document.body
button.addEventListener("click",() => {
    body.classList.toggle("dark-mode");

})

function drawGridCanvas(){
    // ctx.fillStyle = "white"
    // ctx.fillRect(10, 20, 23, 23);
    
}

 

window.onload = drawGridCanvas()
console.log(grid.columns,grid.rows)
console.log(grid.cells)
