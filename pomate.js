let currentTime = new Date();
let targetTime = new Date();
let remainingTime = new Date();
let pomodoroTime = 1;
let breakTime = 15;

let timer = document.getElementById("timer");
let startButton = document.getElementById("startStopBtn");
let resetButton = document.getElementById("resetBtn");
let wasPressedOnce = false;
let wasPaused = false;

function tickTock (){
    currentTime = new Date();
    remainingTime = targetTime - currentTime;
    timer.innerText = millisToMinutesAndSeconds(remainingTime);
}

function createTimer () {
    timer.innerText = pomodoroTime + ":00";
}

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);

    return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
} 

createTimer();

startButton.onclick = function triggerClock () {    
    if (wasPressedOnce === false) {
        currentTime = new Date();
        targetTime = new Date();
        targetTime.setMinutes(targetTime.getMinutes() + pomodoroTime);
        remainingTime = targetTime - currentTime;

        updateClock = setInterval(tickTock, 1000);

        wasPressedOnce = true;
    }

    else {
        wasPaused = !wasPaused;

        if (wasPaused) {
            remainingTime = targetTime - currentTime;
            console.log(`Remaining time: ${remainingTime} | Target time: ${targetTime}`);
            clearInterval(updateClock);
            console.log("Paused.");
        }

        else {
            console.log("Start");
            currentTime = new Date();
            targetTime = new Date();
            targetTime.setMilliseconds(targetTime.getMilliseconds() + remainingTime);
            remainingTime = targetTime - currentTime;
            updateClock = setInterval(tickTock, 1000);
        }
    }
}

resetButton.onclick = function resetClock () {
    wasPaused = false;
    wasPressedOnce = false;
    clearInterval(updateClock);
    createTimer();
}

// console.log(currentTime);