const test_table = document.querySelector('table#matching-game');
const rows = document.querySelectorAll('tr');
const rowsArray = Array.from(rows);
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
        timer = 2;
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