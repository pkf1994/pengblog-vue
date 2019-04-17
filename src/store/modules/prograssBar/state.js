const Nanobar = require('nanobar');


export default {
    nanobar: new Nanobar(),

    nanobarTimer: undefined,

    nanobarGoToMilePost(){

        let nanobar = this.nanobar

        nanobar.go(40)

        let i = 40

        let prograssTimer = setInterval(() => {
            i++
            if(i < 90)
                nanobar.go(i)
        }, 500)

        this.nanobarTimer = prograssTimer

        return prograssTimer
    },

    prograssBarGoToTheEnd(){

        let nanobar = this.nanobar

        clearInterval(this.nanobarTimer)

        nanobar.go(100)
    }
}