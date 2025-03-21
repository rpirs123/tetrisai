import { Grid } from "./grid.js"
import { SelectRandomTetromino } from "./selectRandomTetromino.js";
import { AnimationTimer } from "./animationTimer.js";


const grid = new Grid(22,10)
const srt = new SelectRandomTetromino
const gridCanvas = document.getElementById("grid-canvas");
const gridCtx = gridCanvas.getContext("2d");

const button = document.getElementById("view-button")
const body = document.body





function hexToRGBBitwise(v) { 
    const red = (v >> 16) & 0xFF;   // Shift right by 16 bits and mask with 0xFF for red
    const green = (v >> 8) & 0xFF;  // Shift right by 8 bits and mask with 0xFF for green
    const blue = v & 0xFF;          // Mask the last 8 bits for blue

    return `rgb(${red}, ${green}, ${blue})`;
}


button.addEventListener("click",() => {
    body.classList.toggle("light-mode");

})