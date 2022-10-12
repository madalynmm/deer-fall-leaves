//variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

//variables to reference DOM elements
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');


function startQuiz() {
    //hide start screen
    var startScreenEl = document.getElementById('start-screen');
    startScreenEl.setAttribute('class', 'hide');

    //un-hide questions section
    questionsEl.removeAttribute('class');

    //start timer (high) - declare a variable named timerId. You will also meed to use setInterval and clockTick
    timerId = setInterval(clockTick, 1000);

    //show starting time (high)
    timerEl.textContent = time;

    getQuestion();
}


function getQuestion() { //this function is going to get the data from the questions array
    //get current question object from array  
    var currentQuestion = questions[currentQuestionIndex];

    //update title with current question
    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;

    //clear out any old question choices
    choicesEl.innerHTML = ''; //study this later

    //create a for loop that creates the choice elements
    for (var i=0; i < currentQuestion.choices.length; i++) {
        //create new button for each choice
        //.createElement
        var choiceBtn = document.createElement('button');
        //.setAttribute (set a class="choice") 
        choiceBtn.setAttribute('class', 'choice');
        //.textContent
        choiceBtn.textContent = currentQuestion.choices[i];
        //.appendChild
        var choiceList = document.getElementById('choices');
        choiceList.appendChild(choiceBtn);
    }
}


function questionClick(event) {
    var buttonEl = event.target;
    var correctAnswer = questions[currentQuestionIndex].answer; 

    //if the clicked element is not a choice button, do nothing
    if (!buttonEl.matches('.choice')) {
        return;
    }
    /*check if user guessed right or wrong with if statement 
        - replace true with conditional statement that checks if clicked choice button value 
        is the same as the questions[currentQuestionIndex]'s answer */
    if (buttonEl.textContent !== correctAnswer) { 
        //incorrect answer scenario - flash 'wrong' on screen
        feedbackEl.textContent = "Wrong";
        //penalize time
        time -= 15;   
        if (time < 0) {
            time = 0;
        }
        //display new time on page
        timerEl.textContent = time;
    }
    else {
        //correct scenario
        feedbackEl.textContent = "Right!";
    }
    //flash right/wrong answer
    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function () {
        feedbackEl.setAttribute('class', 'feedback hide');
    }, 2000);

    //move to next question
    currentQuestionIndex++;        

    //check if we've run out of questions
    if (time <= 0 || currentQuestionIndex === questions.length) {
        quizEnd();
        feedbackEl.setAttribute('class', 'hide');
    }
    else {
        getQuestion();
    }
}


function quizEnd() {
    //stop timer
    clearInterval(timerId);

    //show end screen
    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');

    //show final score
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = time;

    //hide questions sections
    questionsEl.setAttribute('class', 'hide');
}


function clockTick() {
    //update time
    time--;
    timerEl.textContent = time;

    //check if user ran out of time
    if (time <= 0) {
        quizEnd();
    }
}


function saveHighscore() {
    //get value of input box
    var initials = initialsEl.value.trim();

    //make sure value wasn't empty
    if (initials !== '') {

        //JSON.parse
        //get saved scores from localstorage (highscores), or if not any, set to empty array
        var highscores = 
            JSON.parse(window.localStorage.getItem('highscores')) || [];

        //format new score object for current user
        var newScore = {
            score: time,
            initials: initials,
        };

        //save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem('highscores', JSON.stringify(highscores));

        //redirect to next page
        window.location.href = 'highscores.html';
    }
}


function checkForEnter(event) {
    //'13' represents the enter key
    if (event.key === 'Enter') {
        saveHighscore();
    }
}

//user clicks button to start quiz
startBtn.onclick = startQuiz;

//user clicks on element containing choices (need 2 more of these)
choicesEl.onclick = questionClick;

//user clicks enter to record initials
initialsEl.onkeyup = checkForEnter;

//user clicks button to submit initials
submitBtn.onclick = saveHighscore;