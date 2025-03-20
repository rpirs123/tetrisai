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

}

