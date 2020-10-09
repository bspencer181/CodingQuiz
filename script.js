//Array of quiz questions, choices, and answers
var quizQuestions = [
    //Question 1
    {text:"What is JavaScript?",
    choices:["A computer programming language","A type of biscuit","A type of coffee","The main content of a webpage"],
    answer: "A computer programming language"},
    //Question 2
    {text:"What does HTML stand for?",
    choices:["Hightext Machine Language","Hypertext Markup Language","Hypertext Markup Links","Hightext Machine Links"],
    answer: "Hypertext Markup Language"},  
    //Question 3
    {text:"Which of the following is not a naming convention?",
    choices:["camelCase","PascalCase","snake_case","ANGRY_CASE"],
    answer: "ANGRY_CASE"},  
    //Question 4
    {text:"The width of a column is based on what?",
    choices:["The number of rows","The amount of text on a page","The size of the screen the page is rendered on","The value set in the CSS"],
    answer: "The size of the screen the page is rendered on"}  
]

var currentQuestion = 0
var score =0 
var timer;
var timeLeft = 0;
var highScores= JSON.parse(localStorage.getItem("highscores")) || []


//starts the quiz when button is pressed, hides instructions and start button
document.querySelector("#startBtn").addEventListener("click",function(event){
    console.log("button pressed")
    event.preventDefault();
    document.querySelector("#instructions").classList.add("hide");
    console.log("class should be hidden")
    document.querySelector("#quiz").classList.remove("hide");
    console.log("class should be hidden")
    updateQuestions();
})
//starts timer
function start() {

    timeLeft = 60;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    next();
}

//changes question, adds or subtracts to score based on answer
for(i=0;i<document.querySelectorAll(".choice").length;i++){
    document.querySelectorAll(".choice")[i].addEventListener("click",function(event){
        event.preventDefault();
        console.log(event.target)
        console.log(event.target.innerHTML)
        if(quizQuestions[currentQuestion].answer === event.target.innerHTML && currentQuestion < quizQuestions.length ){
            currentQuestion++;
            score++
            alert("Correct!");
            document.querySelector("score")
            updateQuestions();
            return;
        }
        else{
            alert("Incorrect!")
            currentQuestion++
            updateQuestions();
            return;''
        }
        
    })
}
//pulls question and choices from array
function updateQuestions(){
    document.querySelector("#questionText").innerHTML = quizQuestions[currentQuestion].text;
    document.querySelector("#choice1").innerHTML = quizQuestions[currentQuestion].choices[0];
    document.querySelector("#choice2").innerHTML = quizQuestions[currentQuestion].choices[1];
    document.querySelector("#choice3").innerHTML = quizQuestions[currentQuestion].choices[2];
    document.querySelector("#choice4").innerHTML = quizQuestions[currentQuestion].choices[3];
}
//subtracts 10 seconds for wrong answer
function incorrect() {
    timeLeft -= 10; 
    next();
}

var finalQuestionIndex = quizQuestions.length;

function score ()  {
if (currentQuestionIndex === finalQuestionIndex){
    return score();
} 
}

//timer
var timeleft = 60;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "Time's up!";
  } else {
    document.getElementById("countdown").innerHTML = timeleft + " Seconds Remaining";
  }
  timeleft -= 1;
}, 1000);

//displays and stores highscores 
document.querySelector("#scoreBtn").addEventListener("click",function(event){
    event.preventDefault();
    var nowScore={
        name:document.querySelector("#inputField").value,
        score:score,
    }
    highScores.push(nowScore);
    localStorage.setItem("highscores",JSON.stringify(highScores))
})


//Still need:
//build out for loop to make high scores display on a  table
// timer, game ends when timer ends