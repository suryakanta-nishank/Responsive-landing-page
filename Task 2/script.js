
let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let int = null;
let lapTimes = [];
let lapCounter = 1;

const timeRef = document.getElementById("timer-display");
const lapTimesRef = document.getElementById("lap-times");

document.getElementById("start-timer").addEventListener("click", () => {
    clearInterval(int);
    int = setInterval(displayTimer, 10);
});

document.getElementById("pause-timer").addEventListener("click", () => {
    clearInterval(int);
});

document.getElementById("lap-timer").addEventListener("click", () => {
    let lapTime = formatTime(hours, minutes, seconds, milliseconds);
    lapTimes.push({ lap: lapCounter++, time: lapTime });
    displayLapTimes();
});

document.getElementById("reset-timer").addEventListener("click", () => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    lapTimes = [];
    lapCounter = 1;
    timeRef.innerHTML = "00 : 00 : 00 : 000";
    lapTimesRef.innerHTML = "";
});

function displayTimer() {
    milliseconds += 10;
    if (milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    timeRef.innerHTML = formatTime(hours, minutes, seconds, milliseconds);
}

function formatTime(h, m, s, ms) {
    let hh = h < 10 ? "0" + h : h;
    let mm = m < 10 ? "0" + m : m;
    let ss = s < 10 ? "0" + s : s;
    let mss = ms < 10 ? "00" + ms : ms < 100 ? "0" + ms : ms;
    return `${hh} : ${mm} : ${ss} : ${mss}`;
}

function displayLapTimes() {
    lapTimesRef.innerHTML = "";
    lapTimes.forEach(lap => {
        let lapItem = document.createElement("div");
        lapItem.textContent = `Lap ${lap.lap}: ${lap.time}`;
        lapTimesRef.appendChild(lapItem);
    });
}
