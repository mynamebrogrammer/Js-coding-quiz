
$(document).ready(function () {
    var time = 60;
    var timer;
    var quiz = [
        {question: "What is the purpose of the `var` keyword in JavaScript?",
        choices: [
            "To declare a variable",
            "To assign a value to a variable",
            "To create a function",
            "To end a block of code"
        ],
        answer: "To declare a variable"
        },
        {
        question: "What is the difference between a `for` loop and a `while` loop in JavaScript?",
        choices: [
            "A `for` loop is used to execute a block of code repeatedly, while a `while` loop is used to execute a block of code a specified number of times",
            "A `for` loop is used to execute a block of code a specified number of times, while a `while` loop is used to execute a block of code repeatedly",
            "There is no difference between `for` and `while` loops in JavaScript",
            "`for` loops and `while` loops cannot be used in JavaScript"
        ],
        answer: "A `for` loop is used to execute a block of code a specified number of times, while a `while` loop is used to execute a block of code repeatedly"
        }
    ];
    function startTimer() {
        var score = 0;
        var currQuestion = 0;

        clearInterval(timer);
        timer = setInterval(function () {
            if (currQuestion >= quiz.length) {
                clearInterval(timer);
                $(".timer").html(`You got ${score} out of ${quiz.length} questions correct!`);
                return;
            }
            time--;
            console.log(`Timer updated: ${time}`);

            $(".timer").html(time + "s ");

            if (time <= 0) {
                clearInterval(timer);
                $(".timer").html("Time is up!");
                return;
            }
            

            $(".question").html(question);
            $(".choices").html("");
            for (let i = 0; i < choices.length; i++) {
                $(".choices").append(`<input type="radio" name="choice" value="${choices[i]}"> ${choices[i]}<br>`);
            }

            $(".submit-button").click(function() {
                let userAnswer = $("input[name='choice']:checked").val();

                if (userAnswer === answer) {
                    score++;
                  }
                  currQuestion++;
            });

        }, 1000);
    }

    function init() {
        $(".start-button").click(startTimer);
    }
    $(document).ready(init);
});

