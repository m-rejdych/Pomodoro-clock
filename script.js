const sessionAddBtn = document.getElementById(`sessionAdd`);
const sessionNumberDisplay = document.getElementById(`sessionNumberDisplay`);
const sessionReduceBtn = document.getElementById(`sessionReduce`);
const breakAddBtn = document.getElementById(`breakAdd`);
const breakNumberDisplay = document.getElementById(`breakNumberDisplay`);
const breakReduceBtn = document.getElementById(`breakReduce`);
const playBtn = document.getElementById(`playButton`);
const restartBtn = document.getElementById(`restartButton`);
const pauseBtn = document.getElementById(`pauseButton`);
const stopBtn = document.getElementById(`stopButton`);
const sessionBreakInfo = document.getElementById(`sessionBreakInfo`);
const minutesLeft = document.getElementById(`minutesLeft`);
const secondsLeft = document.getElementById(`secondsLeft`);


sessionAddBtn.addEventListener(`click`, () => {
    sessionNumberDisplay.textContent++;
    if (secondsLeft.textContent == 0) minutesLeft.textContent = sessionNumberDisplay.textContent;
})
sessionReduceBtn.addEventListener(`click`, () => {
    if (sessionNumberDisplay.textContent > 1) {
        sessionNumberDisplay.textContent--;
        if (secondsLeft.textContent == 0) minutesLeft.textContent = sessionNumberDisplay.textContent;
    }
})
breakAddBtn.addEventListener(`click`, () => {
    breakNumberDisplay.textContent++;
})
breakReduceBtn.addEventListener(`click`, () => {
    if (breakNumberDisplay.textContent > 1) {
        breakNumberDisplay.textContent--;
    }
})


playBtn.addEventListener(`click`, play);
restartBtn.addEventListener(`click`, restart);
pauseBtn.addEventListener(`click`, pause);
stopBtn.addEventListener(`click`, stop);

let sessionMinutes;
let breakMinutes;
let interval;

function play() {
    playBtn.removeEventListener(`click`, play);

    sessionMinutes = sessionNumberDisplay.textContent;
    breakMinutes = breakNumberDisplay.textContent;

    interval = setInterval(() => {
        if (minutesLeft.textContent == 0 && secondsLeft.textContent == 0 && sessionBreakInfo.textContent == `Session`) {
            sound(`sound1.mp3`);
            minutesLeft.textContent = breakMinutes;
            sessionBreakInfo.textContent = `Break`;
        }
        if (minutesLeft.textContent == 0 && secondsLeft.textContent == 0 && sessionBreakInfo.textContent === `Break`) {
            sound(`sound1.mp3`);
            minutesLeft.textContent = sessionMinutes;
            sessionBreakInfo.textContent = `Session`;
        }
        if (secondsLeft.textContent == 0) {
            secondsLeft.textContent = 60;
            minutesLeft.textContent--;
        }
        secondsLeft.textContent--;
    }, 1000)
}
function restart() {
    minutesLeft.textContent = sessionMinutes;
    secondsLeft.textContent = `00`;
    sessionBreakInfo.textContent = `Session`;
}
function pause() {
    playBtn.addEventListener(`click`, play);
    clearInterval(interval);
}
function stop() {
    playBtn.addEventListener(`click`, play);
    clearInterval(interval);
    minutesLeft.textContent = sessionNumberDisplay.textContent;
    secondsLeft.textContent = `00`;
    sessionBreakInfo.textContent = `Session`;
}


function sound(src) {
    this.sound = document.createElement(`audio`);
    this.sound.src = src;
    this.sound.setAttribute(`preload`, `auto`);
    this.sound.setAttribute(`controls`, `none`);
    this.sound.style.display = `none`;
    document.body.appendChild(this.sound);
    this.sound.play();
}