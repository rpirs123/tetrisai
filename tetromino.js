export class Tetromino{
    constructor(cells){
        this.cells = cells
        this.row = 0;
        this.colum = 0;
        this.dimension = this.cells.length
    }


    getPieceFromIndex(indx){
        let piece;

        switch(indx){
            case 0: // 0
                piece = new Tetromino([
                    [0xFFFF00,0xFFFF00]
                    [0xFFFF00,0xFFFF00]
                ])
                break;
            case 1:  // I  0x00FFF   0x000000  black
                piece = new Tetromino([
                    [0x000000,0x000000 ,0x000000 ,0x000000 ]
                    [0x00FFF, 0x00FFF ,0x00FFF ,0x00FFF ]
                    [0x000000,0x000000 ,0x000000 ,0x000000 ]
                    [0x000000,0x000000 ,0x000000 ,0x000000 ]
                ])
                break;
            case 2: // T 0x9900FF
                piece = new Tetromino([
                    [0x000000,0x9900FF ,0x000000 ]
                    [0x9900FF ,0x9900FF ,0x9900FF]
                    [0x000000,0x000000 ,0x000000]
                ])
                break;
            case 3: // S 0x6AA84F
                piece = new Tetromino([
                    [0x000000,0x6AA84F ,0x6AA84F ]
                    [0x6AA84F ,0x6AA84F ,0x000000]
                    [0x000000,0x000000 ,0x000000]
                ])
                break;
            case 4: // // Red Z 0xCC0000
                piece = new Tetromino([
                    [0xCC0000,0xCC0000 ,0x000000 ]
                    [0x000000 ,0xCC0000 ,0xCC0000]
                    [0x000000,0x000000 ,0x000000]
                ])
                break;
            case 5: // Blue J 0x0000FF
                piece = new Tetromino([
                    [0x0000FF,0x000000 ,0x000000 ]
                    [0x0000FF ,0x0000FF ,0x0000FF]
                    [0x000000,0x000000 ,0x000000]
                ])
                break;
            case 6: //  L 0xFF9900
                piece = new Tetromino([
                    [0x000000,0x000000 ,0xFF9900 ]
                    [0xFF9900 ,0xFF9900 ,0xFF9900]
                    [0x000000,0x000000 ,0x000000]
                ])
                break;
        }
        piece.row = 0
        piece.col = Math.floor((10 - this.dimension) / 2)
        return piece
    }
}