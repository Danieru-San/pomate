/* TODO:
* Start changes to stop, changes to start
* Skip only available
* Settings menu to change Pomodoro + Break + Long break time
*/

let currentTime = new Date();
let targetTime = new Date();
let remainingTime = new Date();
let pomodoroTime = 0.05;
let breakTime = 0.03;
let longBreakTime = 0.08;

let updateClock;

let whatTime = document.getElementById("timer-title");
let timer = document.getElementById("timer");

let startButton = document.getElementById("startStopBtn");
let resetButton = document.getElementById("resetBtn");
let skipButton = document.getElementById("skipBtn");
let gear = document.getElementById("gear");
let saveButton = document.getElementById("overlay-button");

let gearClicked = false;

let wasPressedOnce = false;
let wasPaused = false;
let onPomodoro = true;
let onBreak = false;
let onLongBreak = false;
let pomodorosCount = 0;

let pomodoroComplete = new Audio("finished-pomodoro.mp3");
let breakComplete = new Audio("finished-break.mp3");

let settingsPomodoro = document.getElementById("settings-pomodoro");
let settingsBreak = document.getElementById("settings-break");
let settingsLong = document.getElementById("settings-long");

settingsPomodoro.value = pomodoroTime;
settingsBreak.value = breakTime;
settingsLong.value = longBreakTime;

let progressBar = document.getElementById("progress-fill");

gear.onclick = function () {
    document.getElementById("overlay").style.display = "block";
    gearClicked = true;

    var alerted = localStorage.getItem('alerted') || '';
    if (alerted != 'yes') {
     alert("1. When you update the settings, all work undone will be lost.\n2. The times here are displayed in minutes.");
     localStorage.setItem('alerted','yes');
    }

}

saveButton.onclick = function () {
    document.getElementById("overlay").style.display = "none";
    pomodoroTime = parseFloat(settingsPomodoro.value);
    breakTime = parseFloat(settingsBreak.value);
    longBreakTime = parseFloat(settingsLong.value);

    wasPaused = false;
    wasPressedOnce = false;
    clearInterval(updateClock);
    progressBar.style.width = "0%";


    if (onPomodoro == true) {
        preparePomodoro();
    }

    else if (onBreak == true) {
        createTimer(breakTime);
    }

    else if (onLongBreak == true) {
        createTimer(longBreakTime);
    }

    gearClicked = false;
}

function changeStartButton (chosenText) {
    startButton.innerText = chosenText;
}

function changeTimerTitle (chosenText) {
    whatTime.innerText = chosenText;
}

function soundNotification (audio) {
    audio.play();
}

function prepareBreak() {
    if (updateClock != undefined) {
        clearInterval(updateClock);
    }
    
    remainingTime = new Date();
    currentTime = new Date();
    targetTime = new Date();
    onPomodoro = false;
    
    pomodorosCount++;

    if (pomodorosCount % 4 == 0) {
        onBreak = false;
        onLongBreak = true;
        createTimer(longBreakTime);
        changeTimerTitle("Chillax.")
        changeStartButton("Take a long break 🕒🕒");
    }

    else {
        onBreak = true;
        onLongBreak = false;
        createTimer(breakTime);
        changeStartButton("Take a break 🕒");
        changeTimerTitle("Relax.")
    }

    wasPressedOnce = false;
    wasPaused = false;
    document.getElementById("pomodorosCount").innerText = pomodorosCount + " pomodoros complete.";

    if (gearClicked == false) {
        soundNotification(pomodoroComplete);
    }

}

function preparePomodoro() {
    if (updateClock != undefined) {
        clearInterval(updateClock);
    }

    createTimer(pomodoroTime);
    remainingTime = new Date();
    currentTime = new Date();
    targetTime = new Date();
    onPomodoro = true;
    onBreak = false;
    onLongBreak = false;
    wasPressedOnce = false;
    wasPaused = false;
    changeStartButton("Start Pomodoro 🍅");
    changeTimerTitle("Get to work!");

    if (gearClicked == false) {
        soundNotification(breakComplete);
    }

}

