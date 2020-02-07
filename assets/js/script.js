var startButton = document.getElementById("start");
var contentArea = document.getElementById("content")
var timer = document.getElementById("timer")
var count = 0
var secondsLeft = 60;
function endGame() {
    console.log('game over');
    clearInterval(window.intervalId);
    showLeaderBoard("nalsndf","sdfsdf");
    // WriteLeaderBoard();
    // SaveScoreToStorage();
}
function questionCheck(answer){
    // console.log(answer)
    // console.log(questions[count].choices[answer] === questions[count].answer);
    var IsCorrect = questions[count].choices[answer] === questions[count].answer;

    if (IsCorrect) {
        // alert("Correct");
    } else {
       secondsLeft = secondsLeft - 10;
    }
    count++
    if(count === questions.length){
        endGame();
    } else{ 
        showQuestions();
    }
}                              
function showQuestions() {
    contentArea.innerHTML = ""

    var questionText = document.createElement("h1")

    questionText.textContent = questions[count].title
    contentArea.appendChild(questionText)

    var questionList = document.createElement("ul")

    questionList.setAttribute('class', "list-unstyled")

    for (let i = 0; i < questions[count].choices.length; i++) {
        var currentChoice = document.createElement("li")
        currentChoice.innerHTML = '<button onclick="questionCheck('+i+')">'+questions[count].choices[i]+'</button>'
        questionList.appendChild(currentChoice)
    }
    contentArea.appendChild(questionList)
}

function showLeaderBoard() {
    var userName = prompt("New High Score :: Enter your Initials.");
    var score = timer.innerText;
    var html = "<h1>Leaderboard</h1><span>"+userName+" :: "+score+" </span>";
    contentArea.innerHTML = html;
    
    saveScore(userName, score);
    
}

function saveScore(userName, score) {
    var leaderBoard = JSON.parse(localStorage.getItem("leaderboard"));
    
    var scoreObj = {
        name: userName,
        score: score
    }

    // https://stackoverflow.com/questions/10430279/extending-an-object-in-javascript - Spread?
    // var newLeaderboard = Object.assign(leaderBoard, scoreObj) // keeps overwriting with latest

    
    localStorage.setItem("leaderboard", JSON.stringify(scoreObj));
}

function updateTime(number) {
    document.getElementById("timer").innerText = number;
}

function start() {
    console.log("click")
    showQuestions()
    setTime()
}


function setTime() {
    
    window.intervalId = setInterval(function() {
      secondsLeft--;
        updateTime(secondsLeft)
      console.log(secondsLeft)
        document.getElementById("timer")
      if(secondsLeft === 0) {
        clearInterval(intervalId);
         sendMessage();
      }
    }, 1000);
}

function sendMessage() {
    var highscore = prompt("enter your name here") 
    console.log(highscore)

    
     // timeEl.textContent = " ";
      // var imgEl = document.createElement("img");
      // document.body.style = "background: red";
      // imgEl.setAttribute("src", "images/image_1.jpg");
      // mainEl.appendChild(imgEl);
    
    }




startButton.addEventListener("click", start);