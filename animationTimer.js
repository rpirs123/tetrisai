export class AnimationTimer{
    constructor(callback){
        this.stopped = false
        this.startTime = Date.now()
        this.callback = callback
    }

    animateFrame(){
        if(this.stopped){
            return
        }
        
        this.callback(Date.now() - this.startTime)

        requestAnimationFrame(this.animateFrame.bind(this))
    }

    stopTimer(){
        this.stopped = true
    }

}