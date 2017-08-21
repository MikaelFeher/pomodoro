var mainContainer = document.getElementById('main-container');
var timerDisplay = document.getElementById('timer-display');
var timerNumbersDisplay = document.getElementById('timer-numbers-display');
var timerDoneMessage = document.getElementById('timer-done-message');
var minutes = document.getElementById('minutes');
var seconds = document.getElementById('seconds');
var durationContainer = document.getElementById('duration-container');
var durationSelector = document.getElementById('duration-selector');
var startButton = document.getElementById('start-button');
var pauseButton = document.getElementById('pause-button');
var resetButton = document.getElementById('reset-button');
var siren = new Audio('siren.mp3');
var userSelectedDuration = durationSelector.value;

// To prevent more than one instance of the timer being started.
var timerRunning;

// Interval name in order to clear the interval.
var timer;

// Base setup of the timer.
initializeTimer();

// User defined duration.
durationSelector.addEventListener('change', function() {
    userSelectedDuration = durationSelector.value;
    initializeTimer();
});

// Button functions
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', initializeTimer);

function startTimer() {
    if (!timerRunning) {
        timerRunning = !timerRunning;
        // Button display
        resetButton.classList.add('hide');
        startButton.classList.add('hide');
        pauseButton.classList.remove('hide');
        durationContainer.classList.add('hide');

        // The actual timer
        timer = setInterval(function() {
            sec--;
            if (sec < 0) {
                sec = 59;
            }
            if (mins <= 0) {
                mins = 0;
            }
            if (sec == 59) {
                if (mins <= 0) {
                    mins = 0;
                } else {
                    mins--;
                }
            }
            if (mins == 0 && sec < 1) {
                pauseTimer();
                timerDone();
                return;
            }
            seconds.innerHTML = sec < 10 ? `0${sec}` : sec;
            minutes.innerHTML = mins < 10 ? `0${mins}` : mins;
        }, 1000);
    } else {
        return;
    }
};

function pauseTimer() {
    if (timerRunning) {
        timerRunning = !timerRunning;
        clearInterval(timer);

        // Button display
        resetButton.classList.remove('hide');
        startButton.classList.remove('hide');
        pauseButton.classList.add('hide');
    } else {
        return;
    }
};

function initializeTimer() {
    // Reset initial values
    timerRunning = false;

    // Setting initial values
    mins = userSelectedDuration;
    sec = 00;

    // Reset the html
    siren.pause();
    minutes.innerHTML = mins < 10 ? `0${mins}` : mins;
    seconds.innerHTML = sec < 10 ? `0${sec}` : sec;
    mainContainer.classList.remove('timer-done');
    timerNumbersDisplay.classList.remove('hide');
    timerDoneMessage.classList.add('hide');
    durationContainer.classList.remove('hide');

    // Button display
    resetButton.classList.add('hide');
    pauseButton.classList.add('hide');
    startButton.classList.remove('hide');
}

function timerDone() {
    siren.play();
    mainContainer.classList.add('timer-done');
    timerNumbersDisplay.classList.add('hide');
    timerDoneMessage.classList.remove('hide');
    startButton.classList.add('hide');
    pauseButton.classList.add('hide');
    resetButton.classList.remove('hide');
}