var time = 60;
var quiz = [
  {
    question:
      "What is the purpose of the `var` keyword in JavaScript?",
    choices: [
      "To declare a variable",
      "To assign a value to a variable",
      "To create a function",
      "To end a block of code"
    ],
    answer: "To declare a variable"
  },
  {
    question:
      "What is the difference between a `for` loop and a `while` loop in JavaScript?",
    choices: [
      "A `for` loop is used to execute a block of code repeatedly, while a `while` loop is used to execute a block of code a specified number of times",
      "A `for` loop is used to execute a block of code a specified number of times, while a `while` loop is used to execute a block of code repeatedly",
      "There is no difference between `for` and `while` loops in JavaScript",
      "`for` loops and `while` loops cannot be used in JavaScript"
    ],
    answer:
      "A `for` loop is used to execute a block of code a specified number of times, while a `while` loop is used to execute a block of code repeatedly"
  }
];
var timer = document.querySelector("timer");
var scoresDiv = document.querySelector("scores-div");
var viewScores = document.querySelector("view-scores");
var startbtn = document.querySelector("start-button");
startbtn.addEventListener("click", startTimer);

var questionDiv = document.querySelector("question-div");
var results = document.querySelector("results");
var choices = document.querySelector("choices");
var emptyArray = [];
var storedArray = JSON.parse(window.localStorage.getItem("highScores"));

var questionCount = 0;

var score = 0


function startTimer() {
  var score = 0;
  displayQuestions();
  var timerInterval = setInterval(function () {
    time--;
    timer.textContent = "";
    timer.textContent = "Time: " + time;
    if (time <= 0 || questionCount === quiz.length) {
      clearInterval(timerInterval);
      saveScore();
    }
  }, 1000);
  function displayQuestions() {
    removeEls(startbtn);

    if (questionCount < quiz.length) {
      questionDiv.textContent = quiz[questionCount].title;
      choices.textContent = "";

      for (let i = 0; i < quiz[questionCount].choices.length; i++) {
        var el = document.createElement("button");
        el.children = quiz[questionCount].choices[i];
        el.setAttribute("data-id", i);
        el.addEventListener("click", function (event) {
          event.stopPropagation();

          if (el.children === quiz[questionCount].answer) {
            score += time;
          } else {
            score -= 10;
            time -= 15;
          }

          questionDiv.textContent = "";

          if (questionCount === quiz.length) {
            return;
          } else {
            questionCount++;
            displayQuestions();
          }
        });
        choices.append(el);
      }
    }
  }
  function saveScore() {
    timer.remove();
    choices.textContent = "";

    var initials = document.createElement("input");
    var postScore = document.createElement("input");

    results.children = 'you scored ' + score + 'points! Enter your initials: ';
    initials = setAttribute("type", "text");
    postScore = setAttribute("type", "button");
    postScore = setAttribute("value", "Post My Score!");

    postScore.addEventListener("click", function (event) {
      event.preventDefault();
      var scoresArray = defineScoresArray(storedArray, emptyArray);

      var initialsInput = initials.value;
      var saved = {
        initialsInput: initialsInput, score: score,
      };
      scoresArray.push(saved);
      saveScore(scoresArray);
      displayAllScores();
      clearScoresBtn();
      goBackBtn();
      viewScores.remove();
    });
    results.append(initials);
    results.append(postScore);
  }
  var saveScore = (Array) => {
    window.localStorage.setItem("highScores", JSON.stringify(array));

  }
  var defineScoresArray = (arr1, arr2) => {
    if (arr1 !== null) {
      return arr1
    } else {
      return arr2
    }
  }
  var removeEls = (...els) => {
    for (var el of els) el.remove();
  }
  function displayAllScores() {
    removeEls(timer, startbtn, results);
    var scoresArray = defineScoresArray(storedArray, emptyArray);

    scoresArray.forEach(obj => {
      var initials = obj.initials;
      var storedScore = obj.score;
      var resultsP = document.createElement("p");
      resultsP.innerText = `${initials}: ${storedScore}`;
      scoresDiv.append(resultsP);
    });
  }
  function viewScores() {
    viewScores.addEventListener("click", function (event) {
      event.preventDefault();
      removeEls(timer, startbtn);
      displayAllScores();
      removeEls(viewScores);
      clearScoresBtn();
      goBackBtn();
    });
  }
  function clearScoresBtn() {
    var clearBtn = document.createElement("input");
    clearBtn.setAttribute("type", "button");
    clearBtn.setAttribute("value", "Clear Scores");
    clearBtn.addEventListener("click", function (event) {
      event.preventDefault();
      removeEls(scoresDiv);
      window.localStorage.removeItem("highScores");
    })
    scoresDiv.append(clearBtn)
  }
  function goBackBtn() {
    var backBtn = document.createElement("input");
    backBtn.setAttribute("type", "button");
    backBtn.setAttribute("value", "Go Back");
    backBtn.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.reload();
    })
    buttonsDiv.append(backBtn)
  }
  viewScores();
  //create a button for each loop and the value of them
  // button will be choices [i]
  //give each button a class of choice
  //setting their values 
  //Append button as a child top choices div
  //(outside of for loop) query selecter all and create event listener for each element found with class of choice 
}