export class Ai{

    constructor(){
        this.aggregateHeight = 0.510066 
        this.clearedLines  = 0.760666    
        this.holes = 0.35663
        this.bumpiness= 0.184483
    
    }
    

    bestMove(grid,activeTetrominoes, tetrominoIndx = 0){
        let best = null
        let bestScore = null
        let activeTetromino = activeTetrominoes[tetrominoIndx]


        for(let rotation = 0; rotation < 4; rotation++){
            let _tetromino = activeTetromino.clone()

            for(let i = 0; i < rotation; i++){
                _tetromino.rotate(grid)
            }

            while(_tetromino.moveLeft(grid)); // put to starting position (leftmost col in top row)

            while(grid.isValid(_tetromino)){
                let tetrominoSet = _tetromino.clone()
                while(tetrominoSet.moveDown(grid));

                let _grid = grid.clone()
                _grid.addToBoard(tetrominoSet)

                let score = null;

                if(tetrominoIndx === (activeTetrominoes.length - 1)){
                    score = -this.aggregateHeight *_grid.getAggregateHeight() + this.clearedLines *_grid.getClearedLines() -
                            this.holes* _grid.getHoles() - this.bumpiness *_grid.getBumpiness()
                }else{
                   score = this.bestMove(_grid,activeTetrominoes,tetrominoIndx + 1).bestScore
                }

                if(score > bestScore || bestScore == null){
                    bestScore = score
                    best = _tetromino.clone()
                }

                _tetromino.column++
            }
        }

        return {bestScore: bestScore, bestTetromino: best}
    }

    returnBestTetromino(grid,activeTetrominoes){
        console.log("what returning",this.bestMove(grid,activeTetrominoes).bestTetromino)
        return this.bestMove(grid,activeTetrominoes).bestTetromino
    }
}