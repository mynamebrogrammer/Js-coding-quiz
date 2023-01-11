// a variable for start time
var secondsLeft = 60;
var questions = [
    {
      title: "An array's length can be evaluated with the what property?",
      multiChoice: [".length", ".log", "the console", ".loop"],
      answer: ".length"
    },
  
    {
      title: "Within a loop, the 'break' keyword may be used to do what?",
      multiChoice: ["break your competitors code", "exit the loop immediately", "repeat the loop", "indicate a stopping condition"],
      answer: "exit the loop immediately"
    },
  
    {
      title: "Properties in a JavaScript oject are often refferred to as what?",
      multiChoice: ["dot walking", "key-value pairs", "nested properties", "undefined"],
      answer: "key-value pairs"
    },
  
    {
      title: "Which array method inserts an element at the end of the array?",
      multiChoice: [".pop()", ".push()", ".length", ".join()"],
      answer: ".push()"
    },
  
    {
      title: "What is a callback function?",
      multiChoice: ["a function that accepts an array as an argument", "I function that performs an HTTP request", "a data type similar to a string or a boolean", "a function that is passed into another function as an argument"],
      answer: "a function that is passed into another function as an argument"
    }
  ];

//the element that displays the time
var timer = document.getElementById("timer");

//div for high scores
var scoresDiv = document.getElementById("scores-div");

var buttonsDiv = document.getElementById("buttons")

//button for high scores
var viewScoresBtn = document.getElementById("view-scores")

//start button div
var startButton = document.getElementById("start-button");
startButton.addEventListener("click", setTime);


// variable for the questions title
var questionDiv = document.getElementById("question-div");

// div to hold the results
var results = document.getElementById("results");

// div for the choices
var choices = document.getElementById("choices");


// an array to store high scores
var emptyArray = [];

// the array of high scores from local storage
var storedArray = JSON.parse(window.localStorage.getItem("highScores"));

// keeping track of which question we're on
var questionCount = 0;

//keeping score
var score = 0

//Timer starts when the user clicks startButton (see above).
function setTime() {
  displayQuestions();
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "";
    timer.textContent = "Time: " + secondsLeft;
    if (secondsLeft <= 0 || questionCount === questions.length) {
      clearInterval(timerInterval);
      captureUserScore();
    } 
  }, 1000);
}

//function to load the questions on the page
function displayQuestions() {
  removeEls(startButton);

  if (questionCount <= questions.length) {
    questionDiv.innerHTML = questions[questionCount].title;
    choices.textContent = "";

    for (var i = 0; i < questions[questionCount].multiChoice.length; i++) {
      var el = document.createElement("button");
      el.innerText = questions[questionCount].multiChoice[i];
      el.setAttribute("data-id", i);
      el.addEventListener("click", function (event) {
        event.stopPropagation();

        if (event.target,this.innerText === questions[questionCount].answer) {
          score += secondsLeft;
        } else {
          score -= 10;
          secondsLeft = secondsLeft - 15;
        }
        
        questionDiv.innerHTML = "";

        if (questionCount === questions.length) {
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


function captureUserScore() {
  timer.remove();
  choices.textContent = "";
  questionDiv.textContent = "";

  var initialsInput = document.createElement("input");
  var postScoreBtn = document.createElement("input");

  results.innerHTML = `You scored ${score} points! Enter initials: `;
  initialsInput.setAttribute("type", "text");
  postScoreBtn.setAttribute("type", "button");
  postScoreBtn.setAttribute("value", "Post My Score!");
  postScoreBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var scoresArray = defineScoresArray(storedArray, emptyArray);

    var initials = initialsInput.value;
    var userAndScore = {
      initials: initials,
      score: score,
    };
  
    scoresArray.push(userAndScore);
    saveScores(scoresArray);
    displayAllScores();
    clearScoresBtn();
    goBackBtn();
    viewScoresBtn.remove();
  });
  initialsInput.addEventListener("keydown", function (event) {
    
    if (event.key === "Enter") {
      var scoresArray = defineScoresArray(storedArray, emptyArray);

    var initials = initialsInput.value;
    var userAndScore = {
      initials: initials,
      score: score,
    };
  
    scoresArray.push(userAndScore);
    saveScores(scoresArray);
    displayAllScores();
    clearScoresBtn();
    goBackBtn();
    viewScoresBtn.remove();
    }
      
  })
  results.append(initialsInput);
  results.append(postScoreBtn);
}

const saveScores = (array) => {
  window.localStorage.setItem("highScores", JSON.stringify(array));
}

const defineScoresArray = (arr1, arr2) => {
  if(arr1 !== null) {
    return arr1
  } else {
    return arr2
  }
}

const removeEls = (...els) => {
  for (var el of els) el.remove();
}

function displayAllScores() {
  removeEls(timer, startButton, results);
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
  viewScoresBtn.addEventListener("click", function(event) {
    event.preventDefault();
    removeEls(timer, startButton);
    displayAllScores();
    removeEls(viewScoresBtn);
    clearScoresBtn();
    goBackBtn();
  });
}

function clearScoresBtn() {    
  var clearBtn = document.createElement("input");
  clearBtn.setAttribute("type", "button");
  clearBtn.setAttribute("value", "Clear Scores");
  clearBtn.addEventListener("click", function(event){
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
  backBtn.addEventListener("click", function(event){
    event.preventDefault();
    window.location.reload();
  })
  buttonsDiv.append(backBtn)
}


viewScores();