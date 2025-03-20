export class SelectRandomTetromino{
    constructor(){
        this.bag = [0,1,2,3,4,5,6]
        this.shuffleBag()
        this.index = -1 
    }


    getNextPiece(){
        this.index++;
        if(this.index > this.bag.length){
            this.shuffleBag()
            this.index = 0
        }
        return "TETROMINO  PLACEHOLDER"
    }

    shuffleBag(){
        let currentIndex = this.bag.length
        let tempValue;
        let randomIndex;
        
        while(currentIndex != 0){

            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            tempValue = this.bag[currentIndex]
            this.bag[currentIndex] = this.bag[randomIndex]
            this.bag[randomIndex] = tempValue
        }

        console.log("completed bag", this.bag) 
       
    }
}