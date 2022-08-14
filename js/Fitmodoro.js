export default class Timer {
    constructor(root) {

    
        this.element = {
            minutes : root.querySelector(".timerPartMinutes"),
            seconds : root.querySelector(".timerPartSeconds"),
            control : root.querySelector(".timerBtnControl"),
            reset   : root.querySelector(".timerBtnReset"),
            add15   : root.querySelector(".add15"),
            add25   : root.querySelector(".add25"),
            add35   : root.querySelector(".add35"),
            woStart : root.querySelector(".woStart"),
            woTitleOne : root.querySelector('.workoutTitleOne'),
            woTitleTwo : root.querySelector(".workoutTitleTwo"),
            woInput : root.querySelector(".workoutInput"),
            woOne   : root.querySelector(".workoutOne"),
            woTwo   : root.querySelector(".workoutTwo"),
            woThree : root.querySelector(".workoutThree"),
            setTimerHeader : root.querySelector('#setTimerHeader'),
            timerButtons : root.querySelector('.spaceAroundButtons'),
            workoutScroll : root.querySelector('#workoutScroll')

        }

        this.interval = null
        this.remainingSeconds = 0
        this.workoutStarted = false

        this.element.control.addEventListener("click", () => {
            if (this.interval === null) {
                this.start()
            } else {
                this.stop()
            }
        })

        this.element.reset.addEventListener("click", () => {

            if (this.remainingSeconds !== 0) {
                this.stop()
                this.remainingSeconds = 0
                this.updateInterfaceTime ()

                
            }
        })

        this.element.woStart.addEventListener("click", () => {

            if (this.interval === null) {
                this.stop()
                this.remainingSeconds = 2
                this.updateInterfaceTime ()
                this.workoutStarted = true                 
                this.updateImage () 
            }

        } )

        this.element.add15.addEventListener("click", () => {

            if (this.interval === null) {
                this.stop()
                this.remainingSeconds = 2
                this.updateInterfaceTime ()
                this.workoutStarted = false
                
            }

        } )

        this.element.add25.addEventListener("click", () => {

            if (this.interval === null) {
                this.stop()
                this.remainingSeconds = 1500
                this.updateInterfaceTime ()
                this.workoutStarted = false
                
            }

        } )

        this.element.add35.addEventListener("click", () => {

            if (this.interval === null) {
                this.stop()
                this.remainingSeconds = 2100
                this.updateInterfaceTime ()
                this.workoutStarted = false
                
            }

        } )
        this.arr = [
            'Arm Circles',
            'Standard Push Up',
            'Plank',
            'Squat',
            'Lunge',
            'Mountain Climber',
            'Bridge',
            'Plank to Push up',
            'Wall Sit',
            'Jump Squat',
            'Single Leg Deadlift',
            'Calf Raises',
            'SuperPerson',
            'Flutter Kicks',
            'Side Plank',
            'Ab Twists',
            'Bicycle Crunches',
            'Jumping Jacks',
            'Crunch',
            'Ice Skater Jumps',
            'Pistol Squat',
            'Glute Kickbacks',
            'Plank + Shoulder Taps',
            'Burpee',
            'Lateral Lunge'
        ]

        this.imageArray = [
            'images/astro_weights.png',
            'images/astro_hoop.png',
            'images/astro_yoga_2.png',
            'images/astro_dumbell.png'
        ]

    }
    

    getMultipleRandom (arr, num) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, num)
    }


    updateImage () {
        this.getMultipleRandom(this.imageArray, 1)

        let results = this.getMultipleRandom(this.imageArray,1)
        document.querySelector('img').src = results
    }

    updateInterfaceTime () {
        const minutes = Math.floor(this.remainingSeconds / 60)
        const seconds = this.remainingSeconds % 60

        this.element.minutes.textContent= minutes.toString().padStart(2, "0")
        this.element.seconds.textContent= seconds.toString().padStart(2, "0")
}

    updateInterfaceControls () {
        if (this.interval === null) {
            this.element.control.innerHTML = `<span class="material-icons">play_arrow</span>`
            this.element.control.classList.add("timerBtnStart")
            this.element.control.classList.remove("timerBtnStop")
        } else {
            this.element.control.innerHTML = `<span class="material-icons">pause</span>`
            this.element.control.classList.add("timerBtnStop")
            this.element.control.classList.remove("timerBtnStart")
        }
    }

    start() {
        this.interval = setInterval(() => {
            this.remainingSeconds--
            if(this.remainingSeconds < 0) {
                this.stop()
            }
            this.updateInterfaceTime()
            this.updateInterfaceControls ()
            if (this.remainingSeconds === 0) {
                this.stop()
                this.setToFive()
                this.scrollTop()
                if(this.remainingSeconds === 0 && this.workoutStarted === true) {
                    this.element.woStart.classList.add("hidden")
                    this.element.woTitleOne.classList.remove("hidden")
                    this.element.woTitleTwo.classList.add("hidden")
                    this.element.woOne.classList.add("hidden")
                    this.element.woTwo.classList.add("hidden")
                    this.element.woThree.classList.add("hidden")
                    this.element.woInput.classList.add("hidden")
                    this.element.setTimerHeader.classList.remove("hidden")
                    this.element.timerButtons.classList.remove("hidden")


                }
            }
        }, 1000)
        


    }

    scrollTop () {
        this.element.workoutScroll.scrollIntoView(true, {behavior: "smooth"});
    }

    stop () {
        clearInterval(this.interval)
        this.interval = null
        this.updateInterfaceControls()
    }


    setToFive () {
        this.getMultipleRandom(this.arr, 3)

        let resultsOne = this.getMultipleRandom(this.arr,1)
        document.querySelector('.workoutOne').innerText = resultsOne.toString()
    
        let resultsTwo = this.getMultipleRandom(this.arr,1)
        document.querySelector('.workoutTwo').innerText = resultsTwo.toString()
    
        let resultsThree = this.getMultipleRandom(this.arr,1)
        document.querySelector('.workoutThree').innerText = resultsThree.toString()        
        this.updateInterfaceTime ()
        if (this.remainingSeconds === 0) {           
            this.element.woStart.classList.remove("hidden")
            this.element.woTitleOne.classList.add("hidden")
            this.element.woTitleTwo.classList.remove("hidden")
            this.element.woOne.classList.remove("hidden")
            this.element.woTwo.classList.remove("hidden")
            this.element.woThree.classList.remove("hidden")
            this.element.woInput.classList.remove("hidden")
            this.element.setTimerHeader.classList.add("hidden")
            this.element.timerButtons.classList.add("hidden")

     }
    }  

}




























