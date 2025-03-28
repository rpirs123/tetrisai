export class Tetromino{
    constructor(cells){
        this.cells = cells
        this.row = 0;
        this.column = 0;
        this.dimension = this.cells.length
    }


    static getPieceFromIndex(indx){
        let piece;

        switch(indx){
            case 0: // 0
                piece = new Tetromino([
                    [0xFFFF00,0xFFFF00],
                    [0xFFFF00,0xFFFF00]
                ])
                break;
            case 1:  // I  0x00FFF   0x000000  black
                piece = new Tetromino([
                    [0x000000,0x000000 ,0x000000 ,0x000000 ],
                    [0x00FFFF, 0x00FFFF ,0x00FFFF ,0x00FFFF ],
                    [0x000000,0x000000 ,0x000000 ,0x000000 ],
                    [0x000000,0x000000 ,0x000000 ,0x000000 ]
                ])
                break;
            case 2: // T 0x9900FF
                piece = new Tetromino([
                    [0x000000,0x9900FF ,0x000000 ],
                    [0x9900FF ,0x9900FF ,0x9900FF],
                    [0x000000,0x000000 ,0x000000]
                ])
                break;
            case 3: // S 0x6AA84F
                piece = new Tetromino([
                    [0x000000,0x6AA84F ,0x6AA84F ],
                    [0x6AA84F ,0x6AA84F ,0x000000],
                    [0x000000,0x000000 ,0x000000]
                ])
                break;
            case 4: // // Red Z 0xCC0000
                piece = new Tetromino([
                    [0xCC0000,0xCC0000 ,0x000000 ],
                    [0x000000 ,0xCC0000 ,0xCC0000],
                    [0x000000,0x000000 ,0x000000]
                ])
                break;
            case 5: // Blue J 0x0000FF
                piece = new Tetromino([
                    [0x0000FF,0x000000 ,0x000000 ],
                    [0x0000FF ,0x0000FF ,0x0000FF],
                    [0x000000,0x000000 ,0x000000]
                ])
                break;
            case 6: //  L 0xFF9900
                piece = new Tetromino([
                    [0x000000,0x000000 ,0xFF9900 ],
                    [0xFF9900 ,0xFF9900 ,0xFF9900],
                    [0x000000,0x000000 ,0x000000]
                ])
                break;
        }
        piece.row = 0
        piece.column = Math.floor((10 - piece.dimension) / 2)

        return piece
    }


    clone(){

        let _tetromino = new Array()

        for(let r = 0; r < this.dimension; r++){
            _tetromino[r] = new Array(this.dimension)
            for(let c = 0; c < this.dimension; c++){
                _tetromino[r][c] = this.cells[r][c]
            }
        }

        let copiedTetromino = new Tetromino(_tetromino)
        copiedTetromino.row = this.row
        copiedTetromino.column = this.column

        return copiedTetromino
    }

    moveDown(grid){
        if(!this.canMoveDown(grid)){
            return false 
        }
        this.row++
        return true 
    }

    canMoveDown(grid){
        for(let r = 0; r < this.cells.length; r++){
            for(let c = 0; c < this.cells[r].length; c++){
                let _r = this.row + r + 1 
                let _c = this.column + c 
                if (this.cells[r][c] != 0 && _r >= 0){
                    if (!(_r < grid.rows && grid.cells[_r][_c] == 0)){
                        return false;
                    }
                }
                }
            }
            return true
        }

        moveLeft(grid){
            if(!this.canMoveLeft(grid)){
                return false
            }
            this.column--
            return true
        }

        canMoveLeft(grid){
            for(let r = 0; r < this.cells.length; r++){
                for(let c = 0; c < this.cells[r].length; c++){
                    let _r = this.row + r 
                    let _c  = this.column + c - 1
                    if(this.cells[r][c] != 0){
                        if(!(_c < grid.columns && grid.cells[_r][_c] == 0)){
                            console.log("collision")
                            return false
                        }
                    }
                }
            }
            return true
        }

        moveRight(grid){
            if(!this.canMoveRight(grid)){
                return false
            }
            this.column++
            return true
        }

        canMoveRight(grid){
            for(let r = 0; r < this.cells.length; r++ ){
                for(let c = 0; c < this.cells[r].length; c++){
                    let _r = this.row + r
                    let _c =this.column + c + 1
                    if(this.cells[r][c] != 0){
                        if(!(_c < grid.columns && grid.cells[_r][_c] == 0)){
                            console.log("collision")
                            return false
                        }
                    }
                }
            } 
            return true
        }

        rotate(grid){ 

            let adjustedPosition = this.positionAfterRotation(grid)
            
            if(adjustedPosition != null){
                    
               this.rotateTetromino()
               this.column += adjustedPosition.columnAdjustment
               this.row += adjustedPosition.rowAdjustment

            }

            
        }   

        positionAfterRotation(grid){
            let _tetromino = this.clone()
           _tetromino.rotateTetromino()
            
           // check if is valid
           if(grid.isValid(_tetromino)){
                return {rowAdjustment: _tetromino.row - this.row, columnAdjustment: _tetromino.column - this.column}
           }
        
           // if not valid, attempt wall kick
           let startRow = _tetromino.row
           let startColumn = _tetromino.column
           
           for(let i = 0; i < _tetromino.cells.length - 1; i++){
                _tetromino.column = startColumn + i
                if(grid.isValid(_tetromino)){
                    return {rowAdjustment: _tetromino.row - this.row, columnAdjustment: _tetromino.column - this.column}
                }

                for(let j = 0; j < _tetromino.cells.length -1; j++){
                    _tetromino.row = startRow - j
                    if(grid.isValid(_tetromino)){
                        return {rowAdjustment: _tetromino.row - this.row, columnAdjustment: _tetromino.column - this.column}
                    }
               }
               _tetromino.row = startRow
           }
           _tetromino.column = startColumn

           for(let i = 0; i < _tetromino.cells.length - 1; i++){
                _tetromino.column = startColumn - 1 
                if(grid.isValid(_tetromino)){
                    return {rowAdjustment: _tetromino.row - this.row, columnAdjustment: _tetromino.column - this.column}
                }
                
                for(let j = 0; j < _tetromino.cells.length - 1; j++){
                    _tetromino.row = startRow - j 
                    if(grid.isValid(_tetromino)){
                        return {rowAdjustment: _tetromino.row - this.row, columnAdjustment: _tetromino.column - this.column}
                    }
                }
                _tetromino.row = startRow
           }
           _tetromino.column = startColumn

            return null
        }

        rotateTetromino(){
            //transpose matrix
            for(let r = 0; r < this.cells.length; r++){
                for(let c = r + 1 ; c < this.cells[r].length; c++){
                    let tempValue = this.cells[r][c]
                    this.cells[r][c] = this.cells[c][r]
                    this.cells[c][r] = tempValue
                }
            }


            //reverse each row
            for(let r = 0; r < this.cells.length; r++){
                this.cells[r].reverse()
            }
        }
        
    }


    