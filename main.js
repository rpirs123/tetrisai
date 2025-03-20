import { Grid } from "./grid.js"


const grid = new Grid(22,10)

function drawGridCanvas(){
    const canvas = document.getElementById("grid-canvas");
    const ctx = canvas.getContext("2d");

    const button = document.getElementById("view-button")
    const body = document.body
    button.addEventListener("click",() => {
        body.classList.toggle("dark-mode");

    })

    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
}

 

window.onload = drawGridCanvas()
console.log(grid.columns,grid.rows)