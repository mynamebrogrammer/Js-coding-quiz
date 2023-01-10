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
    
        clearInterval(timer);
        timer = setInterval(function () {
          if (currQuestion >= quiz.length) {
            clearInterval(timer);
            document.querySelector(".timer").innerHTML =
              "You got " +
              score +
              " out of " +
              quiz.length +
              " questions correct!";
            return;
          }
          time--;
          console.log("Timer updated: " + time);
    
          document.querySelector(".timer").innerHTML = time + "s ";
    
          if (time <= 0) {
            clearInterval(timer);
            document.querySelector(".timer").innerHTML = "Time is up!";
            return;
          }
    
          var question = quiz[currQuestion].question;
          var choices = quiz[currQuestion].choices;
          var answer = quiz[currQuestion].answer;
    
          document.querySelector(".question").innerHTML = question;
          document.querySelector(".choices").innerHTML = "";
          for (let i = 0; i < choices.length; i++) {
            document.querySelector(
              ".choices"
            ).innerHTML +=
              '<input type="radio" name="choice" value="' +
              choices[i] +
              '"> ' +
              choices[i] +
              "<br>";
          }
    
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
