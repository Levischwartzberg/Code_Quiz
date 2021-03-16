var main = document.body;

var opener = document.createElement("div");
var problems = document.createElement("div");
var header = document.createElement("h1");
var message = document.createElement("p");
var startButton = document.createElement("button");

var score = 0;

main.appendChild(opener);
main.appendChild(problems);
opener.appendChild(header);
opener.appendChild(message);
opener.appendChild(startButton);

opener.setAttribute("class", "start");
header.textContent = "Coding Quiz";
message.textContent = "Welcome to the coding quiz. Hit the start button to begin answering as many multiple choice questions as you can in the time alloted. Each wrong answer will subract from your time."
startButton.textContent = "Start Quiz";

startButton.addEventListener("click", function(e) {
    //console.log("test");
    opener.setAttribute("class", "hidden");
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
var time = 50;

function startCountdown() {
    var timerInterval = setInterval(function(e) {
        time--;
        timer.textContent = "Time Remaining: " + time;

        if(time < 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls endGame function
            endGame();
          }
    }, 1000)
}

function generateQuestion() {
    //console.log("test");
    questionShown = true;

    let problem = document.createElement("div");
    problems.appendChild(problem);
    problem.setAttribute("class", "question");

    let i = Math.floor(Math.random() * questions.length);
    //console.log(i);
    //console.log(questions);
    //console.log(questions[i].question);

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
            score++;
        }
        else {
            time = time - 5;
            displayCorrect("incorrect!");
        }

        if (time > 0) {
            problem.setAttribute("class", "hidden");
            questions.splice(i,1);
            generateQuestion();
        }
        questionShown = false;
    })
    answer2.addEventListener("click", function(e){
        if (questions[i].answer2[1] == true) {
            displayCorrect("correct!");
            score++;
        }
        else {
            time = time - 5;
            displayCorrect("incorrect!");
        }

        if (time > 0) {
            problem.setAttribute("class", "hidden");
            questions.splice(i,1);
            generateQuestion();
        }
        questionShown = false;
    })
    answer3.addEventListener("click", function(e){
        if (questions[i].answer3[1] == true) {
            displayCorrect("correct!");
            score++;
        }
        else {
            time = time - 5;
            displayCorrect("incorrect!");
        }

        if (time > 0) {
            problem.setAttribute("class", "hidden");
            questions.splice(i,1);
            generateQuestion();
        }
        questionShown = false;
    })
    answer4.addEventListener("click", function(e){
        if (questions[i].answer4[1] == true) {
            displayCorrect("correct!");
            score++;
        }
        else {
            time = time - 5;
            displayCorrect("incorrect!");
        }

        if (time > 0) {
            problem.setAttribute("class", "hidden");
            questions.splice(i,1);
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
    problems.setAttribute("class", "hidden");
    timer.setAttribute("class", "hidden");
    alert("Time's Up!!!");
    endgame.setAttribute("class", "highscore_form");
    highscore_form.innerHTML = `
    <form method="POST">
        <p> You scored ${score} </p>
        <div class="input">
        <label for="player_name">Player Name</label>
        <input type="text" name="player_name" id="player_name" placeholder="participant name" />
        </div>
        <button id="submit">Enter Score</button>
    </form>`;
    
    var submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
      
        var previous = JSON.parse(localStorage.getItem("username"));
        //console.log(previous);
        var userScores = [];
        if (previous != null) {
            userScores.push(previous);
        }
        //console.log(userScores);
        //console.log(typeof(userScores));

        var username = document.getElementById("player_name").value;
        var userScore = [username, score];
        userScores.push(userScore);
        var userScoresStr = (JSON.stringify(userScores));
        //console.log(userScoresStr);

        localStorage.setItem("username", userScoresStr);
        highscore_form.setAttribute("class", "hidden");
        opener.setAttribute("class", "start");
        endgame.setAttribute("class", "hidden");
        time = 50;
    });
}

var endgame = document.createElement("div");
main.appendChild(endgame);
endgame.setAttribute("class", "hidden");
var highscore_form = document.createElement("form");
endgame.appendChild(highscore_form);

//The viewHighscores button toggles between showing and hiding the highscores div 
var viewHighscores = document.getElementById("view_highscores");

var highscores = document.createElement("div");
    highscores.setAttribute("class", "hidden");

