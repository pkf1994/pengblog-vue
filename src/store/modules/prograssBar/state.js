const Nanobar = require('nanobar');


export default {
    nanobar: new Nanobar(),

    nanobarTimers: [],

    nanobarGoToMilePost(){

        let nanobar = this.nanobar

        nanobar.go(40)

        let i = 40

        let prograssTimer = setInterval(() => {
            i++
            if(i < 90)
                nanobar.go(i)
        }, 500)

        this.nanobarTimers.push(prograssTimer)

        return prograssTimer
    },

    prograssBarGoToTheEnd(){

        let nanobar = this.nanobar

        clearInterval(this.nanobarTimers.pop())

        nanobar.go(100)
    }
}