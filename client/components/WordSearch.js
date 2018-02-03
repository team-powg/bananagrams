var board = [
  ['', '', 'T', '', 'T'], // 0, 2
  ['', '', 'O', '', 'O'], // 1, 2
  ['', 'B', 'Y', '', 'M'], // 2, 2
  ['', 'A', 'S', '', ''], // 3, 2
  ['', 'D', '', '', '']
  ];

// var board = [
//   ['a', 'T','', 'i', 'P'],
//   ['', 'O','B', '', 'O'],
//   ['', '','O', '', 'P'],
//   ['', 'S','Y', '', ''],
//   ['', 'S','', '', '']
//   ]

// var board = [
//   ['K', 'E', 'V', 'I', 'N'],
//   ['K', 'E', 'V', '', 'N'],
//   ['K', 'E', 'V', '', 'N'],
//   ['K', 'E', 'V', '', 'N'],
//   ['K', 'E', 'V', '', '']
// ]

// var board = [
//   ['K', 'E', 'V', 'I', 'N'],
//   ['K', 'E', 'V', 'p', 'N'],
//   ['K', 'E', 'V', '', 'N'],
//   ['K', 'E', 'V', '', 'N'],
//   ['K', 'E', 'V', 'I', 'N']
// ]

function getAllWords(arr) {
    let horizWordArr = [];
  for (let row of arr) {
    let i = 0;
    while (i < row.length) {
      if (row[i]) {
        if (row[i+1]) {
          horizWordArr.push(getHorizWord(row, i));
          i++;
        } else i++;
        break;
      } else i++;
    }
  }
  let vertWordArr = [];
  var i = 0
  while(i < arr.length) {
    let currentRow = arr[i];
    for (var k = 0; k < currentRow.length; k++) {
      if (currentRow[k]){
        let nextRow = arr[i+1];
        let prevRow = arr[i-1];
        // console.log('prevRowk', prevRow[k])
        // console.log('HERE', 'I: ', i, 'K:', k, currentRow[k])
        if (nextRow && (((!prevRow && nextRow[k]) || (prevRow && (!prevRow[k] && nextRow[k]))))) { //IS VERT WORD CONTINUING
                // NEED TO ASK IF VERT WORD HAS ENDED (IE IS THERE AN EMPTY STRING BELOW LETTER?)
          vertWordArr.push(getVertWord(arr.slice(i),k))
        }
      }
    }
    i++
  }
  return vertWordArr.concat(horizWordArr)
}

function getVertWord(arrs, i) {
  let tempWord = '';
  for (let row of arrs) {
    if (!row[i]) break;
    if (row[i]) {
      tempWord += row[i];
    }
  }
  return tempWord;
}

function getHorizWord (arr, i) {
  let newWord = '';
  while (arr[i]) {
    newWord+=arr[i];
    i++;
  }
  return newWord;
}
getAllWords(board)