viewHighscores.addEventListener("click", function(e){
    main.appendChild(highscores);
    //If the highscores are hidden, the highscores is shown, and the names/scores combo is looped over and added in p tags
    if (highscores.className == "hidden") {
        highscores.setAttribute("class", "highscores"); 
        highscoresArray = [];

        highscoresStr = JSON.parse(localStorage.getItem("username")).toString();
    
        var highscoresArray = highscoresStr.split(",");
        highscoresArray = orderArray(highscoresArray);
        
        for (i = 0; i < highscoresArray.length; i++) {
            var userScore = document.createElement("p");
            userScore.setAttribute("id", "highscores");
            highscores.appendChild(userScore);
            userScore.innerHTML = `<p> Name: ${highscoresArray[i].user} &nbsp; &nbsp; Score: ${highscoresArray[i].points} </p>`
        }
    }
    else if (highscores.className == "highscores") {
        //Highscores is hidden and emptied if the highscores button is clicked while the highscores are showing.
        highscores.innerHTML = `<div> </div>`
        highscores.setAttribute("class", "hidden");
        highscoresArray = [];
    }
})

function orderArray(array) {
    objected = [];
    for (i = 0; i < array.length; i = i + 2) {
        let userPlusScore = {
            user: array[i],
            points: parseInt(array[i+1])
        }
        objected.push(userPlusScore);
        //console.log(objected);
    }
    function compare(a, b) {
        let num1 = a.points;
        let num2 = b.points;

        let comparison = 0;
        if (num1 < num2) {
            comparison = 1;
        } else if (num1 > num2) {
            comparison = -1;
        }
        return comparison;
    }
    objected.sort(compare);
    //console.log(objected);
    return objected;
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
    answer1: [".idname", false],
    answer2: ["#idname", true],
    answer3: ["*idname", false],
    answer4: ["$idname", false]
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
},
{
    question: "What following snippet properly initializes a for loop to run as long as the array length?",
    answer1: ["for (i < array.length) {};", false],
    answer2: ["for (i = 0; i < array.length; i++) {};", true],
    answer3: ["for (i = 0; i > array.length; i++) {};", false],
    answer4: ["for (i = 0; i > array.length) {};", false]
},
{
    question: "Which following loop operates as long as time is greater than zero?",
    answer1: ["while (time isGreaterThan(0)) {}", false],
    answer2: ["for (time > 0) {}", false],
    answer3: ["for (time isGreaterThan(0)) {}", false],
    answer4: ["while (time > 0) {}", true]
},
{
    question: "Which of the following is not a javascript data type?",
    answer1: ["boolean", false],
    answer2: ["number", false],
    answer3: ["name", true],
    answer4: ["string", false]
},
{
    question: "9 % 4 = ?",
    answer1: ["1", true],
    answer2: ["2.25", false],
    answer3: ["2", false],
    answer4: ["3", false]
},
{
    question: "Which of the following expressions is false?",
    answer1: ["true || false", false],
    answer2: ["!(false)", false],
    answer3: ["!(3 === 2)", false],
    answer4: ["false || false", true]
},
{
    question: "Which of the following expressions is true?",
    answer1: ["false || false", false],
    answer2: ["true || false", true],
    answer3: ["false && false", false],
    answer4: ["true && false", false]
},
{
    question: "Which of the following is valid CSS styling for a dashed red border with a width of 2x?",
    answer1: ["border: 2px red dashed;", true],
    answer2: ["border-style: 2px red dashed;", false],
    answer3: ["border-style: width(2px), color(red), decoration(dashed);", false],
    answer4: ["border; 2px red dashed:", false]
},
{
    question: "Which method attaches an element within an existing html element in javascript?",
    answer1: ["element.attach(newElement);", false],
    answer2: ["element.add(newElement);", false],
    answer3: ["element.join(newElement);", false],
    answer4: ["element.appendChild(newElement);", true]
},
{
    question: "Which of the following is an example of proper javascript function declaration?",
    answer1: ["myFunction = {}", false],
    answer2: ["function myFunction = {}", false],
    answer3: ["function myFunction() {}", true],
    answer4: ["function myFunction() = {}", false]
},
{
    question: "Which following array splice method and result are correct for var array = [1,2,3,4,5]?",
    answer1: ["array.splice(2,1); //array=[1,2,4,5]", true],
    answer2: ["array.splice(2,1); //array=[3,4,5]", false],
    answer3: ["array.splice(1,0); //array=[1,3,4,5]", false],
    answer4: ["array.splice(5,1); //array=[1,2,3,4]", false]
},
{
    question: "Which array method is used to add a new element to the end of the array?",
    answer1: ["array.add();", false],
    answer2: ["array.addNew();", false],
    answer3: ["array.append();", false],
    answer4: ["array.push();", true]
},
{
    question: "Which of the following would not return 0 for the array [0,1,2,3,4,5]?",
    answer1: ["return array[0];", false],
    answer2: ["return array.unshift();", true],
    answer3: ["return array.shift();", false],
    answer4: ["return array.splice(0,1)", false]
},
{
    question: "Which array method is used to add a new element to the beginning of an array?",
    answer1: ["array.unshift();", true],
    answer2: ["array.add();", false],
    answer3: ["array.shift();", false],
    answer4: ["array[0] = new_value;", false]
}
];

