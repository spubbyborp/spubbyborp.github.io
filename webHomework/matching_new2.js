var card_front = "<img src='match_images/front_image.png' class='card'>";
let card_images = ["<img src='match_images/image1.png' class='card'>",
                   "<img src='match_images/image2.png' class='card'>",
                   "<img src='match_images/image3.png' class='card'>",
                   "<img src='match_images/image4.png' class='card'>",
                   "<img src='match_images/image5.png' class='card'>",
                   "<img src='match_images/image6.png' class='card'>",
                   "<img src='match_images/image7.png' class='card'>",
                   "<img src='match_images/image8.png' class='card'>",
                   "<img src='match_images/image9.png' class='card'>",
                   "<img src='match_images/image10.png' class='card'>",
                   "<img src='match_images/image11.png' class='card'>",
                   "<img src='match_images/image12.png' class='card'>"
                  ];
let table = document.getElementById("matching-game");
var preview = document.getElementById("preview");
var num_pics = 10;
let shuffled_deck;
let status;
myAudio = new Audio('match_files/match_song.wav');
myAudio.loop = true;

function playSong(){
    myAudio.play();
}

function pauseSong(){
    myAudio.pause();
}

let game_col;

createGame();
//game play

const test_table = document.querySelector('table#matching-game');
console.log(test_table);
const rows = document.querySelectorAll('tr');
console.log(rows);
const rowsArray = Array.from(rows);
console.log(rowsArray);
let count = 0;
let match = "";
let prev = new Array(3);
let current = new Array(3);
let score = 0;
let matched_set = new Set();
let time_till_next;
let timer = 3;
let prevItem;
let currItem;

function createGame(){
    shuffled_deck = createDeck();
    startGame();
    var pTime = 0;

    if(num_pics == 8){
        pTime = 3;
    }
    if(num_pics == 10){
        pTime = 5;
    }
    if(num_pics == 12){
        pTime = 8;
    }
    createTable(4,num_pics/2);
    document.getElementById("game-preview").style.display = "block";
    setTimeout(hidePreview, pTime*1000);
    

}

function hidePreview(){
    document.getElementById("game-preview").style.display = "none";
    document.getElementById("game-active").style.display = "block";
    //start timer
    showTimer();
}

function showTimer(){
    document.getElementById("game-timer").style.display = "block";
    if(num_pics == 8){
        time_till_next = 120;
    }
    if(num_pics == 10){
        time_till_next = 150;
    }
    if(num_pics == 12){
        time_till_next = 180;
    }
    var next_game_timer = setInterval(function(){
        if(time_till_next < 1 && score < num_pics){
            clearInterval(next_game_timer);
            //next line added to reset the timer
            hideGame();
            document.getElementById("win").innerHTML = "Game over :(";
            //display message to start new game or smth
        } else {
            //next two lines modified to play sound and display "second till next game" after timer
            document.getElementById("game-timer").innerHTML = time_till_next + " second(s) left";
        }
        time_till_next -= 1;
      }, 1000);
}

function hideTimer(){
    document.getElementById("game-timer").style.display = "none"
}

function hideGame(){
    document.getElementById("game-active").style.display = "none";
    hideTimer();
}

//table click event referenced from Avraam Mavridis on stackoverflow
//https://stackoverflow.com/questions/45656949/how-to-return-the-row-and-column-index-of-a-table-cell-by-clicking

test_table.addEventListener('click', (event) => {
    const rowIndex = rowsArray.findIndex(row => row.contains(event.target));
    const columns = Array.from(rowsArray[rowIndex].querySelectorAll('td'));
    const columnIndex = columns.findIndex(column => column.contains(event.target));
    console.log(rowIndex, columnIndex)
    let item = rowIndex*game_col + columnIndex;
    console.log("exists: " +  matched_set.has(item));
    console.log("count: "+count);
    

    if(!matched_set.has(item)){
        if(count == 0/* && timer == 2*/){
            match = shuffled_deck[rowIndex*columns.length + columnIndex]
            prev[0] = columns;
            prev[1] = rowIndex;
            prev[2] = columnIndex;
            prevItem = prev[1]*game_col + prev[2];

            displayCard(columns, rowIndex, columnIndex);
            count++;
        }else if(count == 1){
            current[0] = columns;
            current[1] = rowIndex;
            current[2] = columnIndex;
            currItem = current[1]*game_col + current[2];
            displayCard(columns, rowIndex, columnIndex);
            console.log(match != shuffled_deck[rowIndex*columns.length + columnIndex]);
            if(match == shuffled_deck[rowIndex*columns.length + columnIndex] && prevItem != currItem){
                matched_set.add(prev[1]*game_col + prev[2]).add(current[1]*game_col + current[2]);
                
                score++;
                count = 0;
                if(score == num_pics){
                    hideGame();
                    document.getElementById("win").innerHTML = "You Win!";
                    //win message
                }
            }else if(match != shuffled_deck[rowIndex*columns.length + columnIndex]){
                //turn cards back after an amount of time
                document.getElementById("overlay").style.display = "block";
                document.getElementById("mistake").style.display = "block";
                var card_timer = setInterval(function(){ 
                    if(timer < 1){
                        clearInterval(card_timer);
                        document.getElementById("overlay").style.display = "none";
                        document.getElementById("mistake").style.display = "none";
                        hideCard(columns, rowIndex, columnIndex);
                        hideCard(prev[0], prev[1], prev[2]);
                    }
                    document.getElementById("mistake-timer").innerHTML = timer;
                    timer -=1;
                }, 1000);
                
                count = 0;
                
            }
        }
        timer = 3;
    }
document.getElementById("score").innerHTML = score;

})
//end code referenced from 
//https://stackoverflow.com/questions/45656949/how-to-return-the-row-and-column-index-of-a-table-cell-by-clicking

function displayCard(columns, rowIndex, columnIndex){
    columns[columnIndex].innerHTML = shuffled_deck[rowIndex*columns.length + columnIndex];
}
function hideCard(columns, rowIndex, columnIndex){
    columns[columnIndex].innerHTML = card_front;
}




function startGame(){
    createBlankTable(4,num_pics/2);
    game_col = num_pics/2;
    //add more later
}


function createDeck(){
    var deck = shuffleArray(card_images).slice(0,num_pics);
    deck = deck.concat(deck);
    return shuffleArray(deck);
}


function createTable(rows, cols){
    for(var i=0; i < rows; i++){
        var row = preview.insertRow(i);
        for(var j=0; j < cols; j++) {
            var cell = row.insertCell(j);
            cell.innerHTML = shuffled_deck[i*cols + j];
        }
    }
}

function createBlankTable(rows, cols){
    for(var i=0; i < rows; i++){
        var row = table.insertRow(i);
        for(var j=0; j < cols; j++) {
            var cell = row.insertCell(j);
            cell.innerHTML = card_front;
        }
    }
}
/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/12646864#12646864
 */
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }