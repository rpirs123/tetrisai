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

    isValid(tetromino){
        for(let r = 0; r < tetromino.cells.length; r++){
            for(let c = 0; c < tetromino.cells[r].length; c++){
                let _r = tetromino.row + r
                let _c = tetromino.column + c
                if(tetromino.cells[r][c] != 0){
                    if(_r < 0 || _r > this.rows){
                        return false
                    }
                    if(_c < 0 || _c > this.columns){
                        return false
                    }
                    if(this.cells[_r][_c] != 0){
                        return false
                    }

                }
            }
        }
        return true;
    }

    clearLines(){

        let clearedLines = 0;

            for(let r = this.rows - 1; r >= 0; r--){
                if(!this.cells[r].includes(0)){
                    clearedLines++
                    this.cells[r] = new Array(this.columns).fill(0)

                }else if(clearedLines > 0){
                    for(let c = 0; c < this.columns; c++){
                        this.cells[r+clearedLines][c] = this.cells[r][c]
                        this.cells[r][c]
                    }
                }
            }
        
        return clearedLines
    }

    clone(){

       let _grid = new Grid(this.rows,this.columns)
        for(let r = 0; r < this.rows; r++){
            for(let c = 0; c < this.columns; c++){
                _grid.cells[r][c] = this.cells[r][c]
            }
        }

       return _grid
    }


    getAggregateHeight(){
        let aggHeight = 0;

        for(let i = 0; i < this.columns; i++){
            aggHeight += this.columnHeight(i)
        }

        return aggHeight
    }

    columnHeight(c){
        let r = 0;
        while (r < this.rows && this.cells[r][c] == 0) {
            r++;
        }
        return this.rows - r;
    }

    getClearedLines(){
        let counter = 0;

        for(let r = 0; r < this.rows; r++){
            if(this.isLine(r)){
                counter++
            }
        }
        return counter
    }

    isLine(row){

        for(let c = 0; c < this.columns; c++){
            if(this.cells[row][c] != 0){
                return false
            }
        }
        return true
    }

    getHoles(){
        let counter = 0;

        for(let c = 0; c < this.columns; c++){
            let block = false

            for(let r = 0; r < this.rows; r++){
                if(this.cells[r][c] != 0){
                    block = true    // mark the row as filled
                }else if(this.cells[r][c] === 0 && block){
                    counter++
                }
            }
        }
        return counter
    }

    getBumpiness(){
        let counter = 0; 

        for(let c = 0; c < this.columns -1; c++){
            counter += Math.abs(this.columnHeight(c) - this.columnHeight(c+1))
        }

        return counter
    }
}

