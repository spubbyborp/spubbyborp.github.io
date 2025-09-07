//code referenced from VLAZ
//https://stackoverflow.com/questions/57907979/javascript-shuffle-table-rows
function sortTable() {
    //get the parent table for convenience
    let table = document.getElementById("memory_game");
  
    //1. get all rows
    let cellsCollection = table.querySelectorAll("li");
  
    //2. convert to array
    let cells = Array.from(cellsCollection)
  
    //3. shuffle
    shuffleArray(cells);
  
    //4. add back to the DOM
    for (const cell of cells) {
      table.appendChild(cell);
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
  }