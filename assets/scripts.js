var main = document.body;

var Opener = document.createElement("div");
var header = document.createElement("h1");
var message = document.createElement("p");
var startButton = document.createElement("button");

main.appendChild(Opener);
Opener.appendChild(header);
Opener.appendChild(message);
Opener.appendChild(startButton);

Opener.setAttribute("class", "start");
header.textContent = "Coding Quiz";
message.textContent = "Welcome to the coding quiz. Hit the start button to begin answering as many multiple choice questions as you can in the time alloted. Each wrong answer will subract from your time."
startButton.textContent = "Start Quiz";

startButton.addEventListener("click", function(e) {
    //console.log("test");
    Opener.setAttribute("class", "hidden");
    startQuiz();
})

function startQuiz() {
    startCountdown();
    timer.textContent = "Time Remaining: " + time;
    timer.setAttribute("class", "timer");
}

//timer section
var timer = document.createElement("p");
timer.setAttribute("class", "hidden");
main.appendChild(timer);
var time = 10;

function startCountdown() {
    var timerInterval = setInterval(function(e) {
        timer.textContent = "Time Remaining: " + time;
        time--;

        if(time === -1) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and append image
            endGame();
          }
    }, 1000)
}


function endGame() {

}