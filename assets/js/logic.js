//remain patient with yourself
//take an organized approach rather than a panicked one


var currentQuestionIndex = 0;


function startQuiz () {
    //hide start screen

    //un-hide question selection
    
    //start timer (high)

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
        //.setAttribute
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
    if (true) { //replace true with conditional statement that checks if clicked choice button value is the same as the questions[current] something
        
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

    }

}

chociesEl.onclick = questionClick;
//need 3 more of these