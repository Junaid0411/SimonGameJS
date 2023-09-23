let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

var started = false;
let level = 0;

$(document).keypress(function() {
     if (!started) {
       $("#level-title").text("Level " + level);
       nextSequence();
       started = true;
     }
   });

$(".btn").click(function() {

     let userChosenColor = $(this).attr("id");
     userClickedPattern.push(userChosenColor);

     playSound(userChosenColor);
     animatePress(userChosenColor);
     checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
     userClickedPattern = [];
     level++;

     $("#level-title").text("Level " + level);

     let randomNumber = Math.floor(Math.random() * 4);
     let randomChosenColour = buttonColours[randomNumber];
     gamePattern.push(randomChosenColour);

     $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
     playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
     if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
          console.log("success");
          if(userClickedPattern.length === gamePattern.length) {
               setTimeout(function () {
                    nextSequence();
               }, 1000);
          }
     } else {
          console.log("wrong");
          let wrongAudio = new Audio("sounds/wrong.mp3");
          wrongAudio.play();
          $("body").addClass("game-over");
          setTimeout(function () {
               $("body").removeClass("game-over")
          }, 200);
          $("h1").text("Game Over, Press Any Key to Restart");
          startOver();
     }
}

function startOver() {
     level = 0;
     gamePattern = [];
     started = false;

}

function playSound(name) {
     let audio = new Audio("sounds/" + name + ".mp3");
     audio.play();
}

function animatePress(currentColor) {
     $('#' + currentColor).addClass("pressed");
     setTimeout(function () {
          $("#" + currentColor).removeClass("pressed")
     }, 100);
}
