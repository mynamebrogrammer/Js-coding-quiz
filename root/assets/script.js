document.addEventListener("DOMContentLoaded", function () {


  var time = 60;
  var timer;
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
  
  function startTimer() {
    var score = 0;
    var currQuestion = 0;
    var timerEl = document.createElement("div");
    document.body.appendChild(timerEl);

    clearInterval(timer);
    timer = setInterval(function () {
      if (currQuestion >= quiz.length) {
        clearInterval(timer);
        
        document.querySelector(".timerEl").textContent ="You got " +score +" out of " +quiz.length + " questions correct!";
        return;
      }
      time--;
      console.log("Timer updated: " + time);

      document.querySelector("timerEl").textContent = time + "s ";

      if (time <= 0) {
        clearInterval(timer);
        document.querySelector("timerEl").textContent = "Time is up!";
        return;
      }

      var question = quiz[currQuestion].question;
      var choices = quiz[currQuestion].choices;
      var answer = quiz[currQuestion].answer;

      document.querySelector(".question").textContent = question;
      document.querySelector(".choices").textContent = "";
      for (let i = 0; i < choices.length; i++) {
        document.querySelector(".choices").textContent +='<input type="button" name="choice" value="' +choices[i] + '"> ' +choices[i] +"<br>";
      }
      //create a button for each loop and the value of them
      // button will be choices [i]
      //give each button a class of choice
      //setting their values 
      //Append button as a child top choices div
      //(outside of for loop) query selecter all and create event listener for each element found with class of choice 
      document.querySelector(".submit-button").addEventListener("click", function () {
        let userAnswer = document.querySelector(
          "input[name='choice']:checked"
        ).value;

        if (userAnswer === answer) {
          score++;
        }
        currQuestion++;
      });
    }, 1000);
  }
  document.querySelector(".start-button").addEventListener("click", startTimer)

  function init() {

  }
  document.addEventListener("DOMContentLoaded", init);
});
function init() {
  document.querySelector(".start-button").addEventListener("click", startTimer);
}
