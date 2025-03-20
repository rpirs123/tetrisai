export class SelectRandomTetromino{
    constructor(){
        this.bag = [0,1,2,3,4,5,6]
        this.shuffleBag()
        this.index = -1 
    }

    shuffleBag(){
        let currentIndex = this.bag.length
        let tempValue;
        let randomIndex;
        
        while(currentIndex != 0){

            randomIndex = Math.floor(Math.random() * currentIndex)
            console.log(randomIndex)
            currentIndex -= 1

            tempValue = this.bag[currentIndex]
            this.bag[currentIndex] = this.bag[randomIndex]
            this.bag[randomIndex] = tempValue
        }

        console.log("completed", this.bag) 
       
    }
}