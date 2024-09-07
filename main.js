let seconds = 0;
let interval = null;
let laps = [];

function updateDisplay() {
    const display = document.getElementById("display");
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    display.textContent = `${hours}:${minutes}:${secs}`;

    // Update the colour based on even or odd seconds
    if (seconds % 2 === 0) {
        display.classList.remove('odd');
        display.classList.add('even');
    } else {
        display.classList.remove('even');
        display.classList.add('odd');
    }
}

function startStop() {
    if (interval) {
        clearInterval(interval);
        interval = null;
        document.getElementById("startStopBtn").textContent = "Start";
    } else {
        interval = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000);
        document.getElementById("startStopBtn").textContent = "Pause";
    }
}

function reset() {
    clearInterval(interval);
    interval = null;
    seconds = 0;
    laps = [];
    updateDisplay();
    document.getElementById("startStopBtn").textContent = "Start";
    document.getElementById("lapsList").innerHTML = '';
}

function lap() {
    if (interval) {
        const lapTime = formatTime(seconds);
        laps.push(lapTime);
        displayLaps();
    }
}

function formatTime(totalSeconds) {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
}

function displayLaps() {
    const lapsList = document.getElementById("lapsList");
    lapsList.innerHTML = laps.map((lap, index) => `<li>Lap ${index + 1}: ${lap}</li>`).join('');
}

document.getElementById("startStopBtn").addEventListener("click", startStop);
document.getElementById("resetBtn").addEventListener("click", reset);
document.getElementById("lapBtn").addEventListener("click", lap);