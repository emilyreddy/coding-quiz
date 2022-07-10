// declared variables
var start_btn = document.querySelector(".start_btn button");
var info_box = document.querySelector(".info_box");
var exit_btn = document.querySelector(".buttons .quit");
var continue_btn = document.querySelector(".buttons .restart");
var quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const next_btn = document.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
const scoreboard_start = result_box.querySelector(".buttons .scoreboard_btn");
const scoreboard_window = document.querySelector(".scoreboard_window");



// questions and answers section
let questions = [
    {
        number: 1,
        question: "Which company created JavaScript?",
        answer: "Netscape",
        options: ["Microsoft", "Sun Microsystems", "Oracle", "Netscape"]
    },
    {
        number: 2,
        question: "Who wrote JavaScript?",
        answer: "Brendan Eich",
        options: ["Brendan Eich", "Bill Gates", "Steve Jobs", "Marc Benioff"]
    },
    {
        number: 3,
        question: "What was the orignal name for JavaScript?",
        answer: "Mocha",
        options: ["Latte", "Mocha", "CScript", "BBscript"]
    },
    {
        number: 4,
        question: "How long did it take to write the orignal JavaScript?",
        answer: "10 days",
        options: ["10 days", "2 weeks", "2 months", "10 months"]
    },
    {
        number: 5,
        question: "JavaScript is a ____-side programming language?",
        answer: "Both",
        options: ["Client", "Server", "Both", "None"]
    },
    {
        number: 6,
        question: "Which of the following is NOT a reserved word in JavaScript?",
        answer: "undefined",
        options: ["default", "finally", "throw", "undefined"]
    },
    {
        number: 7,
        question: "Which JavaScript label catches all the values, except for the ones specified?",
        answer: "default",
        options: ["catch", "label", "try", "default"]
    },
    {
        number: 8,
        question: "Which of the following type of variable is visible only within a function where it is defined?",
        answer: "local variable",
        options: ["global variable", "local variable", "both of the above", "none of the above"]
    },
    {
        number: 9,
        question: "Which of the following function of a string object returns the calling string value converted to upper case while respecting the current locale?",
        answer: "toLocaleUpperCase()",
        options: ["toLocaleUpperCase()", "toUpperCase()", "toString()", "substring()"]
    },
    {
        number: 10,
        question: "Which of the following function of an array object removes the first element from an array and returns that element?",
        answer: "shift()",
        options: ["reverse()", "shift()", "slice()", "some()"]
    },
];



// when START QUIZ button is clicked
start_btn.onclick = function() {
    info_box.classList.add("active");
}


// when EXIT QUIZ button is clicked
exit_btn.onclick = function() {
    info_box.classList.remove("active");
}


// when CONTINUE button is clicked
continue_btn.onclick = function() {
    info_box.classList.remove("active");
    quiz_box.classList.add("active");
    showQuestions(0);
    questionCounter(1);
    startTimer(75);
}


// additional variables
let question_count = 0;
let question_number = 1;
let counter;
let userScore = 0;




// when NEXT button clicked
next_btn.onclick = function() {
    if (question_count < questions.length - 1) {
        question_count++;
        question_number++;
        showQuestions(question_count);
        questionCounter(question_number);
        // clearInterval(counter);
        // startTimer(timeValue);
    }
    else {
        console.log("Questions completed");
        showResultBox();
    }
}



// retriveing questions and answers from questions and answers section
function showQuestions(index) {
    const question_text = document.querySelector(".question_text");
    
    let question_tag = '<span>' + questions[index].number + ".   " + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>' 
                    + '<div class="option">' + questions[index].options[1] + '<span></span></div>' 
                    + '<div class="option">' + questions[index].options[2] + '<span></span></div>' 
                    + '<div class="option">' + questions[index].options[3] + '<span></span></div>';
    question_text.innerHTML = question_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}


// calculates the right or wrong answer
function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[question_count].answer;
    let allOptions = option_list.children.length;
    if (userAnswer == correctAnswer) {
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is correct");
    }
    else {
        answer.classList.add("incorrect");
        console.log("Answer is wrong");

        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correctAnswer) {
                    option_list.children[i].setAttribute("class", "option correct");
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
}




// once all the questions are answered or time runs out
function showResultBox() {
    info_box.classList.remove("active");
    quiz_box.classList.remove("active");
    result_box.classList.add("active");
    console.log("show result box")
    console.log(userScore * 100);
    const scoreText = result_box.querySelector(".score_text");
    let scoreTag = '<div class="score_text"> Your final score is ' + userScore * 100 + ' points</div>';
    scoreText.innerHTML = scoreTag;
}



// for the countdown timer
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "0";
            showResultBox();
        }
    }
}   


// for displaying the point total
function questionCounter(index) {
    const bottom_question_counter = quiz_box.querySelector(".total_questions");
    let totalQuestionsCountTag = '<p> Your current score is  ' + userScore * 100 + ' points</p>';
    bottom_question_counter.innerHTML = totalQuestionsCountTag;
}



// restarts the quiz
quit_quiz.onclick = function() {
    window.location.reload();
}



// brings up the scoreboard window
scoreboard_start.onclick = function() {
    result_box.classList.remove("active");
    scoreboard_window.classList.add("active");
}



// declared variables for storing scores
var element = document.getElementById("save_score_btn");
var firstPlace = document.querySelector('#first_place');
var secondPlace = document.querySelector('#second_place');
var thirdPlace = document.querySelector('#third_place');
var fourthPlace = document.querySelector('#fourth_place');
var fifthPlace = document.querySelector('#fifth_place');


element.addEventListener('click', scoreSave);



function scoreSave(event) {
    var playerName = document.querySelector("#player_name_input").value;
      var playerScore = {
      player: playerName,
      score: userScore * 100,
      }
    localStorage.setItem('playerScore', JSON.stringify([playerScore]));
    savedScores.push(playerScore);
    localStorage.setItem('playerScore', JSON.stringify(savedScores))
    location.reload()
}
  

var savedScores = JSON.parse(localStorage.getItem('playerScore')); 


if (savedScores === null) {savedScores = [];}

  
savedScores.sort(function(a, b){return b.score-a.score});
  
  
// prints values to the scoreboard
firstPlace.textContent = (`${savedScores[0].player} -- ${savedScores[0].score} points`)
secondPlace.textContent = (`${savedScores[1].player} -- ${savedScores[1].score} points`)
thirdPlace.textContent = (`${savedScores[2].player} -- ${savedScores[2].score} points`)
fourthPlace.textContent = (`${savedScores[3].player} -- ${savedScores[3].score} points`)
fifthPlace.textContent = (`${savedScores[4].player} -- ${savedScores[4].score} points`)







