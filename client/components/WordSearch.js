// var board = [        //        SHOULD RETURN WORDS ARRAY
//   ['A', 'C','T', 'I', 'O', 'N'],
//   ['R', '','O', '', '', 'E'],
//   ['T', '','M', '', '', 'A'],
//   ['S', '','B', '', 'I', 'T'],
//   ['Y', '','S', '', 'N', ''],
//   ['', '', '', '', 'N', '']
//   ]

var board = [            // SHOULD RETURN FALSE
  ['A', 'C','T', 'I', 'O', 'N'],
  ['R', '','O', '', '', 'E'],
  ['T', '','M', '', '', 'A'],
  ['S', '','B', '', 'I', 'T'],
  ['Y', '','S', '', '', ''],
  ['', '', '', 'O', 'N', '']
  ]

function getAllWords(arr) {
  let horizWordArr = [];
  let y = 0;
  while (y < arr.length) {
    let prevRow = arr[y-1]
    let currentRow = arr[y];
    let nextRow = arr[y+1];
    let x = 0;
    while (x < currentRow.length) {
      if (currentRow[x]) {
        if (currentRow[x+1] && !currentRow[x-1] ) {
          let connectedWord = getHorizWord(currentRow, x, prevRow, nextRow)
          horizWordArr.push(connectedWord);
        }
      }
      x++;
    }
    y++;
  }
  let vertWordArr = [];
  y = 0
  while(y < arr.length) {
    currentRow = arr[y];
    for (x = 0; x < currentRow.length; x++) {
      if (currentRow[x]){
        nextRow = arr[y+1];
        prevRow = arr[y-1];
        if (nextRow && (((!prevRow && nextRow[x]) || (prevRow && (!prevRow[x] && nextRow[x]))))) {
          connectedWord = getVertWord(arr.slice(y), x);
          vertWordArr.push(connectedWord)
        }
      }
    }
    y++
  }
  return vertWordArr.concat(horizWordArr)
}

function getVertWord(arrs, y) {
  let tempWord = '';
  for (let row of arrs) {
    if (!row[y]) break;
    if (row[y]) {
      tempWord += row[y];
    }
  }
  return tempWord;
}

function getHorizWord (curr, y, prev, next) {
  let newWord = '';
  while (curr[y]) {
    newWord+=curr[y];
    y++;
  }
  return newWord;
}

var wordsArr = getAllWords(board)

console.log(wordsArr)

