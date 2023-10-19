document.addEventListener("DOMContentLoaded", function () {
    const gong = document.getElementById("gong");
    const intervalInput = document.getElementById("interval");
    const durationInput = document.getElementById("duration");
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");
    const intervalCountdown = document.getElementById("intervalCountdown");
    const durationCountdown = document.getElementById("durationCountdown");

    let intervalCountdownInterval;
    let durationCountdownInterval;
    let playingInterval = null; // Track the playing interval

    startButton.addEventListener("click", function () {
        const intervalSeconds = parseInt(intervalInput.value);
        const durationMinutes = parseInt(durationInput.value);

        if (isNaN(intervalSeconds) || isNaN(durationMinutes)) {
            alert("Please enter valid numbers.");
        } else {
            startMeditation(intervalSeconds, durationMinutes);
        }
    });

    stopButton.addEventListener("click", function () {
        clearInterval(intervalCountdownInterval);
        clearInterval(durationCountdownInterval);
        clearInterval(playingInterval); // Clear the playing interval
        gong.pause();
        intervalCountdown.textContent = "Interval Countdown:";
        durationCountdown.textContent = "Duration Countdown:";
        startButton.style.display = "block";
        stopButton.style.display = "none";
    });

    function startMeditation(intervalSeconds, durationMinutes) {
        const intervalMillis = intervalSeconds * 1000;
        const durationMillis = durationMinutes * 60 * 1000;
        const totalRepeats = Math.ceil(durationMillis / intervalMillis);
        let remainingSeconds = intervalSeconds;
        let remainingDuration = durationMillis;

        playGong(totalRepeats, intervalMillis);

        intervalCountdownInterval = setInterval(function () {
            remainingSeconds -= 1;
            intervalCountdown.textContent = `Interval Countdown: ${remainingSeconds} seconds`;

            if (remainingSeconds <= 0) {
                remainingSeconds = intervalSeconds;
            }
        }, 1000);

        durationCountdownInterval = setInterval(function () {
            remainingDuration -= 1000;
            const minutes = Math.floor(remainingDuration / 60000);
            const seconds = Math.floor((remainingDuration % 60000) / 1000);
            durationCountdown.textContent = `Duration Countdown: ${minutes} minutes ${seconds} seconds`;

            if (remainingDuration <= 0) {
                clearInterval(intervalCountdownInterval);
                clearInterval(durationCountdownInterval);
                intervalCountdown.textContent = "Interval Countdown:";
                durationCountdown.textContent = "Duration Countdown:";
                startButton.style.display = "block";
                stopButton.style.display = "none";
            }
        }, 1000);

        startButton.style.display = "none";
        stopButton.style.display = "block";
    }

    function playGong(repeats, interval) {
        let count = 0;

        playingInterval = setInterval(() => {
            count++;
            if (count >= repeats) {
                clearInterval(playingInterval);
            }
            gong.currentTime = 0; // Reset to the beginning of the sound file
            gong.play();
        }, interval);
    }
});
