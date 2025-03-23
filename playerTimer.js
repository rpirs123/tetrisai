export class PlayerTimer{
    constructor(callback,delay){
        this.isActive = false
        this.lastUpdate = null;
        this.callback = callback
        this.delay = delay

    }

    animateLoop() {
        let now = Date.now();
        
        if (this.isActive) {
            let elapsed = now - this.lastUpdate;
            if (this.lastUpdate === null || elapsed > this.delay) {
                this.callback();  
                this.lastUpdate = now; 
            }
        }
        
        // Schedule the next frame
        requestAnimationFrame(this.animateLoop.bind(this));
    }
    start(){
        if(this.isActive){
            return 
        }
        this.lastUpdate = Date.now()
        this.isActive = true
        this.animateLoop()
    }

    stop(){
        this.isActive = false
    }

    dropTetromino(newDelay){
        this.callback()
        this.delay = newDelay
        this.lastUpdate = Date.now()
    }
}