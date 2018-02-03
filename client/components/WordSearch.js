var board = [
  ['', '', 'H', '', '', ''],
  ['', 'H', 'E', 'L', 'P', ''],
  ['', '', '', '', 'I', ''],
  ['', '', 'E', '', 'L', ''],
  ['', '', 'G', 'E', 'L', ''],
  ['', '', 'O', '', '', '']
  ]

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
        if (nextRow && (((!prevRow && nextRow[k]) || (prevRow && (!prevRow[k] && nextRow[k]))))) {
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