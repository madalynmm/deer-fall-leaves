//remain patient with yourself
//take an organized approach rather than a panicked one


//variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = question.length * 15;
var timerId;

//variables to reference DOM elements
var questionEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');


function startQuiz() {
    //hide start screen

    //un-hide questions section

    //start timer (high)
        //declare a variable named timerId. You will also meed to use setInterval and clockTick

    //show starting time (high)

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
        //.setAttribute (set a class="choice")
        //.textContent
        //.appendChild
    }
}


function questionClick(event) {
    var buttonEl = event.target;

    //if the clicked element is not a choice button, do nothing
    if (!buttonEl.matches('.choice')) {
        return;
    }
    //check if user guessed right or wrong with if statement
    if (true) { //replace true with conditional statement that checks if clicked choice button value is the same as the questions[currentQuestionIndex]'s answer
        
        //incorrect answer scenario

        //penalize time
        //display new time on page
    }
    else {
        //correct scenario

        //move to next question
    }
    //flash right/wrong feedback on page

    //move to next question
    currentQuestionIndex++;

    //check if we've run out of questions
    if (time <= 0 || currentQuestionIndex === questions.length) {
        quizEnd();
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


//user clicks on element containing choices (need 2 more of these)
choicesEl.onclick = questionClick;
initialsEl.onkeyup = checkForEnter;
