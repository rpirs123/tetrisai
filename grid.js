export class Grid {
    constructor(rows,columns){
        this.rows = rows
        this.columns = columns
        this.cells = new Array(rows)

        for(let r = 0; r < this.rows; r++){
            this.cells[r] = new Array(columns)
            for(let c = 0; c < this.columns; c++){
                this.cells[r][c] = 0
            }
                
            
        }
    }

    addToBoard(tetromino){
        for(let r = 0; r < tetromino.cells.length; r++){
            for(let c = 0; c < tetromino.cells[r].length; c++){
                let _r = tetromino.row + r 
                let _c = tetromino.column + c
                if(tetromino.cells[r][c] != 0 && _r >= 0){
                    this.cells[_r][_c] = tetromino.cells[r][c]
                }
            }
        }
    }

    exceededGrid(){
        return !this.isEmptyRow(0) || !this.isEmptyRow(1) 
    }


    isEmptyRow(row){
        for(let c = 0; c < this.columns; c++){
            if(this.cells[row][c] != 0){
                return false
            }
        }
        return true
    }
}

