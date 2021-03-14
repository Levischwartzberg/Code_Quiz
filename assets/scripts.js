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

var questionShown = false;
function startQuiz() {
    startCountdown();
    timer.textContent = "Time Remaining: " + time;
    timer.setAttribute("class", "timer");
    generateQuestion();
}

//timer section
var timer = document.createElement("p");
timer.setAttribute("class", "hidden");
main.appendChild(timer);
var time = 30;

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

function generateQuestion() {
    //console.log("test");
    questionShown = true;

    let problem = document.createElement("div");
    main.appendChild(problem);
    problem.setAttribute("class", "question");

    let i = Math.floor(Math.random() * questions.length);

    let question = document.createElement("h1");
    problem.appendChild(question);
    //console.log(questions[i].question);
    question.textContent = questions[i].question;

    var answer1 = document.createElement("button");
    var answer2 = document.createElement("button");
    var answer3 = document.createElement("button");
    var answer4 = document.createElement("button");
    problem.appendChild(answer1);
    problem.appendChild(answer2);
    problem.appendChild(answer3);
    problem.appendChild(answer4);
    answer1.textContent = questions[i].answer1[0];
    answer2.textContent = questions[i].answer2[0];
    answer3.textContent = questions[i].answer3[0];
    answer4.textContent = questions[i].answer4[0];

    answer1.addEventListener("click", function(e){
        if (questions[i].answer1[1] == true) {
            displayCorrect("correct!");
        }
        else {
            time = time - 5;
            displayCorrect("incorrect!");
        }

        if (time > 0) {
            problem.setAttribute("class", "hidden");
            generateQuestion();
        }
        questionShown = false;
    })
    answer2.addEventListener("click", function(e){
        if (questions[i].answer2[1] == true) {
            displayCorrect("correct!");
        }
        else {
            time = time - 5;
            displayCorrect("incorrect!");
        }

        if (time > 0) {
            problem.setAttribute("class", "hidden");
            generateQuestion();
        }
        questionShown = false;
    })
    answer3.addEventListener("click", function(e){
        if (questions[i].answer3[1] == true) {
            displayCorrect("correct!");
        }
        else {
            time = time - 5;
            displayCorrect("incorrect!");
        }

        if (time > 0) {
            problem.setAttribute("class", "hidden");
            generateQuestion();
        }
        questionShown = false;
    })
    answer4.addEventListener("click", function(e){
        if (questions[i].answer4[1] == true) {
            displayCorrect("correct!");
        }
        else {
            time = time - 5;
            displayCorrect("incorrect!");
        }

        if (time > 0) {
            problem.setAttribute("class", "hidden");
            generateQuestion();
        }
        questionShown = false;
    })

}

function displayCorrect(evaluation) {
    var eval = document.createElement("p");
    main.appendChild(eval);
    eval.textContent = evaluation;
    setTimeout(() => {  eval.setAttribute("class", "hidden") }, 750);
}

function endGame() {

}

var questions = [
{
    question: "Which of the following is the proper CSS class selector?",
    answer1: ["#classname", false],
    answer2: ["classname", false],
    answer3: ["$classname", false],
    answer4: [".classname", true]
},
{
    question: "Which of the following is the proper CSS id selector?",
    answer1: [".classname", false],
    answer2: ["#classname", true],
    answer3: ["*classname", false],
    answer4: ["$classname", false]
},
{
    question: "How would one output a message to the dev console in order to debug or test code?",
    answer1: ["console.log('test');", true],
    answer2: ["print('test');", false],
    answer3: ["debug('test');", false],
    answer4: ["console.print('test');", false]
},
{
    question: "2 + 3 = ?",
    answer1: ["6", false],
    answer2: ["23", false],
    answer3: ["5", true],
    answer4: ["depends", false]
},
{
    question: "Which of the following is not a coding language",
    answer1: ["python", false],
    answer2: ["cobra", true],
    answer3: ["java", false],
    answer4: ["C#", false]
},
{
    question: "Which following expression returns the modulus of x and y?",
    answer1: ["x / y", false],
    answer2: ["x % y", true],
    answer3: ["x ^ y", false],
    answer4: ["x * y", false]
},
{
    question: "Which following javascript code snippet will create a div element in the html document?",
    answer1: ["document.createDiv();", false],
    answer2: ["document.createObject('div)", false],
    answer3: ["document.createElement('div')", true],
    answer4: ["document.addElement('div')", false]
}
];