function tickTock (time){
    currentTime = new Date();
    remainingTime = targetTime - currentTime;
    progressBar.style.width = Math.abs((1 - (remainingTime/(time*1000*60))) * 100) + "%"; 
    // console.log((1 - (remainingTime/(time*1000*60))) * 100);

    if (remainingTime < 0){
        onPomodoro == true ? prepareBreak() : preparePomodoro();
        progressBar.style.width = "0%";
    }

    else {
        timer.innerText = millisToMinutesAndSeconds(remainingTime);
    }    
}

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);

    return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}

function createTimer (time) {
    timer.innerText = millisToMinutesAndSeconds(time * 1000 * 60);
    document.getElementById("pomodorosCount").innerText = pomodorosCount + " pomodoros complete.";
    document.getElementById("basket").innerText = "🍅".repeat(pomodorosCount);
}

function runTimer (time) {
    if (wasPressedOnce === false) {
        currentTime = new Date();
        targetTime = new Date();
        targetTime.setMilliseconds(targetTime.getMilliseconds() + (time * 1000 * 60));
        remainingTime = targetTime - currentTime;

        updateClock = setInterval(tickTock, 10, time);
        wasPressedOnce = true;

        changeStartButton ("Pause");
    }

    else {
        wasPaused = !wasPaused;
        wasPaused ? changeStartButton ("Resume") : changeStartButton ("Pause"); 


        if (wasPaused) {
            remainingTime = targetTime - currentTime;
            clearInterval(updateClock);
        }

        else {
            currentTime = new Date();
            targetTime = new Date();
            targetTime.setMilliseconds(targetTime.getMilliseconds() + remainingTime);
            remainingTime = targetTime - currentTime;
            updateClock = setInterval(tickTock, 10, time);
        }
    }
}

createTimer(pomodoroTime);

startButton.onclick = function triggerClock () {
    
    if (onPomodoro == true) {
        runTimer(pomodoroTime);

    }

    else if (onBreak == true) {
        runTimer(breakTime);
    }

    else if (onLongBreak == true) {
        runTimer(longBreakTime);
    }
}

resetButton.onclick = function resetClock () {
    wasPaused = false;
    wasPressedOnce = false;
    clearInterval(updateClock);    

    if (onPomodoro == true) {
        createTimer(pomodoroTime);
        changeStartButton("Start Pomodoro 🍅");
    }

    else if (onBreak == true) {
        createTimer(breakTime);
        changeStartButton("Take a break 🕒");
    }

    else if (onLongBreak == true) {
        createTimer(longBreakTime);
        changeStartButton("Take a longer break 🕒🕒");
    }

    progressBar.style.width = 0;
}

skipButton.onclick = function skipClock () {
    wasPaused = false; 
    wasPressedOnce = false;
    clearInterval(updateClock);
    progressBar.style.width = "0%";    
    
    if (onPomodoro == true) {

        if (pomodorosCount % 4 == 0 && pomodorosCount != 0) {
            onPomodoro = false;
            onBreak = false;
            onLongBreak = true;
            createTimer(longBreakTime);
            changeTimerTitle("Chillax.");
            changeStartButton("Take a longer break 🕒🕒");
        }

        else {
            onPomodoro = false;
            onBreak = true;
            onLongBreak = false;
            createTimer(breakTime);
            changeTimerTitle("Relax.");
            changeStartButton("Take a break 🕒");
        }
    }

    else if (onBreak == true) {
        onPomodoro = true;
        onBreak = false;
        onLongBreak = false;
        createTimer(pomodoroTime);
        changeTimerTitle("Get to work!");
        changeStartButton("Start Pomodoro 🍅");

    }

    else if (onLongBreak == true) {
        onPomodoro = true;
        onBreak = false;
        onLongBreak = false;
        createTimer(pomodoroTime);
        changeTimerTitle("Get to work!");
        changeStartButton("Start Pomodoro 🍅");
    }

}




