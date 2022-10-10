// add variables to be called
var startBtn = document.querySelector("#start");
var timerEl = document.querySelector("#time");

// add function that is triggered when 'start quiz' button is hit
    // this function will start the timer
    // and open up the questions of the quiz
function startQuiz () {
    
    var timeLeft = 30;

    var timeInterval = setInterval(function() {

        if (timeLeft > 1) {
            timerEl.textContent = timeLeft + " seconds remaining.";
            timeLeft--;
        }
        else if (timeLeft === 1) {
            timerEl.textContent = timeLeft + ' second remaining.';
            timeLeft--;
        } 
        else {
            timerEl.textContent = "";
            clearInterval(timeInterval);

        }

    }, 1000);
    
}


// when question is answered, then the next question comes up
// question answers will add to score 
// wrong answers will detract from score AND reduce timer amount

// when all questions are answered, OR timer reaches 0, game ends

// when game ends, you can save your initials and score
    // when you submit, highscore page appears with saved data on highscores


// when you click a question answer, 'correct' or 'wrong' appears below the options

// event listener for buttons clicked:
startBtn.addEventListener("click", startQuiz);
