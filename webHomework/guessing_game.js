var audio = [document.getElementById("correctGuess"),
             document.getElementById("tooLow"),
             document.getElementById("tooHigh"),
             document.getElementById("outOfGuesses"),
             document.getElementById("tick"),
             document.getElementById("startGame")];

var numGuesses = 7;
var target_number = Math.floor((Math.random() * 100) + 1);
console.log(target_number);
var winner = false;
var time_till_next = 5;
var heart = "<img src='guess_images/heart_life.gif'>"
var last_try = "<img src='guess_images/last_try.gif'>"
startTime();
displayHearts();

function startGame(){
    audio[5].play();
    numGuesses = 7;
    target_number = Math.floor((Math.random() * 100) + 1);
    document.getElementById("game_timer").innerHTML = "";
    document.getElementById("status").innerHTML = "Guess a Number!";
    document.getElementById("guesses").innerHTML= "You have " + numGuesses + " lives left!";
    displayHearts();
    winner = false;
}

function countDown(){
    //start of code referenced from James McDowell
    //https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown
    var next_game_timer = setInterval(function(){
        if(time_till_next < 1){
            clearInterval(next_game_timer);
            //next line added to reset the timer
            time_till_next = 6;
            startGame();
        } else {
            //next two lines modified to play sound and display "second till next game" after timer
            audio[4].play();
            document.getElementById("game_timer").innerHTML = time_till_next + " second(s) till next game";
        }
        time_till_next -= 1;
      }, 1000);
    //end of code referenced from James McDowell
}

function displayHearts(){
    var lives = "";
    if(numGuesses > 0){
        for(var i = 0; i < numGuesses; i++){
            lives += heart;
        }
    }else{
        lives = last_try;
    }
    document.getElementById("lives").innerHTML = lives;
}

function guessResponse(){
    document.getElementById("guess").focus();
    var guess = document.getElementById("guess").value;
    document.getElementById("guess").value = "";
    if(winner != true){
        if(numGuesses > 0){
            if(guess > target_number){
                numGuesses--;
                audio[2].play();
                document.getElementById("status").innerHTML = "That guess was too high! Try again.";
                document.getElementById("guesses").innerHTML= "You have " + numGuesses + " lives left!";
            }
            else if(guess < target_number){
                numGuesses--;
                audio[1].play();
                document.getElementById("status").innerHTML = "That guess was too low! Try again.";
                document.getElementById("guesses").innerHTML= "You have " + numGuesses + " lives left!";
            }
            else if(guess == target_number){
                audio[0].play();
                document.getElementById("guesses").innerHTML= "You won with " + numGuesses + " lives left!";
                document.getElementById("status").innerHTML = "The correct number was "+target_number+"! Good job!";
                winner = true;
                countDown();
            }
            displayHearts();

        }else if(numGuesses == 0 && guess != target_number){
            audio[3].play();
            document.getElementById("guesses").innerHTML= "You have 0 lives left!";
            document.getElementById("status").innerHTML = "Sorry pal, the number was "+ target_number + ". You'll get it right next time!";
            numGuesses--;
            countDown();
            //
        }else if(numGuesses < 0 && guess!= target_number){
            document.getElementById("guesses").innerHTML= "No more guesses left pal :/ Wait for the game to restart!";
        }else if(numGuesses == 0 && guess == target_number){
            audio[0].play();
            document.getElementById("guesses").innerHTML= "You won with " + numGuesses + " lives left!";
            document.getElementById("status").innerHTML = "The correct number was "+target_number+"! Good job!";
            winner = true;
            countDown();
        }
        console.log(numGuesses);
    }else{ 
        document.getElementById("guesses").innerHTML= "You already won pal! Wait for the next game to start!";
       
    }
}
//start of code referenced from w3schools
//https://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    //next line added to display 12 hour instead of 24 hour clock
    h = checkHour(h)
    m = checkTime(m);
    s = checkTime(s);
    //next line modified fo include "Current Time: " as part of the screen
    document.getElementById('time').innerHTML = "Current Time: " + h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
  }
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }
  //next 9 lines added in order to create a method to display 12 hour clock
  function checkHour(i){
      if(i > 12) {
          i -=12
      }
      if(1 < 10){
          i = "0" + i;
      }
      return i;
  }
//end of code reference from w3schools